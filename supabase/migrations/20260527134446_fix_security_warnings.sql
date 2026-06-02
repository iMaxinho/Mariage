/*
  # Fix security warnings

  1. contact_messages table
     - Revoke SELECT from anon and authenticated roles to prevent
       unauthorized data exposure via GraphQL schema

  2. insert_rsvp function
     - Change from SECURITY DEFINER to SECURITY INVOKER so it runs
       with the caller's permissions, not the owner's
*/

-- Revoke SELECT on contact_messages from anon and authenticated
REVOKE SELECT ON public.contact_messages FROM anon;
REVOKE SELECT ON public.contact_messages FROM authenticated;

-- Fix insert_rsvp function: switch to SECURITY INVOKER
ALTER FUNCTION public.insert_rsvp(
  p_guest_name text,
  p_email text,
  p_attending_mairie boolean,
  p_guests_mairie integer,
  p_attending_corse boolean,
  p_guests_corse integer,
  p_attending_brunch boolean,
  p_guests_brunch integer,
  p_plus_one_name text,
  p_dietary_restrictions text,
  p_message text
) SECURITY INVOKER;
