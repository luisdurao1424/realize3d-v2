import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.112.3";

const BUCKET = "realize3d-attachments";
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const MODEL_EXTENSIONS = new Set(["stl", "3mf"]);
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-retry-count, traceparent, tracestate, baggage",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function normalizeCode(value: unknown) {
  const code = String(value || "").trim().toUpperCase();
  return /^[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(code) ? code : null;
}

function normalizePedidoId(value: unknown) {
  const id = String(value || "").trim();
  return /^[A-Za-z0-9_-]{1,80}$/.test(id) ? id : null;
}

function fileExtension(name: string) {
  return name.includes(".") ? name.split(".").pop()!.toLowerCase() : "";
}

function attachmentPaths(payload: Record<string, unknown>) {
  const paths = new Set<string>();
  const pedidos = Array.isArray(payload?.pedidos) ? payload.pedidos : [];
  for (const pedido of pedidos) {
    if (!pedido || typeof pedido !== "object") continue;
    const anexos = Array.isArray((pedido as Record<string, unknown>).anexos)
      ? (pedido as Record<string, unknown>).anexos as Array<Record<string, unknown>>
      : [];
    for (const anexo of anexos) {
      if (typeof anexo?.path === "string") paths.add(anexo.path);
    }
  }
  return paths;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json(500, { error: "server_not_configured" });

  try {
    const body = await req.json();
    const code = normalizeCode(body.workspaceCode);
    if (!code) return json(400, { error: "invalid_workspace_code" });

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: workspace, error: workspaceError } = await admin
      .from("realize3d_workspaces")
      .select("payload")
      .eq("id", code)
      .maybeSingle();

    if (workspaceError) throw workspaceError;
    if (!workspace) return json(404, { error: "workspace_not_found" });

    const payload = (workspace.payload || {}) as Record<string, unknown>;
    const knownPaths = attachmentPaths(payload);
    const storage = admin.storage.from(BUCKET);

    if (body.action === "create_upload") {
      const pedidoId = normalizePedidoId(body.pedidoId);
      const pedidos = Array.isArray(payload.pedidos) ? payload.pedidos : [];
      const pedidoExists = pedidoId && pedidos.some((pedido) =>
        pedido && typeof pedido === "object" && (pedido as Record<string, unknown>).id === pedidoId
      );
      if (!pedidoExists) return json(404, { error: "pedido_not_found" });

      const fileName = String(body.fileName || "").split(/[\\/]/).pop()!.slice(0, 180);
      const extension = fileExtension(fileName);
      const size = Number(body.size);
      if (!fileName || (!MODEL_EXTENSIONS.has(extension) && !IMAGE_EXTENSIONS.has(extension))) {
        return json(400, { error: "unsupported_file_type" });
      }
      if (!Number.isFinite(size) || size <= 0 || size > MAX_FILE_SIZE) {
        return json(400, { error: "invalid_file_size" });
      }

      const attachmentId = crypto.randomUUID();
      const path = `${code}/${pedidoId}/${attachmentId}.${extension}`;
      const { data, error } = await storage.createSignedUploadUrl(path);
      if (error) throw error;
      return json(200, { attachmentId, path, token: data.token });
    }

    if (body.action === "create_download") {
      const path = String(body.path || "");
      if (!path.startsWith(`${code}/`) || !knownPaths.has(path)) {
        return json(404, { error: "attachment_not_found" });
      }
      const download = body.download === true;
      const { data, error } = await storage.createSignedUrl(path, 300, { download });
      if (error) throw error;
      return json(200, { signedUrl: data.signedUrl });
    }

    if (body.action === "delete_paths") {
      const paths = Array.isArray(body.paths)
        ? [...new Set(body.paths.map(String))].filter(Boolean).slice(0, 100)
        : [];
      if (!paths.length || paths.some((path) => !path.startsWith(`${code}/`) || !knownPaths.has(path))) {
        return json(400, { error: "invalid_attachment_paths" });
      }
      const { error } = await storage.remove(paths);
      if (error) throw error;
      return json(200, { deleted: paths.length });
    }

    return json(400, { error: "invalid_action" });
  } catch (error) {
    console.error("workspace-attachments", error);
    return json(500, { error: "attachment_operation_failed" });
  }
});
