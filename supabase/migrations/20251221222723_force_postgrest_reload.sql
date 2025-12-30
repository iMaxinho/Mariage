/*
  # Force PostgREST schema reload
  
  Force PostgREST to reload its schema cache by sending a notification.
*/

NOTIFY pgrst, 'reload schema';
