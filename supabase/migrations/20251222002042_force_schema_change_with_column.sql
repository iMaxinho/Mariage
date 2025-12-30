/*
  # Force schema change by modifying table structure

  This migration forces PostgREST to detect schema changes by adding and removing a temporary column.
  
  1. Changes
    - Add a temporary column to the rsvps table
    - Remove the temporary column immediately
    - This triggers a schema change that PostgREST must detect
*/

-- Add a temporary column
ALTER TABLE rsvps ADD COLUMN IF NOT EXISTS temp_column_for_reload text;

-- Remove it immediately
ALTER TABLE rsvps DROP COLUMN IF EXISTS temp_column_for_reload;

-- Force notify
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
