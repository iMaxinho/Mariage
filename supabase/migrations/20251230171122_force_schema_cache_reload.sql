/*
  # Force PostgREST Schema Cache Reload
  
  1. Purpose
    - Force PostgREST to reload its schema cache
    - Ensure the insert_rsvp function is visible to the API
    
  2. Actions
    - Send NOTIFY command to pgrst channel
    - This triggers PostgREST to refresh its schema cache
*/

-- Notify PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
