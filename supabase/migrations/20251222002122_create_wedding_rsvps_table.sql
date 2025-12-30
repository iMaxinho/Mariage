/*
  # Create new wedding_rsvps table

  This migration creates a new table 'wedding_rsvps' to work around PostgREST cache issues.
  
  1. New Tables
    - `wedding_rsvps` (copy of rsvps structure)
      - All columns from the original rsvps table
      - Copy existing data from rsvps
  
  2. Security
    - Enable RLS on wedding_rsvps table
    - Allow anonymous insertions
    - Restrict read/update/delete to authenticated users
*/

-- Create new table with same structure as rsvps
CREATE TABLE IF NOT EXISTS wedding_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text NOT NULL,
  dietary_restrictions text,
  message text,
  created_at timestamptz DEFAULT now(),
  attending_mairie boolean DEFAULT false,
  guests_mairie integer DEFAULT 0,
  attending_corse boolean DEFAULT false,
  guests_corse integer DEFAULT 0,
  attending_brunch boolean DEFAULT false,
  guests_brunch integer DEFAULT 0,
  plus_one_name text
);

-- Copy data from rsvps to wedding_rsvps
INSERT INTO wedding_rsvps 
SELECT * FROM rsvps
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE wedding_rsvps ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit wedding RSVP"
  ON wedding_rsvps
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view wedding RSVPs"
  ON wedding_rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Add comment
COMMENT ON TABLE wedding_rsvps IS 'Wedding RSVP responses from guests';

-- Notify PostgREST
NOTIFY pgrst, 'reload schema';
