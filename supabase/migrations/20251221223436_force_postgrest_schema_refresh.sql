/*
  # Force PostgREST schema refresh
  
  Force PostgREST to recognize the rsvps table by adding a comment and sending notifications
*/

-- Add a comment to trigger schema change detection
COMMENT ON TABLE rsvps IS 'Wedding RSVP responses from guests';

-- Send multiple reload signals
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- Verify the table is accessible
GRANT ALL ON rsvps TO anon;
GRANT ALL ON rsvps TO authenticated;
