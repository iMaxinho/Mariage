/*
  # Create RSVP Insert Function
  
  1. New Function
    - `insert_rsvp()` - RPC function to safely insert RSVP data
    
  2. Purpose
    - Allows anonymous users to insert RSVPs through a controlled function
    - Validates input data before insertion
    - Returns success/error status
    
  3. Security
    - Function is SECURITY DEFINER to bypass RLS on insert
    - Only allows INSERT operations, no reads
    - Validates all input parameters
    
  4. Parameters
    - p_guest_name (text, required)
    - p_email (text, required)
    - p_attending_mairie (boolean)
    - p_guests_mairie (integer)
    - p_attending_corse (boolean)
    - p_guests_corse (integer)
    - p_attending_brunch (boolean)
    - p_guests_brunch (integer)
    - p_plus_one_name (text, optional)
    - p_dietary_restrictions (text, optional)
    - p_message (text, optional)
*/

-- Drop function if it exists (for idempotency)
DROP FUNCTION IF EXISTS insert_rsvp(text, text, boolean, integer, boolean, integer, boolean, integer, text, text, text);

-- Create the insert function
CREATE OR REPLACE FUNCTION insert_rsvp(
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
AS $$
DECLARE
  v_rsvp_id uuid;
BEGIN
  -- Validate guest name
  IF p_guest_name IS NULL OR length(trim(p_guest_name)) = 0 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Le nom est requis'
    );
  END IF;
  
  -- Validate email
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'L''email est requis'
    );
  END IF;
  
  -- Validate guest counts
  IF p_guests_mairie < 0 OR p_guests_mairie > 10 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Le nombre d''invités pour la mairie doit être entre 0 et 10'
    );
  END IF;
  
  IF p_guests_corse < 0 OR p_guests_corse > 10 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Le nombre d''invités pour la Corse doit être entre 0 et 10'
    );
  END IF;
  
  IF p_guests_brunch < 0 OR p_guests_brunch > 10 THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Le nombre d''invités pour le brunch doit être entre 0 et 10'
    );
  END IF;
  
  -- Insert the RSVP
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
    NULLIF(trim(p_plus_one_name), ''),
    NULLIF(trim(p_dietary_restrictions), ''),
    NULLIF(trim(p_message), '')
  )
  RETURNING id INTO v_rsvp_id;
  
  RETURN json_build_object(
    'success', true,
    'id', v_rsvp_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION insert_rsvp TO anon, authenticated;

-- Add comment
COMMENT ON FUNCTION insert_rsvp IS 'Securely inserts RSVP data. Callable by anonymous users.';