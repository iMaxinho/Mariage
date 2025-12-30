/*
  # Create RSVPS Table with Anonymous Insert Policy
  
  1. New Tables
    - `rsvps`
      - `id` (uuid, primary key) - Unique identifier for each RSVP
      - `created_at` (timestamptz) - Timestamp when RSVP was submitted
      - `guest_name` (text, required) - Full name of the guest
      - `email` (text, required) - Email address of the guest
      - `attending_mairie` (boolean) - Whether guest attends mairie ceremony
      - `guests_mairie` (integer) - Number of guests for mairie ceremony
      - `attending_corse` (boolean) - Whether guest attends Corse ceremony
      - `guests_corse` (integer) - Number of guests for Corse ceremony
      - `attending_brunch` (boolean) - Whether guest attends brunch
      - `guests_brunch` (integer) - Number of guests for brunch
      - `plus_one_name` (text, optional) - Name of plus one guest
      - `dietary_restrictions` (text, optional) - Dietary restrictions or allergies
      - `message` (text, optional) - Optional message from guest
      
  2. Security
    - Enable RLS on `rsvps` table
    - Add policy to allow anonymous users to INSERT only
    - By default, SELECT, UPDATE, and DELETE are denied (no policies created for them)
    
  3. Important Notes
    - Anonymous users can only insert RSVPs
    - No one can read, update, or delete RSVPs through the API (only database admins)
    - This ensures guest privacy and prevents spam/abuse
*/

-- Drop table if it exists (for clean migration)
DROP TABLE IF EXISTS public.rsvps CASCADE;

-- Create the rsvps table
CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  guest_name text NOT NULL,
  email text NOT NULL,
  attending_mairie boolean DEFAULT false NOT NULL,
  guests_mairie integer DEFAULT 0 NOT NULL,
  attending_corse boolean DEFAULT false NOT NULL,
  guests_corse integer DEFAULT 0 NOT NULL,
  attending_brunch boolean DEFAULT false NOT NULL,
  guests_brunch integer DEFAULT 0 NOT NULL,
  plus_one_name text,
  dietary_restrictions text,
  message text,
  
  -- Constraints
  CONSTRAINT guests_mairie_range CHECK (guests_mairie >= 0 AND guests_mairie <= 10),
  CONSTRAINT guests_corse_range CHECK (guests_corse >= 0 AND guests_corse <= 10),
  CONSTRAINT guests_brunch_range CHECK (guests_brunch >= 0 AND guests_brunch <= 10)
);

-- Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow anonymous users to INSERT only
CREATE POLICY "Allow anonymous users to insert RSVPs"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add comment to table
COMMENT ON TABLE public.rsvps IS 'Wedding RSVP responses. Anonymous users can insert only. Admin access required for viewing.';

-- Add index on created_at for efficient sorting
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON public.rsvps(created_at DESC);

-- Add index on email for potential duplicate checking by admins
CREATE INDEX IF NOT EXISTS rsvps_email_idx ON public.rsvps(email);
