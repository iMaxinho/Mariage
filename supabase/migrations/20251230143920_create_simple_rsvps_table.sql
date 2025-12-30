/*
  # Create Simplified RSVP Table

  1. New Tables
    - `rsvps_simple`
      - `id` (uuid, primary key, auto-generated)
      - `created_at` (timestamptz, auto-generated)
      - `name` (text, required) - Guest name
      - `email` (text, optional) - Guest email
      - `guests` (integer, required) - Number of guests (1-10)
      - `attendance` (text, required) - "yes" or "no"
      - `message` (text, optional) - Optional message from guest

  2. Security
    - Enable RLS on `rsvps_simple` table
    - Add policy for anonymous users to insert RSVPs
    - Add policy for authenticated users to view all RSVPs

  3. Constraints
    - guests must be between 1 and 10
    - attendance must be 'yes' or 'no'
    - name cannot be empty
*/

-- Create the simplified rsvps table
CREATE TABLE IF NOT EXISTS rsvps_simple (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL CHECK (length(trim(name)) > 0),
  email text,
  guests integer NOT NULL DEFAULT 1 CHECK (guests >= 1 AND guests <= 10),
  attendance text NOT NULL CHECK (attendance IN ('yes', 'no')),
  message text
);

-- Enable Row Level Security
ALTER TABLE rsvps_simple ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert RSVPs
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps_simple
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to view all RSVPs
CREATE POLICY "Authenticated users can view RSVPs"
  ON rsvps_simple
  FOR SELECT
  TO authenticated
  USING (true);

-- Add helpful comment
COMMENT ON TABLE rsvps_simple IS 'Simplified RSVP table for event registrations. Allows anonymous inserts with RLS enabled.';

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS rsvps_simple_created_at_idx ON rsvps_simple(created_at DESC);
