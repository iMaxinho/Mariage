import { createClient } from '@supabase/supabase-js';

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
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const rsvpData = await req.json();

    const { data, error } = await supabase
      .from('rsvps')
      .insert([rsvpData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
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
