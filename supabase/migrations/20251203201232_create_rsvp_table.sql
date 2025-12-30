/*
  # Create RSVP System

  1. New Tables
    - `rsvps`
      - `id` (uuid, primary key) - Unique identifier for each RSVP
      - `guest_name` (text) - Name of the guest(s)
      - `email` (text) - Email for confirmation
      - `attending` (boolean) - Whether the guest is attending
      - `number_of_guests` (integer) - Total number of people attending
      - `dietary_restrictions` (text, nullable) - Any dietary requirements
      - `message` (text, nullable) - Optional message from the guest
      - `created_at` (timestamptz) - When the RSVP was submitted
      
  2. Security
    - Enable RLS on `rsvps` table
    - Add policy for public insert (anyone can RSVP)
    - Add policy for authenticated users to read all RSVPs (for admin view)
    
  3. Notes
    - Public can submit RSVPs but cannot read others' responses
    - Only authenticated users (the couple) can view all RSVPs
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text NOT NULL,
  attending boolean NOT NULL,
  number_of_guests integer DEFAULT 1,
  dietary_restrictions text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all RSVPs"
  ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);