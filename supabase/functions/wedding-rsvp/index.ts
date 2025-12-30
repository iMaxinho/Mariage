import { Client } from 'https://deno.land/x/postgres@v0.17.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  const client = new Client(Deno.env.get('SUPABASE_DB_URL'));

  try {
    await client.connect();
    
    const rsvpData = await req.json();
    console.log('Received RSVP data:', rsvpData);

    const result = await client.queryObject`
      INSERT INTO rsvps (
        guest_name, email, dietary_restrictions, message,
        attending_mairie, guests_mairie,
        attending_corse, guests_corse,
        attending_brunch, guests_brunch,
        plus_one_name
      ) VALUES (
        ${rsvpData.guest_name},
        ${rsvpData.email},
        ${rsvpData.dietary_restrictions || null},
        ${rsvpData.message || null},
        ${rsvpData.attending_mairie || false},
        ${rsvpData.guests_mairie || 0},
        ${rsvpData.attending_corse || false},
        ${rsvpData.guests_corse || 0},
        ${rsvpData.attending_brunch || false},
        ${rsvpData.guests_brunch || 0},
        ${rsvpData.plus_one_name || null}
      )
      RETURNING *
    `;

    console.log('RSVP inserted successfully:', result.rows[0]);
    
    return new Response(
      JSON.stringify({ success: true, data: result.rows[0] }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Une erreur est survenue' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } finally {
    await client.end();
  }
});