# Supabase Setup Guide

This guide provides complete step-by-step instructions to set up Supabase for the wedding RSVP website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Supabase Project](#step-1-create-supabase-project)
3. [Step 2: Run Database Migration](#step-2-run-database-migration)
4. [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
5. [Step 4: Verify Setup](#step-4-verify-setup)
6. [Step 5: Test RSVP Submission](#step-5-test-rsvp-submission)
7. [Troubleshooting](#troubleshooting)
8. [How to View RSVPs](#how-to-view-rsvps)

---

## Prerequisites

- A Supabase account (free tier is sufficient)
- Access to your project files
- Basic understanding of environment variables

---

## Step 1: Create Supabase Project

### 1.1 Sign Up or Log In

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Create an account or log in with GitHub/email

### 1.2 Create a New Project

1. Click **"New project"** in your dashboard
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `wedding-rsvp` (or any name you prefer)
   - **Database Password**: Create a strong password and **SAVE IT** securely
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is sufficient for most weddings
4. Click **"Create new project"**
5. Wait 2-3 minutes for the project to initialize

---

## Step 2: Run Database Migration

### 2.1 Access the SQL Editor

1. In your Supabase project dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**

### 2.2 Execute the Migration Script

Copy and paste the following SQL script into the editor:

```sql
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
```

### 2.3 Run the Script

1. Click **"Run"** button (or press `Ctrl+Enter` / `Cmd+Enter`)
2. You should see a **"Success. No rows returned"** message
3. Verify the table was created:
   - Go to **"Table Editor"** in the left sidebar
   - You should see the `rsvps` table listed
   - Click on it to view the table structure

---

## Step 3: Configure Environment Variables

### 3.1 Get Your Supabase Credentials

1. In your Supabase dashboard, click **"Settings"** (gear icon at bottom left)
2. Click **"API"** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`

### 3.2 Update the .env File

1. Open the file `/wedding-site/.env` in your project
2. Update it with your credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important Notes:**
- Replace the entire URL with your Project URL
- Replace the entire key with your anon public key
- Make sure there are NO spaces around the `=` sign
- Make sure there are NO quotes around the values
- The anon key is safe to expose publicly (it's called "public" for a reason)

### 3.3 Save and Restart

1. Save the `.env` file
2. If your development server is running, restart it:
   ```bash
   # Stop the server (Ctrl+C)
   # Start it again
   npm run dev
   ```

---

## Step 4: Verify Setup

### 4.1 Check Environment Variables

1. Open your browser's developer console (F12)
2. Go to your wedding website
3. Type this in the console:

```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
```

You should see:
- Your Supabase URL printed
- `true` for the key exists check

### 4.2 Check Database Connection

In the Supabase dashboard:

1. Go to **"Table Editor"**
2. Click on the `rsvps` table
3. Verify these columns exist:
   - id
   - created_at
   - guest_name
   - email
   - attending_mairie
   - guests_mairie
   - attending_corse
   - guests_corse
   - attending_brunch
   - guests_brunch
   - plus_one_name
   - dietary_restrictions
   - message

### 4.3 Verify RLS Policies

1. In Supabase dashboard, go to **"Authentication"** → **"Policies"**
2. Select the `rsvps` table
3. You should see one policy:
   - **"Allow anonymous users to insert RSVPs"**
   - Command: INSERT
   - Roles: anon

---

## Step 5: Test RSVP Submission

### 5.1 Submit a Test RSVP

1. Go to the RSVP page on your website
2. Fill in the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Check at least one event
   - Add number of guests
3. Click **"Envoyer ma réponse"**

### 5.2 Check Console Logs

Open the browser console (F12) and look for:
- `📤 Submitting RSVP...`
- `📊 RSVP data to insert:`
- `📥 Response from Supabase:`
- `✅ RSVP submitted successfully`

If you see these messages, it worked!

### 5.3 Verify in Database

1. Go to Supabase dashboard → **"Table Editor"**
2. Click on the `rsvps` table
3. You should see your test RSVP entry
4. Delete the test entry by clicking the trash icon

---

## Troubleshooting

### Problem: "Impossible de contacter le serveur"

**Symptoms:**
- Form submission fails immediately
- Console shows "Failed to fetch" error
- No data reaches Supabase

**Solutions:**

1. **Check .env file:**
   ```bash
   # Make sure the file exists
   ls wedding-site/.env

   # Check the content
   cat wedding-site/.env
   ```
   - Verify `VITE_SUPABASE_URL` is set correctly
   - Verify `VITE_SUPABASE_ANON_KEY` is set correctly
   - No extra spaces or quotes

2. **Restart the development server:**
   ```bash
   # Stop with Ctrl+C
   # Start again
   cd wedding-site
   npm run dev
   ```

3. **Check Supabase project status:**
   - Go to your Supabase dashboard
   - Make sure the project is active (not paused)
   - Free tier projects pause after 7 days of inactivity

4. **Test API connection manually:**
   Open browser console and run:
   ```javascript
   fetch('https://your-project.supabase.co/rest/v1/')
     .then(r => r.json())
     .then(console.log)
   ```
   Replace with your actual Supabase URL. Should return project info.

---

### Problem: "La table rsvps n'existe pas"

**Symptoms:**
- Console error: `PGRST301` or "relation does not exist"
- Form submits but returns error

**Solutions:**

1. **Verify table exists:**
   - Go to Supabase → **Table Editor**
   - Look for `rsvps` table
   - If missing, run the migration script again (Step 2)

2. **Check table schema:**
   - Click on the `rsvps` table
   - Verify all columns exist
   - If columns are missing, run the migration script again

3. **Force schema cache reload:**
   - Go to Supabase → **SQL Editor**
   - Run: `NOTIFY pgrst, 'reload schema';`
   - Wait 10 seconds and try again

---

### Problem: "Erreur de permission"

**Symptoms:**
- Console error: `PGRST116` or "new row violates row-level security policy"
- RLS is blocking the insert

**Solutions:**

1. **Check RLS policies:**
   - Go to Supabase → **Authentication** → **"Policies"**
   - Select `rsvps` table
   - Should have one INSERT policy for `anon` role

2. **Verify RLS is enabled correctly:**
   - Go to Supabase → **SQL Editor**
   - Run:
     ```sql
     SELECT tablename, rowsecurity
     FROM pg_tables
     WHERE tablename = 'rsvps';
     ```
   - `rowsecurity` should be `true`

3. **Recreate the policy:**
   ```sql
   DROP POLICY IF EXISTS "Allow anonymous users to insert RSVPs" ON public.rsvps;

   CREATE POLICY "Allow anonymous users to insert RSVPs"
     ON public.rsvps
     FOR INSERT
     TO anon
     WITH CHECK (true);
   ```

---

### Problem: "Le nombre d'invités doit être entre 0 et 10"

**Symptoms:**
- Console error: `23514` or "check constraint violation"
- Guest count is invalid

**Solutions:**

1. **Check form validation:**
   - Guest count fields have `min="1"` and `max="10"`
   - If you need different limits, update both:
     - The HTML form attributes
     - The database CHECK constraints

2. **Update constraints if needed:**
   ```sql
   ALTER TABLE public.rsvps
   DROP CONSTRAINT IF EXISTS guests_mairie_range,
   DROP CONSTRAINT IF EXISTS guests_corse_range,
   DROP CONSTRAINT IF EXISTS guests_brunch_range;

   ALTER TABLE public.rsvps
   ADD CONSTRAINT guests_mairie_range CHECK (guests_mairie >= 0 AND guests_mairie <= 20),
   ADD CONSTRAINT guests_corse_range CHECK (guests_corse >= 0 AND guests_corse <= 20),
   ADD CONSTRAINT guests_brunch_range CHECK (guests_brunch >= 0 AND guests_brunch <= 20);
   ```

---

### Problem: Console shows valid data but nothing in database

**Symptoms:**
- Console shows success messages
- No errors in console
- Database table is empty

**Solutions:**

1. **Check you're looking at the right project:**
   - Verify the Supabase URL in `.env` matches your dashboard URL
   - Make sure you're not looking at a different project

2. **Check table filters:**
   - In Table Editor, remove any filters
   - Refresh the page
   - Check the row count at the bottom

3. **Query directly:**
   ```sql
   SELECT COUNT(*) FROM public.rsvps;
   SELECT * FROM public.rsvps ORDER BY created_at DESC LIMIT 10;
   ```

---

### Problem: CORS or Network Errors

**Symptoms:**
- CORS policy errors in console
- Network errors
- 403 or 404 responses

**Solutions:**

1. **Verify Supabase URL format:**
   - Should be: `https://xxxxx.supabase.co`
   - No trailing slash
   - Must be HTTPS

2. **Check project status:**
   - Free tier projects auto-pause after 1 week inactivity
   - Go to Supabase dashboard to restore

3. **Test with curl:**
   ```bash
   curl -X POST 'https://your-project.supabase.co/rest/v1/rsvps' \
     -H "apikey: your-anon-key" \
     -H "Authorization: Bearer your-anon-key" \
     -H "Content-Type: application/json" \
     -d '{"guest_name":"Test","email":"test@test.com"}'
   ```

---

## How to View RSVPs

### Option 1: Supabase Dashboard (Recommended)

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Click on the `rsvps` table
4. View all submissions

**Features:**
- Sort by any column
- Filter results
- Export to CSV
- View individual entries

### Option 2: SQL Query

For more advanced queries:

```sql
-- View all RSVPs ordered by submission date
SELECT
  guest_name,
  email,
  attending_mairie,
  guests_mairie,
  attending_corse,
  guests_corse,
  attending_brunch,
  guests_brunch,
  dietary_restrictions,
  message,
  created_at
FROM public.rsvps
ORDER BY created_at DESC;

-- Count attendees per event
SELECT
  SUM(CASE WHEN attending_mairie THEN guests_mairie ELSE 0 END) as total_mairie,
  SUM(CASE WHEN attending_corse THEN guests_corse ELSE 0 END) as total_corse,
  SUM(CASE WHEN attending_brunch THEN guests_brunch ELSE 0 END) as total_brunch
FROM public.rsvps;

-- View dietary restrictions
SELECT guest_name, dietary_restrictions
FROM public.rsvps
WHERE dietary_restrictions IS NOT NULL AND dietary_restrictions != '';
```

### Option 3: Export Data

1. In Supabase Table Editor, select the `rsvps` table
2. Click **"Export"** button
3. Choose format (CSV recommended)
4. Open in Excel/Google Sheets

---

## Security Notes

### What's Protected

✅ **Anonymous users CAN:**
- Submit RSVPs (INSERT only)
- Submit multiple times (no restrictions)

❌ **Anonymous users CANNOT:**
- View other RSVPs
- Edit or delete RSVPs
- View the list of attendees

### Admin Access

Only authenticated database users can view RSVPs:
- Supabase dashboard users (you)
- Service role key (for backend operations)
- Direct database access

### Data Privacy

- Guest information is private by default
- No public API to retrieve RSVPs
- Only admins can export data
- Perfect for GDPR compliance

---

## Production Deployment

When deploying to production (Netlify, Vercel, etc.):

1. **Add environment variables to your hosting platform:**
   - `VITE_SUPABASE_URL` → Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` → Your anon key

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Test the production build locally:**
   ```bash
   npm run preview
   ```

4. **Deploy:**
   - Push to GitHub/GitLab
   - Hosting platform will auto-deploy
   - Verify RSVP form works in production

---

## Need More Help?

### Common Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

### Debugging Tips

1. **Always check browser console first** (F12)
2. **Enable verbose logging** in Supabase client
3. **Test with Supabase SQL Editor** to isolate issues
4. **Check Supabase Logs** in dashboard under "Logs"

### Quick Diagnostic Checklist

- [ ] Supabase project is active (not paused)
- [ ] `.env` file exists in `/wedding-site/` directory
- [ ] Environment variables are set correctly (no quotes, no spaces)
- [ ] `rsvps` table exists in Supabase
- [ ] RLS is enabled on `rsvps` table
- [ ] INSERT policy exists for `anon` role
- [ ] Development server was restarted after changing `.env`
- [ ] Browser console shows no network errors
- [ ] Test submission shows success in console logs

---

**Last Updated:** December 30, 2025

**Questions?** Check the troubleshooting section or review the console logs for detailed error messages.
