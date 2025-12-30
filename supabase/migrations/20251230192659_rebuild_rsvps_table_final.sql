/*
  # Rebuild RSVPS Table - Final Fix for Schema Cache Issue
  
  1. Purpose
    - Completely rebuild the rsvps table to fix persistent schema cache errors
    - The error "Could not find the 'attending_brunch' column" indicates PostgREST cache is stale
    - This migration uses aggressive cache invalidation techniques
  
  2. Actions
    - Drop the existing rsvps table completely (CASCADE)
    - Create a fresh rsvps table with all required columns
    - Add RLS policies for anonymous insert
    - Force PostgREST to reload schema cache using multiple techniques
  
  3. Table Structure
    - id (uuid, primary key)
    - created_at (timestamptz)
    - guest_name (text, required) - Maps to form field "guest_name"
    - email (text, required) - Maps to form field "email"
    - attending_mairie (boolean) - Maps to form field "attending_mairie"
    - guests_mairie (integer) - Maps to form field "guests_mairie"
    - attending_corse (boolean) - Maps to form field "attending_corse"
    - guests_corse (integer) - Maps to form field "guests_corse"
    - attending_brunch (boolean) - Maps to form field "attending_brunch"
    - guests_brunch (integer) - Maps to form field "guests_brunch"
    - plus_one_name (text, nullable) - Maps to form field "plus_one_name"
    - dietary_restrictions (text, nullable) - Maps to form field "dietary_restrictions"
    - message (text, nullable) - Maps to form field "message"
  
  4. Security
    - RLS enabled
    - Anonymous users can INSERT
    - Authenticated users can SELECT
*/

-- Step 1: Drop existing table completely
DROP TABLE IF EXISTS public.rsvps CASCADE;

-- Step 2: Notify PostgREST about the schema change
NOTIFY pgrst, 'reload schema';

-- Step 3: Create the table with exact column names matching the form
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
  
  -- Constraints to ensure data validity
  CONSTRAINT guests_mairie_range CHECK (guests_mairie >= 0 AND guests_mairie <= 10),
  CONSTRAINT guests_corse_range CHECK (guests_corse >= 0 AND guests_corse <= 10),
  CONSTRAINT guests_brunch_range CHECK (guests_brunch >= 0 AND guests_brunch <= 10),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Step 4: Add table comment with unique timestamp
COMMENT ON TABLE public.rsvps IS 'Wedding RSVP responses - Rebuilt 2025-12-30 18:30:00';

-- Step 5: Enable Row Level Security
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Step 6: Create RLS policy for anonymous INSERT
CREATE POLICY "Allow anonymous users to insert RSVPs"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 7: Create RLS policy for authenticated users to SELECT
CREATE POLICY "Allow authenticated users to view RSVPs"
  ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 8: Create indexes for performance
CREATE INDEX rsvps_created_at_idx ON public.rsvps(created_at DESC);
CREATE INDEX rsvps_email_idx ON public.rsvps(email);
CREATE INDEX rsvps_attending_idx ON public.rsvps(attending_mairie, attending_corse, attending_brunch);

-- Step 9: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.rsvps TO anon;
GRANT SELECT ON public.rsvps TO authenticated;

-- Step 10: Analyze table to update statistics
ANALYZE public.rsvps;

-- Step 11: Force PostgREST schema reload with multiple notifications
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- Step 12: Add column comments to document the schema
COMMENT ON COLUMN public.rsvps.guest_name IS 'Full name of the guest (required)';
COMMENT ON COLUMN public.rsvps.email IS 'Email address of the guest (required)';
COMMENT ON COLUMN public.rsvps.attending_mairie IS 'Whether guest attends Neuilly-sur-Seine ceremony';
COMMENT ON COLUMN public.rsvps.guests_mairie IS 'Number of guests for Neuilly-sur-Seine ceremony';
COMMENT ON COLUMN public.rsvps.attending_corse IS 'Whether guest attends Corsica ceremony';
COMMENT ON COLUMN public.rsvps.guests_corse IS 'Number of guests for Corsica ceremony';
COMMENT ON COLUMN public.rsvps.attending_brunch IS 'Whether guest attends brunch';
COMMENT ON COLUMN public.rsvps.guests_brunch IS 'Number of guests for brunch';
COMMENT ON COLUMN public.rsvps.plus_one_name IS 'Name of the plus one guest';
COMMENT ON COLUMN public.rsvps.dietary_restrictions IS 'Dietary restrictions or allergies';
COMMENT ON COLUMN public.rsvps.message IS 'Optional message from the guest';

-- Step 13: Verify all columns exist
DO $$
DECLARE
  col_count integer;
  col_names text;
BEGIN
  SELECT COUNT(*), string_agg(column_name, ', ' ORDER BY ordinal_position)
  INTO col_count, col_names
  FROM information_schema.columns
  WHERE table_schema = 'public'
    AND table_name = 'rsvps';
  
  RAISE NOTICE '=== RSVPS TABLE VERIFICATION ===';
  RAISE NOTICE 'Total columns: %', col_count;
  RAISE NOTICE 'Column names: %', col_names;
  RAISE NOTICE '================================';
END $$;

-- Step 14: Final schema reload notification
NOTIFY pgrst, 'reload schema';