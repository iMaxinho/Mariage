export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase credentials');
    }

    const rsvpData = await req.json();

    const { guest_name, email, dietary_restrictions, message, attending_mairie, guests_mairie, attending_corse, guests_corse, attending_brunch, guests_brunch, plus_one_name } = rsvpData;

    const sql = `
      INSERT INTO rsvps (
        guest_name, email, dietary_restrictions, message,
        attending_mairie, guests_mairie,
        attending_corse, guests_corse,
        attending_brunch, guests_brunch,
        plus_one_name, created_at
      ) VALUES (
        '${(guest_name || '').replace(/'/g, "''")}',
        '${(email || '').replace(/'/g, "''")}',
        ${dietary_restrictions ? `'${dietary_restrictions.replace(/'/g, "''")}'` : 'NULL'},
        ${message ? `'${message.replace(/'/g, "''")}'` : 'NULL'},
        ${attending_mairie ? 'true' : 'false'},
        ${guests_mairie || 0},
        ${attending_corse ? 'true' : 'false'},
        ${guests_corse || 0},
        ${attending_brunch ? 'true' : 'false'},
        ${guests_brunch || 0},
        ${plus_one_name ? `'${plus_one_name.replace(/'/g, "''")}'` : 'NULL'},
        now()
      )
      RETURNING *;
    `;

    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ query: sql })
    });

    const text = await response.text();

    if (!response.ok) {
      console.error('Supabase error response:', response.status, text);
      throw new Error(`Database error: ${text}`);
    }

    console.log('SQL executed successfully');
    return new Response(
      JSON.stringify({ success: true, message: 'RSVP submitted successfully' }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Une erreur est survenue' }),
      { status: 500, headers }
    );
  }
};

export const config = {
  path: '/api/submit-rsvp',
};
