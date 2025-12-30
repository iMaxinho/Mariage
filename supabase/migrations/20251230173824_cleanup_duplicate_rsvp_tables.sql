/*
  # Cleanup Duplicate RSVP Tables
  
  1. Changes
    - Drop duplicate tables: rsvps_simple and wedding_rsvps
    - Keep only the main rsvps table which has the correct structure
  
  2. Tables to Keep
    - rsvps: Main RSVP table with all event types (mairie, corse, brunch)
    - contact_messages: For contact form submissions
  
  3. Tables to Remove
    - rsvps_simple: Duplicate with simplified structure
    - wedding_rsvps: Duplicate with similar structure
*/

-- Drop duplicate tables
DROP TABLE IF EXISTS public.rsvps_simple CASCADE;
DROP TABLE IF EXISTS public.wedding_rsvps CASCADE;

-- Verify rsvps table has correct structure
COMMENT ON TABLE public.rsvps IS 'Main RSVP table for wedding events (mairie, corse, brunch)';
COMMENT ON TABLE public.contact_messages IS 'Contact form submissions';