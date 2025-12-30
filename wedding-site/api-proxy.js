import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

app.post('/api/submit-rsvp', async (req, res) => {
  try {
    console.log('Received RSVP submission:', req.body);

    const { guest_name, email, dietary_restrictions, message, attending_mairie, guests_mairie, attending_corse, guests_corse, attending_brunch, guests_brunch, plus_one_name } = req.body;

    const sql = `
      INSERT INTO rsvps (
        guest_name, email, dietary_restrictions, message,
        attending_mairie, guests_mairie,
        attending_corse, guests_corse,
        attending_brunch, guests_brunch,
        plus_one_name
      ) VALUES (
        '${guest_name.replace(/'/g, "''")}',
        '${email.replace(/'/g, "''")}',
        ${dietary_restrictions ? `'${dietary_restrictions.replace(/'/g, "''")}'` : 'NULL'},
        ${message ? `'${message.replace(/'/g, "''")}'` : 'NULL'},
        ${attending_mairie},
        ${guests_mairie},
        ${attending_corse},
        ${guests_corse},
        ${attending_brunch},
        ${guests_brunch},
        ${plus_one_name ? `'${plus_one_name.replace(/'/g, "''")}'` : 'NULL'}
      )
      RETURNING *;
    `;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({ query: sql })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Supabase error:', error);
      return res.status(400).json({ error: 'Database error', details: error });
    }

    const data = await response.json();
    console.log('RSVP inserted successfully');
    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: error.message || 'Une erreur est survenue'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API proxy is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API proxy server running on http://localhost:${PORT}`);
});
