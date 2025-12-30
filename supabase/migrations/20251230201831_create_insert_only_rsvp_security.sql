/*
  # INSERT-only Security Policy for RSVP Table

  ## Security Configuration
  
  1. Row Level Security (RLS)
    - **RLS is ENABLED** on the `rsvps` table
    - No users can access data by default (restrictive)
  
  2. Policies
    - **INSERT-only for anon role**: Allows anonymous users to submit RSVPs
    - **INSERT-only for authenticated role**: Allows authenticated users to submit RSVPs
    - **NO SELECT/UPDATE/DELETE policies**: Data cannot be read, modified, or deleted by public users
  
  3. Permissions
    - `anon` role: INSERT only
    - `authenticated` role: INSERT only
    - `service_role` role: Full access (for admin/backend operations)
  
  4. Frontend Implementation
    - Uses direct `supabase.from('rsvps').insert()` without `.select()`
    - No RPC functions required
  
  5. Anti-Spam Measures
    - Honeypot field ("website") added to form
    - Bots filling this field receive fake success without database insertion
  
  ## Important Notes
  
  This configuration prioritizes data security:
  - Users can only submit RSVPs, not view or modify existing ones
  - All data retrieval must be done through admin/service accounts
  - RLS remains enabled to prevent accidental data exposure
*/

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.rsvps;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.rsvps;
DROP POLICY IF EXISTS "Allow insert for anon users" ON public.rsvps;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.rsvps;

-- Revoke all public permissions
REVOKE ALL ON public.rsvps FROM anon;
REVOKE ALL ON public.rsvps FROM authenticated;

-- Grant only INSERT permission
GRANT INSERT ON public.rsvps TO anon;
GRANT INSERT ON public.rsvps TO authenticated;

-- Ensure RLS is enabled
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Create INSERT-only policies
CREATE POLICY "Allow insert for anon users"
  ON public.rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow insert for authenticated users"
  ON public.rsvps
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
