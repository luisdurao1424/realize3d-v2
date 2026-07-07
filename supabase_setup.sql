-- Realize 3D — configuração do Supabase
-- Cola e corre este script inteiro no SQL Editor do teu projeto Supabase
-- (Painel Supabase -> SQL Editor -> New query -> colar -> Run)

create table if not exists realize3d_workspaces (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table realize3d_workspaces enable row level security;

-- Política simples: qualquer pessoa com a "anon key" pode ler/escrever.
-- A segurança aqui vem do código do espaço ser secreto (como uma password),
-- não de autenticação de utilizador. Não partilhes o código nem a service_role key.
drop policy if exists "allow anon all" on realize3d_workspaces;
create policy "allow anon all" on realize3d_workspaces
  for all
  using (true)
  with check (true);
