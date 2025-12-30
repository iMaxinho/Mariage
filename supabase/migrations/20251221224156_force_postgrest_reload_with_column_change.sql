/*
  # Force PostgREST to reload schema by making a minimal change
  
  1. Add a temporary comment to a column to trigger schema detection
  2. Grant explicit permissions to ensure PostgREST can access the table
  3. Send reload signals
*/

-- Add comment to trigger schema change detection
COMMENT ON COLUMN rsvps.id IS 'Primary key for RSVP entries';

-- Ensure anon role can access the table via PostgREST
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON TABLE rsvps TO anon;

-- Send reload signals
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
