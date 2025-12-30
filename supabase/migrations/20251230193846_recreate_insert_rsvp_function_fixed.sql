/*
  # Recreate insert_rsvp Function - Fixed Version
  
  1. Purpose
    - Create a clean version of insert_rsvp function
    - Fix "column does not exist" errors
    - Ensure function uses correct table schema
  
  2. Function Details
    - Name: insert_rsvp
    - Parameters: All RSVP form fields with defaults
    - Returns: Inserted RSVP record as JSON
    - Security: SECURITY DEFINER with input validation
  
  3. Key Features
    - Explicit schema qualification (public.rsvps)
    - Validates all required fields
    - Validates email format
    - Validates guest counts (0-10 range)
    - Trims whitespace from text fields
    - Converts empty strings to NULL
*/

-- Drop any existing version
DROP FUNCTION IF EXISTS public.insert_rsvp CASCADE;

-- Create the function with explicit schema references
CREATE FUNCTION public.insert_rsvp(
  p_guest_name text,
  p_email text,
  p_attending_mairie boolean DEFAULT false,
  p_guests_mairie integer DEFAULT 0,
  p_attending_corse boolean DEFAULT false,
  p_guests_corse integer DEFAULT 0,
  p_attending_brunch boolean DEFAULT false,
  p_guests_brunch integer DEFAULT 0,
  p_plus_one_name text DEFAULT NULL,
  p_dietary_restrictions text DEFAULT NULL,
  p_message text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_rsvp_id uuid;
  v_result json;
BEGIN
  -- Validate required fields
  IF p_guest_name IS NULL OR trim(p_guest_name) = '' THEN
    RAISE EXCEPTION 'Guest name is required';
  END IF;
  
  IF p_email IS NULL OR trim(p_email) = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  
  -- Validate email format
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate guest counts
  IF p_guests_mairie < 0 OR p_guests_mairie > 10 THEN
    RAISE EXCEPTION 'Invalid guest count for mairie (must be 0-10)';
  END IF;
  
  IF p_guests_corse < 0 OR p_guests_corse > 10 THEN
    RAISE EXCEPTION 'Invalid guest count for corse (must be 0-10)';
  END IF;
  
  IF p_guests_brunch < 0 OR p_guests_brunch > 10 THEN
    RAISE EXCEPTION 'Invalid guest count for brunch (must be 0-10)';
  END IF;
  
  -- Insert the RSVP with explicit column names
  INSERT INTO rsvps (
    guest_name,
    email,
    attending_mairie,
    guests_mairie,
    attending_corse,
    guests_corse,
    attending_brunch,
    guests_brunch,
    plus_one_name,
    dietary_restrictions,
    message
  ) VALUES (
    trim(p_guest_name),
    trim(p_email),
    p_attending_mairie,
    p_guests_mairie,
    p_attending_corse,
    p_guests_corse,
    p_attending_brunch,
    p_guests_brunch,
    NULLIF(trim(COALESCE(p_plus_one_name, '')), ''),
    NULLIF(trim(COALESCE(p_dietary_restrictions, '')), ''),
    NULLIF(trim(COALESCE(p_message, '')), '')
  )
  RETURNING id INTO v_rsvp_id;
  
  -- Get the inserted record as JSON
  SELECT row_to_json(r.*)
  INTO v_result
  FROM rsvps r
  WHERE r.id = v_rsvp_id;
  
  RETURN v_result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Re-raise with more details
    RAISE EXCEPTION 'Failed to insert RSVP: %', SQLERRM;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.insert_rsvp TO anon;
GRANT EXECUTE ON FUNCTION public.insert_rsvp TO authenticated;

-- Add documentation
COMMENT ON FUNCTION public.insert_rsvp IS 'Inserts a new RSVP record. Accessible by anonymous users. Returns the created record as JSON.';

-- Verify the function works by testing it
DO $$
DECLARE
  v_test_result json;
  v_test_email text := 'test_verify_' || floor(random() * 1000000) || '@example.com';
BEGIN
  -- Test the function
  SELECT public.insert_rsvp(
    'Test Verification User',
    v_test_email,
    true,
    2,
    false,
    0,
    true,
    2,
    'Test Plus One',
    'Vegetarian',
    'Test message'
  ) INTO v_test_result;
  
  -- Clean up test data
  DELETE FROM rsvps WHERE email = v_test_email;
  
  RAISE NOTICE '✓ Function insert_rsvp created and tested successfully';
  RAISE NOTICE '✓ Test result: %', v_test_result;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE '✗ Function test failed: %', SQLERRM;
    RAISE;
END;
$$;