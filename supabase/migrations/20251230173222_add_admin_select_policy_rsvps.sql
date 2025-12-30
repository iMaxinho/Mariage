/*
  # Add Admin SELECT Policy for RSVPs Table
  
  1. Changes
    - Add SELECT policy for authenticated users (admins) to view RSVP data
    - This allows viewing RSVPs in Supabase dashboard and admin interfaces
  
  2. Security
    - Only authenticated users can read RSVP data
    - Anonymous users can still insert RSVPs (existing policy)
    - Keeps data secure while allowing admin access
*/

-- Drop existing policy if it exists and recreate
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Authenticated users can view all RSVPs" ON public.rsvps;
END $$;

-- Add SELECT policy for authenticated users (admins)
CREATE POLICY "Authenticated users can view all RSVPs"
  ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';