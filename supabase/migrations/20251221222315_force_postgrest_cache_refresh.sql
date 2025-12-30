/*
  # Force PostgREST Cache Refresh
  
  1. Changes
    - Drop and recreate the table to force PostgREST to detect it
    - Preserve all existing data
    - Recreate all policies
  
  2. Notes
    - This is a workaround for PostgREST schema cache issue
*/

-- Save existing data
CREATE TEMP TABLE rsvps_backup AS SELECT * FROM rsvps;

-- Drop the table completely
DROP TABLE IF EXISTS rsvps CASCADE;

-- Recreate the table with exact same structure
CREATE TABLE rsvps (
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

-- Restore data
INSERT INTO rsvps SELECT * FROM rsvps_backup;

-- Drop temp table
DROP TABLE rsvps_backup;

-- Enable RLS
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all RSVPs"
  ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Force PostgREST to reload
NOTIFY pgrst, 'reload schema';
