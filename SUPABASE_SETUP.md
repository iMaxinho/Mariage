# Supabase Setup Guide - RSVP Multi-Events Form

This guide provides complete instructions to set up the Supabase database for the wedding RSVP multi-events form.

## Database Structure

The form handles RSVPs for 3 separate events:
- **Mairie de Neuilly-sur-Seine** (28 Mai 2026)
- **Cérémonie en Corse** (6 Juin 2026)
- **Brunch du lendemain** (7 Juin 2026)

## 1. SQL Script to Run in Supabase

Copy and paste this entire SQL script in the Supabase SQL Editor:

```sql
-- =====================================================
-- WEDDING RSVP MULTI-EVENTS TABLE AND FUNCTION
-- =====================================================

-- Create the rsvps table
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text NOT NULL,
  attending_mairie boolean DEFAULT false,
  guests_mairie integer DEFAULT 0,
  attending_corse boolean DEFAULT false,
  guests_corse integer DEFAULT 0,
  attending_brunch boolean DEFAULT false,
  guests_brunch integer DEFAULT 0,
  plus_one_name text,
  dietary_restrictions text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to INSERT RSVPs
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to VIEW all RSVPs (for admin)
CREATE POLICY "Authenticated users can view all RSVPs"
  ON rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Create the insert_rsvp function
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

-- Add helpful comments
COMMENT ON TABLE rsvps IS 'Wedding RSVP responses for multiple events (Mairie, Corse, Brunch)';
COMMENT ON FUNCTION insert_rsvp IS 'Securely inserts RSVP data. Callable by anonymous users.';
```

## 2. Environment Variables Setup

### For Development (Bolt/Local)

1. In your project root, edit the `.env` file in the `wedding-site` directory
2. Add these two variables:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

**Where to find these values:**
- Go to your Supabase project dashboard
- Click on **Settings** (gear icon in sidebar)
- Click on **API**
- Copy **Project URL** → this is your `VITE_SUPABASE_URL`
- Copy **anon public** key → this is your `VITE_SUPABASE_ANON_KEY`

### For Production (Netlify/Vercel/etc.)

Add the same environment variables in your deployment platform:

**Netlify:**
1. Go to Site Settings > Environment Variables
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Vercel:**
1. Go to Project Settings > Environment Variables
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Other platforms:**
- Look for "Environment Variables" or "Secrets" section
- Add both variables with their respective values

## 3. Verify Setup

### A. Check Console Output

After setting environment variables, restart your dev server and open the browser console:

You should see:
```
Supabase Configuration Check:
- URL loaded: true
- Anon key loaded: true
```

If you see `false` for either, the environment variables are not loaded correctly.

### B. Test Form Submission

1. Fill out the RSVP form with test data
2. Open browser **DevTools** > **Network** tab
3. Submit the form
4. Look for a request to your Supabase URL with path `/rest/v1/rpc/insert_rsvp`
5. Check the response:
   - **Success**: Status 200, response contains `{"success": true, "id": "..."}`
   - **Error**: Check the error message in the response

### C. Verify in Supabase Dashboard

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select the `rsvps` table
4. You should see your test RSVP entry

### D. Check Supabase Logs

1. Go to Supabase Dashboard
2. Click **Logs** > **Database**
3. Filter for recent queries
4. Look for `INSERT INTO rsvps` statements

## 4. Troubleshooting

### Issue: "Configuration Supabase manquante"

**Causes:**
- Environment variables not set
- Environment variables named incorrectly
- Dev server not restarted after adding variables

**Solutions:**
1. Verify `.env` file exists in `wedding-site` folder
2. Ensure variable names start with `VITE_` prefix
3. Restart dev server: Stop the server and run `npm run dev` again
4. Check browser console for configuration check output

### Issue: "Function not found: insert_rsvp"

**Causes:**
- SQL script not executed in Supabase
- Function created in wrong schema

**Solutions:**
1. Go to Supabase SQL Editor
2. Run the complete SQL script from section 1 above
3. Verify function exists: `SELECT * FROM pg_proc WHERE proname = 'insert_rsvp';`

### Issue: "Permission denied for table rsvps"

**Causes:**
- RLS policies not set correctly
- User not authenticated when required

**Solutions:**
1. Verify RLS is enabled: `SELECT * FROM pg_tables WHERE tablename = 'rsvps';`
2. Check policies exist: `SELECT * FROM pg_policies WHERE tablename = 'rsvps';`
3. Re-run the SQL script to recreate policies

### Issue: Network request fails

**Causes:**
- Wrong Supabase URL
- CORS issues
- Network connectivity

**Solutions:**
1. Verify URL format: `https://PROJECT_ID.supabase.co` (no trailing slash)
2. Check Network tab for exact error message
3. Verify Supabase project is active and not paused

### Issue: "L'email est requis" or validation errors

**Causes:**
- Form validation failing
- Empty required fields

**Solutions:**
1. Ensure both name and email fields are filled
2. Email must be in valid format
3. Check console for validation error details

## 5. Data Structure Reference

### Table: `rsvps`

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | uuid | Auto | Unique identifier |
| created_at | timestamptz | Auto | Submission timestamp |
| guest_name | text | Yes | Full name of guest(s) |
| email | text | Yes | Contact email |
| attending_mairie | boolean | No | Attending city hall ceremony |
| guests_mairie | integer | No | Number of guests for mairie (0-10) |
| attending_corse | boolean | No | Attending Corsica ceremony |
| guests_corse | integer | No | Number of guests for Corsica (0-10) |
| attending_brunch | boolean | No | Attending brunch |
| guests_brunch | integer | No | Number of guests for brunch (0-10) |
| plus_one_name | text | No | Name of accompanying person |
| dietary_restrictions | text | No | Dietary requirements |
| message | text | No | Optional message to couple |

## 6. Security Notes

- **RLS is enabled** on the `rsvps` table
- **Anonymous users** can only INSERT (submit RSVPs)
- **Anonymous users CANNOT** view, update, or delete RSVPs
- **Authenticated users** can view all RSVPs (for admin purposes)
- The `insert_rsvp` function validates all input before insertion
- Guest counts are limited to 1-10 per event

## 7. Viewing RSVPs (Admin)

To view submitted RSVPs, you'll need to authenticate to Supabase.

### Option A: Supabase Dashboard
1. Go to **Table Editor**
2. Select `rsvps` table
3. View all entries

### Option B: SQL Query
```sql
SELECT
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
  message,
  created_at
FROM rsvps
ORDER BY created_at DESC;
```

### Option C: Export to CSV
1. Run query in SQL Editor
2. Click **Export** button
3. Choose CSV format
