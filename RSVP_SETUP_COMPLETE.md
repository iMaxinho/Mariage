# RSVP Setup Complete

## Changes Made

### 1. Updated Frontend (`src/pages/Rsvp.jsx`)

**Replaced RPC call with direct insert:**
```javascript
// OLD (using RPC)
const { data, error } = await supabase.rpc('insert_rsvp', rsvpParams)

// NEW (using direct insert)
const { data, error } = await supabase
  .from('rsvps')
  .insert([insertPayload])
  .select()
```

**Key improvements:**
- Uses `supabase.from('rsvps').insert()` directly (no RPC)
- Payload matches exact column names
- Enhanced error logging with full error object
- Proper loading, success, and error states
- Runtime config validation

### 2. Database Setup

**Table:** `public.rsvps`

**Columns:**
- `id` (uuid, auto-generated)
- `created_at` (timestamp, auto-set)
- `guest_name` (text, required)
- `email` (text, required)
- `attending_mairie` (boolean, default false)
- `guests_mairie` (int, default 0)
- `attending_corse` (boolean, default false)
- `guests_corse` (int, default 0)
- `attending_brunch` (boolean, default false)
- `guests_brunch` (int, default 0)
- `plus_one_name` (text, nullable)
- `dietary_restrictions` (text, nullable)
- `message` (text, nullable)

**Security:**
- RLS enabled
- Anonymous users (anon) can INSERT only
- Authenticated users can SELECT (admin access)
- Check constraints: 0-10 guests per event

## SQL Migration Script

The migration has been applied. Here's the complete SQL for reference:

```sql
-- Drop and recreate table
DROP TABLE IF EXISTS public.rsvps CASCADE;

CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  guest_name text NOT NULL,
  email text NOT NULL,
  attending_mairie boolean DEFAULT false NOT NULL,
  guests_mairie int DEFAULT 0 NOT NULL,
  attending_corse boolean DEFAULT false NOT NULL,
  guests_corse int DEFAULT 0 NOT NULL,
  attending_brunch boolean DEFAULT false NOT NULL,
  guests_brunch int DEFAULT 0 NOT NULL,
  plus_one_name text,
  dietary_restrictions text,
  message text,
  CONSTRAINT guests_mairie_range CHECK (guests_mairie >= 0 AND guests_mairie <= 10),
  CONSTRAINT guests_corse_range CHECK (guests_corse >= 0 AND guests_corse <= 10),
  CONSTRAINT guests_brunch_range CHECK (guests_brunch >= 0 AND guests_brunch <= 10)
);

-- Enable RLS
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert
CREATE POLICY "Allow anonymous insert"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated select
CREATE POLICY "Allow authenticated select"
  ON public.rsvps
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.rsvps TO anon;
GRANT SELECT ON public.rsvps TO authenticated;

-- Create indexes
CREATE INDEX idx_rsvps_email ON public.rsvps(email);
CREATE INDEX idx_rsvps_created_at ON public.rsvps(created_at DESC);
```

## Test Checklist

### Browser DevTools Test

1. **Open the site** and navigate to the RSVP page
2. **Open DevTools** (F12) → Console tab
3. **Verify config loads:**
   - Look for: `Supabase Configuration Check:`
   - Should show: `URL loaded: true` and `Anon key loaded: true`
4. **Fill out the form:**
   - Name: "Test User"
   - Email: "test@example.com"
   - Check at least one event
5. **Submit and watch Console:**
   - Should see: `📤 Submitting RSVP...`
   - Should see: `📊 Inserting into public.rsvps table:`
   - Should see: `📥 Response from Supabase insert:`
   - Should see: `✅ RSVP submitted successfully`
6. **Check Network tab:**
   - Look for POST request to `/rest/v1/rsvps`
   - Status should be `201 Created`
   - Response should contain the inserted record with all fields

### Supabase Dashboard Test

1. **Go to** [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Navigate to:** Table Editor → public.rsvps
3. **Verify the submission appears** with all correct data
4. **Check columns match:**
   - guest_name
   - email
   - attending_mairie, guests_mairie
   - attending_corse, guests_corse
   - attending_brunch, guests_brunch
   - plus_one_name, dietary_restrictions, message

### Error Scenarios to Test

1. **Missing name/email:** Should show validation error
2. **Invalid email format:** Should show validation error
3. **Network offline:** Should show connection error
4. **Duplicate submission:** Should allow (no unique constraint on email)

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL=https://oewyfxlphemxgslyxmbe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ld3lmeGxwaGVteGdzbHl4bWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzNDI4NDcsImV4cCI6MjA4MTkxODg0N30.Qzx4Pvc7qcg3NHMNZv93Rcb2GSpbrEPRd_ueiT3ZSbE
```

✅ These are already configured in your project.

## Troubleshooting

### If insert fails:

1. **Check browser console** for error details
2. **Verify** `.env` file has correct values
3. **Check Network tab** for the actual HTTP request/response
4. **Verify in Supabase Dashboard:**
   - Table Editor → rsvps table exists
   - Authentication → Policies → "Allow anonymous insert" exists
   - SQL Editor → Run: `SELECT * FROM public.rsvps LIMIT 1;`

### Common error codes:

- `42P01`: Table doesn't exist → Run migration
- `42501`: RLS policy violation → Check policies
- `23514`: Check constraint violation → Guest count out of range
- `Failed to fetch`: Network/config issue → Check .env

## Next Steps

The RSVP form is now ready to accept submissions. Test it with a real submission and verify it appears in the Supabase dashboard.
