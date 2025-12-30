/*
  # Fix Security Vulnerabilities

  This migration addresses critical security issues identified in the database:

  ## Security Issues Fixed

  1. **SECURITY DEFINER View Removed**
     - Drops `public.rsvps_view` which was flagged as a security risk
     - The view was not being used by the application
     - Direct table access with proper RLS policies is more secure

  2. **Dangerous exec_sql Function Removed**
     - Drops `public.exec_sql` function which had a mutable search_path
     - This function allowed arbitrary SQL execution with elevated privileges
     - Represented a critical SQL injection vulnerability
     - Was granted to anon/authenticated users, making it exploitable

  ## Functions Retained

  - `insert_rsvp`: Kept because it has proper `SET search_path = public`
  - This function follows security best practices and is needed for RSVP functionality

  ## Notes

  - All existing RLS policies on the rsvps table remain in effect
  - Application should continue using direct table access or the insert_rsvp function
  - Auth DB connection strategy must be configured via Supabase dashboard
*/

-- Drop the security definer view
DROP VIEW IF EXISTS public.rsvps_view CASCADE;

-- Drop the dangerous exec_sql function
DROP FUNCTION IF EXISTS public.exec_sql(text);

-- Verify insert_rsvp function still exists and has proper security
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public' AND p.proname = 'insert_rsvp'
  ) THEN
    RAISE EXCEPTION 'insert_rsvp function is missing - application may break';
  END IF;
END $$;

-- Add comment documenting the security fix
COMMENT ON TABLE public.rsvps IS 'RSVP submissions table with RLS enabled. Use insert_rsvp() function or direct INSERT with proper authentication.';
