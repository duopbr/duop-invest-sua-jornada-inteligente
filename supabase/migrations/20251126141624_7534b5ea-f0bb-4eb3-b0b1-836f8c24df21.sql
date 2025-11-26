-- Corrigir política RLS para permitir inserções públicas na tabela B2C_Leads_LP
-- A política atual está RESTRICTIVE, o que bloqueia todas as inserções
-- Vamos recriá-la como PERMISSIVE para permitir que o formulário funcione

-- Remover a política restritiva atual
DROP POLICY IF EXISTS "Allow public insert" ON "public"."B2C_Leads_LP";

-- Criar nova política PERMISSIVE para permitir inserções públicas
CREATE POLICY "Allow public insert"
ON "public"."B2C_Leads_LP"
FOR INSERT
TO public
WITH CHECK (true);