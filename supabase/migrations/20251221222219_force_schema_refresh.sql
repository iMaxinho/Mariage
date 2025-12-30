/*
  # Force Schema Cache Refresh
  
  1. Changes
    - Add comment to rsvps table to force PostgREST schema reload
    - This should resolve the "table not found in schema cache" error
  
  2. Notes
    - This is a workaround to force PostgREST to recognize the table
    - No data or structure changes are made
*/

-- Force schema reload by adding a comment
COMMENT ON TABLE rsvps IS 'Wedding RSVP responses for multiple events';

-- Force PostgREST to reload the schema
NOTIFY pgrst, 'reload schema';

-- Verify the table exists and is accessible
SELECT schemaname, tablename, tableowner 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'rsvps';
