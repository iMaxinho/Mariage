import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

if (!dbUrl) {
  console.error('Missing DATABASE_URL or SUPABASE_DB_URL');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('SUPABASE') || k.includes('DATABASE')));
  process.exit(1);
}

console.log('Connecting to database...');

const pool = new pg.Pool({
  connectionString: dbUrl,
  ssl: dbUrl.includes('supabase.co') ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

app.post('/api/submit-rsvp', async (req, res) => {
  let client;

  try {
    console.log('Received RSVP submission:', req.body);

    client = await pool.connect();
    console.log('Database connected');

    const { guest_name, email, dietary_restrictions, message, attending_mairie, guests_mairie, attending_corse, guests_corse, attending_brunch, guests_brunch, plus_one_name } = req.body;

    const result = await client.query(
      `INSERT INTO rsvps (
        guest_name, email, dietary_restrictions, message,
        attending_mairie, guests_mairie,
        attending_corse, guests_corse,
        attending_brunch, guests_brunch,
        plus_one_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        guest_name,
        email,
        dietary_restrictions || null,
        message || null,
        attending_mairie || false,
        guests_mairie || 0,
        attending_corse || false,
        guests_corse || 0,
        attending_brunch || false,
        guests_brunch || 0,
        plus_one_name || null
      ]
    );

    console.log('RSVP inserted successfully:', result.rows[0]);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: error.message || 'Une erreur est survenue',
      details: error.stack
    });
  } finally {
    if (client) {
      client.release();
    }
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
