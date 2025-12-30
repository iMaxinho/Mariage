/*
  # Force PostgREST schema reload

  This migration forces PostgREST to reload its schema cache by making a minor change to the rsvps table.
  
  1. Changes
    - Add a comment to the rsvps table to trigger schema reload
    - This should make the table visible to the PostgREST API
*/

-- Add a comment to force schema reload
COMMENT ON TABLE rsvps IS 'Wedding RSVP responses from guests - updated to force schema reload';

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
