# Solution au problème RSVP

## Problème identifié

L'erreur `Could not find the 'attending_brunch' column of 'rsvps' in the schema cache` était causée par un problème de cache PostgREST. Même si la colonne existait bien dans la base de données, PostgREST ne mettait pas à jour son cache de schéma.

## Vérifications effectuées

### 1. Base de données ✅
- La table `rsvps` existe avec toutes les colonnes requises
- La colonne `attending_brunch` est bien présente
- Les insertions SQL directes fonctionnent parfaitement
- Les politiques RLS sont correctement configurées

### 2. Structure de la table `public.rsvps`

| Colonne | Type | Nullable | Default |
|---------|------|----------|---------|
| id | uuid | NO | gen_random_uuid() |
| created_at | timestamptz | NO | now() |
| guest_name | text | NO | - |
| email | text | NO | - |
| attending_mairie | boolean | NO | false |
| guests_mairie | integer | NO | 0 |
| attending_corse | boolean | NO | false |
| guests_corse | integer | NO | 0 |
| attending_brunch | boolean | NO | false |
| guests_brunch | integer | NO | 0 |
| plus_one_name | text | YES | - |
| dietary_restrictions | text | YES | - |
| message | text | YES | - |

### 3. Politiques RLS ✅

**Pour les utilisateurs anonymes (anon):**
- INSERT autorisé sur la table `rsvps`

**Pour les utilisateurs authentifiés:**
- SELECT autorisé sur la table `rsvps`

## Solution mise en place

### Fonction RPC `insert_rsvp`

Au lieu d'utiliser l'API REST de Supabase (qui utilise PostgREST), nous utilisons maintenant une fonction stockée PostgreSQL qui contourne complètement le cache PostgREST.

**Avantages:**
- Contourne le problème de cache PostgREST
- Plus fiable
- Validation côté serveur
- Meilleure gestion des erreurs
- SECURITY DEFINER pour garantir l'exécution avec les bons privilèges

**Signature de la fonction:**
```sql
insert_rsvp(
  p_guest_name text,
  p_email text,
  p_attending_mairie boolean DEFAULT false,
  p_guests_mairie integer DEFAULT 0,
  p_attending_corse boolean DEFAULT false,
  p_guests_corse integer DEFAULT 0,
  p_attending_brunch boolean DEFAULT false,
  p_guests_brunch integer DEFAULT 0,
  p_plus_one_name text DEFAULT NULL,
  p_dietary_restrictions text DEFAULT NULL,
  p_message text DEFAULT NULL
) RETURNS json
```

## Changements apportés

### Frontend (Rsvp.jsx)

**Avant:**
```javascript
const { data, error } = await supabase
  .from('rsvps')
  .insert([rsvpData])
  .select()
```

**Après:**
```javascript
const rsvpParams = {
  p_guest_name: formData.guest_name.trim(),
  p_email: formData.email.trim(),
  p_attending_mairie: formData.attending_mairie,
  p_guests_mairie: formData.guests_mairie,
  p_attending_corse: formData.attending_corse,
  p_guests_corse: formData.guests_corse,
  p_attending_brunch: formData.attending_brunch,
  p_guests_brunch: formData.guests_brunch,
  p_plus_one_name: formData.plus_one_name?.trim() || null,
  p_dietary_restrictions: formData.dietary_restrictions?.trim() || null,
  p_message: formData.message?.trim() || null
}

const { data, error } = await supabase
  .rpc('insert_rsvp', rsvpParams)
```

## Tests effectués

### Test SQL direct ✅
```sql
INSERT INTO public.rsvps (...) VALUES (...) RETURNING *;
```
**Résultat:** Succès

### Test fonction RPC ✅
```sql
SELECT public.insert_rsvp('Jean Dupont', 'jean.dupont@example.com', ...);
```
**Résultat:** Succès - Retourne l'objet JSON complet de la RSVP créée

### Build du projet ✅
```bash
npm run build
```
**Résultat:** Succès - Aucune erreur

## Validations côté serveur

La fonction `insert_rsvp` inclut les validations suivantes:

1. **Nom requis** - Le champ `guest_name` ne peut pas être vide
2. **Email requis** - Le champ `email` ne peut pas être vide
3. **Format email** - Validation regex de l'email
4. **Nombre d'invités** - Doit être entre 0 et 10 pour chaque événement
5. **Trimming automatique** - Les espaces en début/fin sont automatiquement supprimés
6. **Conversion NULL** - Les chaînes vides sont converties en NULL pour les champs optionnels

## État actuel

✅ Table `rsvps` créée avec toutes les colonnes
✅ Fonction RPC `insert_rsvp` déployée et testée
✅ Frontend mis à jour pour utiliser la fonction RPC
✅ Politiques RLS configurées correctement
✅ Permissions GRANT accordées à `anon` et `authenticated`
✅ Build du projet réussi

## Pour tester

1. Ouvrez la page RSVP sur votre site
2. Remplissez le formulaire
3. Cochez les événements auxquels vous souhaitez participer
4. Soumettez le formulaire

Le formulaire devrait maintenant fonctionner sans l'erreur `Could not find the 'attending_brunch' column`.
