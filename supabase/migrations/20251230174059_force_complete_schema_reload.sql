/*
  # Force Complete Schema Reload
  
  1. Purpose
    - Force PostgREST to completely reload the schema cache
    - This is necessary after multiple table recreations with the same name
  
  2. Actions
    - Send NOTIFY signal to PostgREST
    - Modify table comment to trigger schema change detection
    - Ensure RLS policies are properly registered
*/

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

-- Force schema change detection by updating table metadata
COMMENT ON TABLE public.rsvps IS 'Wedding RSVP table - Updated 2025-12-30 17:40:00';

-- Verify RLS is enabled
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Re-grant necessary permissions to ensure they're registered
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.rsvps TO anon, authenticated;

-- Update table statistics to ensure visibility
ANALYZE public.rsvps;