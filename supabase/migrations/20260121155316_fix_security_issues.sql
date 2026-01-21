/*
  # Fix Security Issues
  
  1. Database Optimizations
    - Drop unused index `idx_rsvps_email` on rsvps table
  
  2. Security Improvements
    - Update RLS policies on `rsvps` table with validation constraints
      - Ensure guest_name is not empty
      - Ensure email is not empty and contains '@' character
      - Ensure at least one event is selected
    - Update RLS policies on `contact_messages` table with validation constraints
      - Ensure name is not empty
      - Ensure email is not empty and contains '@' character
      - Ensure message is not empty
  
  3. Notes
    - Auth DB Connection Strategy must be changed manually in Supabase Dashboard
      (Settings > Database > Connection Pooling > Change to percentage-based)
    - RLS policies still allow public access (required for RSVP/contact forms)
      but now include data validation to prevent invalid submissions
*/

-- Drop unused email index on rsvps table
DROP INDEX IF EXISTS idx_rsvps_email;

-- Drop existing RLS policies for rsvps
DROP POLICY IF EXISTS "Allow insert for anon users" ON rsvps;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON rsvps;

-- Create improved RLS policy for rsvps with validation
CREATE POLICY "Allow validated RSVP submissions"
  ON rsvps
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure required fields are not empty
    guest_name IS NOT NULL AND 
    trim(guest_name) != '' AND
    email IS NOT NULL AND 
    trim(email) != '' AND
    email LIKE '%@%' AND
    length(email) >= 5 AND
    length(email) <= 255 AND
    -- Ensure at least one event is selected
    (attending_mairie = true OR attending_corse = true OR attending_brunch = true) AND
    -- Ensure guest counts are reasonable (already enforced by CHECK constraints)
    guests_mairie >= 0 AND guests_mairie <= 10 AND
    guests_corse >= 0 AND guests_corse <= 10 AND
    guests_brunch >= 0 AND guests_brunch <= 10
  );

-- Drop existing RLS policy for contact_messages
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON contact_messages;

-- Create improved RLS policy for contact_messages with validation
CREATE POLICY "Allow validated contact message submissions"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Ensure required fields are not empty
    name IS NOT NULL AND 
    trim(name) != '' AND
    length(name) <= 255 AND
    email IS NOT NULL AND 
    trim(email) != '' AND
    email LIKE '%@%' AND
    length(email) >= 5 AND
    length(email) <= 255 AND
    message IS NOT NULL AND 
    trim(message) != '' AND
    length(message) <= 5000
  );
