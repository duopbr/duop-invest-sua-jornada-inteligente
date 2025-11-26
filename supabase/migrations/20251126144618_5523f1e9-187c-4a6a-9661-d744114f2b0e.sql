-- Drop existing restrictive INSERT policy
DROP POLICY IF EXISTS "Allow public insert" ON public."B2C_Leads_LP";

-- Create new PERMISSIVE policy for public INSERT (anonymous users can insert)
CREATE POLICY "Allow public insert to B2C_Leads_LP"
ON public."B2C_Leads_LP"
AS PERMISSIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (true);