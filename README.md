# RSVP Form Application

A production-ready RSVP form built with React, Vite, and Supabase.

## Features

- ✅ Simple, clean RSVP form
- ✅ Real-time validation
- ✅ Loading, success, and error states
- ✅ Anonymous submissions (no authentication required)
- ✅ Secure with Row Level Security (RLS)
- ✅ Mobile responsive
- ✅ Production-ready error handling

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Supabase (PostgreSQL + REST API)
- **Styling**: Vanilla CSS

## Prerequisites

1. A Supabase account ([sign up free](https://supabase.com))
2. Node.js 18+ installed

## Setup Instructions

### 1. Database Setup

First, create the database table in Supabase. Go to your Supabase project's SQL Editor and run this SQL:

```sql
-- Create the RSVP table
CREATE TABLE IF NOT EXISTS rsvps_simple (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  name text NOT NULL CHECK (length(trim(name)) > 0),
  email text,
  guests integer NOT NULL DEFAULT 1 CHECK (guests >= 1 AND guests <= 10),
  attendance text NOT NULL CHECK (attendance IN ('yes', 'no')),
  message text
);

-- Enable Row Level Security
ALTER TABLE rsvps_simple ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert RSVPs (public submissions)
CREATE POLICY "Anyone can submit RSVP"
  ON rsvps_simple
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to view all RSVPs (for admin)
CREATE POLICY "Authenticated users can view RSVPs"
  ON rsvps_simple
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS rsvps_simple_created_at_idx
  ON rsvps_simple(created_at DESC);
```

### 2. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (this is your `VITE_SUPABASE_URL`)
   - **anon/public key** (this is your `VITE_SUPABASE_ANON_KEY`)

### 3. Environment Variables Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
```

**Important**: Replace `<YOUR_SUPABASE_URL>` and `<YOUR_SUPABASE_ANON_KEY>` with your actual values from step 2.

Example:
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjM1NDU2NzgsImV4cCI6MTkzOTEyMTY3OH0.example
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your repository
4. In the **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git" and select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. In **Environment variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click "Deploy site"

### Deploy to Bolt (StackBlitz)

If you're using Bolt.new or StackBlitz:

1. Make sure your `.env` file exists with the correct values
2. The environment variables should be automatically loaded
3. If not, you can set them in the StackBlitz environment settings

## Error Handling

The application handles these common errors:

1. **Missing Environment Variables**
   - Shows configuration error with instructions
   - Won't attempt to connect to Supabase

2. **RLS Permission Denied**
   - Error code: `42501`
   - Message: "Permission denied: Unable to submit RSVP..."
   - Solution: Make sure you ran the SQL to create the RLS policy

3. **Invalid Data**
   - Error code: `23514`
   - Message: "Invalid data: Please check that the number of guests is between 1 and 10"
   - Solution: Form validation should prevent this, but checked server-side

4. **Network Errors**
   - Message: "Network error: Unable to connect to the server..."
   - Solution: Check internet connection

## Database Schema

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY | Auto-generated unique ID |
| `created_at` | timestamptz | NOT NULL | Submission timestamp |
| `name` | text | NOT NULL | Guest name (required) |
| `email` | text | - | Guest email (optional) |
| `guests` | integer | 1-10 | Number of guests |
| `attendance` | text | 'yes' or 'no' | Attendance status |
| `message` | text | - | Optional message |

## Security

- ✅ **Row Level Security (RLS)** enabled
- ✅ **Anonymous inserts only** - users can submit but not read others' RSVPs
- ✅ **Server-side validation** - constraints enforced in database
- ✅ **No SQL injection** - using Supabase parameterized queries
- ✅ **HTTPS only** - Supabase uses SSL/TLS by default

## Viewing Submissions

To view RSVP submissions:

1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Select `rsvps_simple` table
4. You'll see all submissions

Or query via SQL Editor:

```sql
SELECT
  name,
  email,
  guests,
  attendance,
  message,
  created_at
FROM rsvps_simple
ORDER BY created_at DESC;
```

## Troubleshooting

### "Configuration error: Supabase credentials are missing"

**Solution**: Make sure you have a `.env` file with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set.

### "Permission denied: Unable to submit RSVP"

**Solution**: Run the SQL to create the RLS policy (see Database Setup above).

### Form submits but doesn't show success

**Solution**: Check the browser console for errors. Make sure your Supabase credentials are correct.

### "Network error" on submit

**Solution**:
1. Check your internet connection
2. Verify the Supabase URL is correct
3. Make sure your Supabase project is not paused (free tier projects pause after inactivity)

## License

MIT
