-- Realize 3D - configuracao segura do Supabase
-- Executa este script no SQL Editor do projeto Supabase.

create table if not exists realize3d_workspaces (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.realize3d_workspaces enable row level security;

-- O browser nao tem acesso direto a tabela. O codigo do workspace apenas pode
-- ser usado nas funcoes restritas abaixo, que nunca permitem listar ou apagar.
drop policy if exists "allow anon all" on public.realize3d_workspaces;
revoke all on table public.realize3d_workspaces from public, anon, authenticated;

create or replace function public.get_workspace(p_code text)
returns table(payload jsonb, updated_at timestamptz)
language sql
security definer
set search_path = ''
as $$
  select workspace.payload, workspace.updated_at
  from public.realize3d_workspaces as workspace
  where workspace.id = upper(btrim(p_code))
    and upper(btrim(p_code)) ~ '^[A-Z2-9]{4}-[A-Z2-9]{4}$'
  limit 1;
$$;

create or replace function public.create_workspace(p_code text, p_payload jsonb)
returns table(created boolean, updated_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_code text := upper(btrim(p_code));
  created_at timestamptz;
begin
  if normalized_code !~ '^[A-Z2-9]{4}-[A-Z2-9]{4}$' then
    raise exception 'invalid workspace code' using errcode = '22023';
  end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception 'invalid workspace payload' using errcode = '22023';
  end if;
  if pg_column_size(p_payload) > 5242880 then
    raise exception 'workspace payload too large' using errcode = '54000';
  end if;

  insert into public.realize3d_workspaces as workspace (id, payload)
  values (normalized_code, p_payload)
  on conflict (id) do nothing
  returning workspace.updated_at into created_at;

  return query select created_at is not null, created_at;
end;
$$;

create or replace function public.save_workspace(
  p_code text,
  p_payload jsonb,
  p_expected_updated_at timestamptz
)
returns table(status text, updated_at timestamptz)
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_code text := upper(btrim(p_code));
  saved_at timestamptz;
  existing_updated_at timestamptz;
begin
  if normalized_code !~ '^[A-Z2-9]{4}-[A-Z2-9]{4}$' then
    raise exception 'invalid workspace code' using errcode = '22023';
  end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception 'invalid workspace payload' using errcode = '22023';
  end if;
  if pg_column_size(p_payload) > 5242880 then
    raise exception 'workspace payload too large' using errcode = '54000';
  end if;

  update public.realize3d_workspaces as workspace
  set payload = p_payload,
      updated_at = clock_timestamp()
  where workspace.id = normalized_code
    and workspace.updated_at = p_expected_updated_at
  returning workspace.updated_at into saved_at;

  if saved_at is not null then
    return query select 'saved'::text, saved_at;
    return;
  end if;

  select workspace.updated_at
  into existing_updated_at
  from public.realize3d_workspaces as workspace
  where workspace.id = normalized_code;

  if existing_updated_at is null then
    return query select 'not_found'::text, null::timestamptz;
  else
    return query select 'conflict'::text, existing_updated_at;
  end if;
end;
$$;

revoke all on function public.get_workspace(text) from public, anon, authenticated;
revoke all on function public.create_workspace(text, jsonb) from public, anon, authenticated;
revoke all on function public.save_workspace(text, jsonb, timestamptz) from public, anon, authenticated;

grant execute on function public.get_workspace(text) to anon, authenticated;
grant execute on function public.create_workspace(text, jsonb) to anon, authenticated;
grant execute on function public.save_workspace(text, jsonb, timestamptz) to anon, authenticated;
