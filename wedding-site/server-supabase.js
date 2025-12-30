import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'present' : 'missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'present' : 'missing');
  console.error('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'present' : 'missing');
}

console.log('Creating Supabase client...');
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  db: { schema: 'public' },
  auth: { persistSession: false }
});

app.post('/api/submit-rsvp', async (req, res) => {
  try {
    console.log('Received RSVP submission:', req.body);

    const rsvpData = {
      guest_name: req.body.guest_name,
      email: req.body.email,
      dietary_restrictions: req.body.dietary_restrictions || null,
      message: req.body.message || null,
      attending_mairie: req.body.attending_mairie || false,
      guests_mairie: req.body.guests_mairie || 0,
      attending_corse: req.body.attending_corse || false,
      guests_corse: req.body.guests_corse || 0,
      attending_brunch: req.body.attending_brunch || false,
      guests_brunch: req.body.guests_brunch || 0,
      plus_one_name: req.body.plus_one_name || null
    };

    const { data, error } = await supabase
      .from('rsvps')
      .insert([rsvpData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('RSVP inserted successfully:', data);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: error.message || 'Une erreur est survenue',
      details: error.stack
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
