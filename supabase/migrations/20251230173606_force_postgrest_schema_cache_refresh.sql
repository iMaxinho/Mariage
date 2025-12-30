/*
  # Force PostgREST Schema Cache Refresh
  
  1. Changes
    - Add and immediately drop a temporary column to force schema change detection
    - This triggers PostgREST to reload the schema cache
  
  2. Purpose
    - Resolve "table not found in schema cache" errors
    - Make rsvps table visible in the API
*/

-- Add a temporary column to force schema change
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'rsvps' AND column_name = 'temp_cache_refresh'
  ) THEN
    ALTER TABLE public.rsvps ADD COLUMN temp_cache_refresh boolean DEFAULT false;
  END IF;
END $$;

-- Drop the temporary column immediately
ALTER TABLE public.rsvps DROP COLUMN IF EXISTS temp_cache_refresh;

-- Explicitly notify PostgREST to reload
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';