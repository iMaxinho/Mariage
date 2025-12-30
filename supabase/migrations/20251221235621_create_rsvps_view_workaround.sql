/*
  # Create a view to work around PostgREST cache issue
  
  1. Create a view that mirrors the rsvps table
  2. Add policies to the view to allow public inserts
  3. This will force PostgREST to refresh its schema cache
*/

-- Create a view that selects from rsvps
CREATE OR REPLACE VIEW rsvps_view AS 
SELECT * FROM rsvps;

-- Create a function to handle inserts through the view
CREATE OR REPLACE FUNCTION insert_rsvp(
  p_guest_name text,
  p_email text,
  p_attending_mairie boolean,
  p_guests_mairie integer,
  p_attending_corse boolean,
  p_guests_corse integer,
  p_attending_brunch boolean,
  p_guests_brunch integer,
  p_plus_one_name text,
  p_dietary_restrictions text,
  p_message text
)
RETURNS TABLE (
  id uuid,
  guest_name text,
  email text,
  attending_mairie boolean,
  guests_mairie integer,
  attending_corse boolean,
  guests_corse integer,
  attending_brunch boolean,
  guests_brunch integer,
  plus_one_name text,
  dietary_restrictions text,
  message text,
  created_at timestamptz
)
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  result_row rsvps%ROWTYPE;
BEGIN
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
    p_guest_name,
    p_email,
    p_attending_mairie,
    p_guests_mairie,
    p_attending_corse,
    p_guests_corse,
    p_attending_brunch,
    p_guests_brunch,
    p_plus_one_name,
    p_dietary_restrictions,
    p_message
  )
  RETURNING * INTO result_row;
  
  RETURN QUERY SELECT 
    result_row.id,
    result_row.guest_name,
    result_row.email,
    result_row.attending_mairie,
    result_row.guests_mairie,
    result_row.attending_corse,
    result_row.guests_corse,
    result_row.attending_brunch,
    result_row.guests_brunch,
    result_row.plus_one_name,
    result_row.dietary_restrictions,
    result_row.message,
    result_row.created_at;
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION insert_rsvp TO anon, authenticated;

-- Trigger schema reload
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';
