/*
  # Create RPC Function for RSVP Insertion
  
  1. Purpose
    - Create a stored function to bypass PostgREST schema cache issues
    - The error "Could not find the 'attending_brunch' column" is due to PostgREST cache
    - Using RPC functions bypasses the REST API schema cache entirely
  
  2. Function Details
    - Name: insert_rsvp
    - Parameters: All RSVP form fields
    - Returns: The inserted RSVP record as JSON
    - Security: SECURITY DEFINER with validation
  
  3. Benefits
    - Bypasses PostgREST schema cache completely
    - More reliable than direct table inserts via REST API
    - Allows for server-side validation
    - Better error handling
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS public.insert_rsvp;

-- Create the insert_rsvp function
CREATE OR REPLACE FUNCTION public.insert_rsvp(
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
  
  -- Insert the RSVP
  INSERT INTO public.rsvps (
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
    NULLIF(trim(p_plus_one_name), ''),
    NULLIF(trim(p_dietary_restrictions), ''),
    NULLIF(trim(p_message), '')
  )
  RETURNING id INTO v_rsvp_id;
  
  -- Get the inserted record as JSON
  SELECT row_to_json(r.*)
  INTO v_result
  FROM public.rsvps r
  WHERE r.id = v_rsvp_id;
  
  RETURN v_result;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error and re-raise
    RAISE EXCEPTION 'Failed to insert RSVP: %', SQLERRM;
END;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.insert_rsvp TO anon;
GRANT EXECUTE ON FUNCTION public.insert_rsvp TO authenticated;

-- Add comment to document the function
COMMENT ON FUNCTION public.insert_rsvp IS 'Insert a new RSVP record. This function bypasses PostgREST schema cache issues.';

-- Test the function
DO $$
DECLARE
  v_test_result json;
BEGIN
  -- Test with sample data
  SELECT public.insert_rsvp(
    'Test Function User',
    'testfunction@example.com',
    true,
    1,
    false,
    0,
    true,
    1,
    NULL,
    NULL,
    'Test via function'
  ) INTO v_test_result;
  
  RAISE NOTICE '=== FUNCTION TEST SUCCESSFUL ===';
  RAISE NOTICE 'Result: %', v_test_result;
  RAISE NOTICE '================================';
  
  -- Clean up test data
  DELETE FROM public.rsvps WHERE email = 'testfunction@example.com';
  RAISE NOTICE 'Test data cleaned up';
END;
$$;