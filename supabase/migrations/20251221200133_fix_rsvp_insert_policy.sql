/*
  # Fix RSVP Insert Policy
  
  1. Changes
    - Drop the existing policy that uses 'anon' role
    - Create a new policy using 'public' role (includes both anon and authenticated)
    - This allows anyone to submit an RSVP without authentication
    
  2. Security
    - Public can INSERT their RSVPs
    - Only authenticated users can SELECT all RSVPs
*/

DROP POLICY IF EXISTS "Anyone can submit RSVP" ON rsvps;

CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO public
  WITH CHECK (true);
