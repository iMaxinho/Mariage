/*
  # Update RSVP System for Multiple Events

  1. Changes to `rsvps` table
    - Drop the old simple `attending` and `number_of_guests` columns
    - Add separate columns for each event:
      - `attending_mairie` (boolean) - Attending the city hall ceremony in Neuilly
      - `guests_mairie` (integer) - Number of guests for mairie
      - `attending_corse` (boolean) - Attending the ceremony in Corsica
      - `guests_corse` (integer) - Number of guests for Corsica
      - `attending_brunch` (boolean) - Attending the brunch
      - `guests_brunch` (integer) - Number of guests for brunch
      - `plus_one_name` (text, nullable) - Name of accompanying person if applicable
      
  2. Notes
    - Guests can now RSVP separately for each of the three events
    - Each event tracks attendance and guest count independently
    - Maintains existing email, dietary restrictions, and message fields
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'attending'
  ) THEN
    ALTER TABLE rsvps DROP COLUMN attending;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'number_of_guests'
  ) THEN
    ALTER TABLE rsvps DROP COLUMN number_of_guests;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'attending_mairie'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN attending_mairie boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'guests_mairie'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN guests_mairie integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'attending_corse'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN attending_corse boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'guests_corse'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN guests_corse integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'attending_brunch'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN attending_brunch boolean DEFAULT false;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'guests_brunch'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN guests_brunch integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rsvps' AND column_name = 'plus_one_name'
  ) THEN
    ALTER TABLE rsvps ADD COLUMN plus_one_name text;
  END IF;
END $$;