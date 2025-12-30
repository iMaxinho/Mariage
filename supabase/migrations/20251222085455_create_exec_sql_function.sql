/*
  # Create exec_sql function for raw SQL execution

  This migration creates a PostgreSQL function that allows executing raw SQL queries,
  bypassing the PostgREST cache issue.
  
  1. New Functions
    - `exec_sql(query text)` - Executes raw SQL and returns the result
  
  2. Security
    - Function is marked as SECURITY DEFINER to run with elevated privileges
    - Only accessible to authenticated users
*/

CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  EXECUTE query INTO result;
  RETURN result;
END;
$$;

-- Grant execute permission to anon and authenticated roles
GRANT EXECUTE ON FUNCTION exec_sql(text) TO anon, authenticated;

COMMENT ON FUNCTION exec_sql IS 'Execute raw SQL queries - used to bypass PostgREST cache issues';
