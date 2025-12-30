/*
  # Final RSVP Table Setup for Direct Insert

  1. Tables
    - Drop and recreate `rsvps` table with all required columns
    - Columns:
      - id (uuid, primary key, auto-generated)
      - created_at (timestamptz, auto-set to now())
      - guest_name (text, required)
      - email (text, required)
      - attending_mairie (boolean, default false)
      - guests_mairie (int, default 0)
      - attending_corse (boolean, default false)
      - guests_corse (int, default 0)
      - attending_brunch (boolean, default false)
      - guests_brunch (int, default 0)
      - plus_one_name (text, nullable)
      - dietary_restrictions (text, nullable)
      - message (text, nullable)

  2. Security
    - Enable RLS on rsvps table
    - Add INSERT policy for anonymous users (anon role)
    - Add SELECT policy for authenticated users only (for admin access)

  3. Notes
    - Uses IF NOT EXISTS to avoid errors on re-run
    - Drops existing table to ensure clean state
    - Anonymous users can only INSERT (submit RSVP)
    - Only authenticated users can SELECT (view submissions)
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.rsvps CASCADE;

-- Create rsvps table
CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  guest_name text NOT NULL,
  email text NOT NULL,
  attending_mairie boolean DEFAULT false NOT NULL,
  guests_mairie int DEFAULT 0 NOT NULL,
  attending_corse boolean DEFAULT false NOT NULL,
  guests_corse int DEFAULT 0 NOT NULL,
  attending_brunch boolean DEFAULT false NOT NULL,
  guests_brunch int DEFAULT 0 NOT NULL,
  plus_one_name text,
  dietary_restrictions text,
  message text,
  CONSTRAINT guests_mairie_range CHECK (guests_mairie >= 0 AND guests_mairie <= 10),
  CONSTRAINT guests_corse_range CHECK (guests_corse >= 0 AND guests_corse <= 10),
  CONSTRAINT guests_brunch_range CHECK (guests_brunch >= 0 AND guests_brunch <= 10)
);

-- Enable RLS
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to INSERT (submit RSVP)
CREATE POLICY "Allow anonymous insert"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to SELECT (admin view)
CREATE POLICY "Allow authenticated select"
  ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index on email for potential duplicate checking
CREATE INDEX idx_rsvps_email ON public.rsvps(email);

-- Create index on created_at for sorting
CREATE INDEX idx_rsvps_created_at ON public.rsvps(created_at DESC);
