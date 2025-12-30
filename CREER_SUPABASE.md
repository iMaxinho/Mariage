# Comment Créer Votre Projet Supabase (5 minutes)

## 🚀 Étape 1 : Créer un Compte Supabase (2 min)

1. Allez sur **https://supabase.com**
2. Cliquez sur **"Start your project"** (en haut à droite)
3. Connectez-vous avec :
   - GitHub (recommandé) OU
   - Google OU
   - Email

## 📦 Étape 2 : Créer un Nouveau Projet (2 min)

1. Cliquez sur **"New Project"** (bouton vert)
2. Remplissez le formulaire :
   ```
   Name: wedding-rsvp
   Database Password: [Créez un mot de passe fort - NOTEZ-LE!]
   Region: Europe West (Frankfurt) ou Europe (Paris)
   Pricing Plan: Free
   ```
3. Cliquez sur **"Create new project"**
4. ⏰ Attendez 2-3 minutes (barre de progression s'affichera)

## 🔑 Étape 3 : Récupérer Vos Credentials (30 secondes)

1. Une fois le projet créé, dans le menu de gauche, cliquez sur l'icône **⚙️ Settings**
2. Cliquez sur **API** dans le sous-menu
3. Vous verrez deux sections importantes :

   **Project URL**
   ```
   https://XXXXXXXXXX.supabase.co
   ```
   👉 Copiez cette URL complète

   **Project API keys**
   - Trouvez la clé **"anon" "public"** (pas la "service_role")
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey... (très longue)
   ```
   👉 Copiez cette clé complète (utilisez le bouton de copie)

## ✏️ Étape 4 : Configurer Votre Projet (30 secondes)

Ouvrez le fichier `wedding-site/.env` et remplacez TOUT le contenu par :

```env
VITE_SUPABASE_URL=https://XXXXXXXXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...
```

⚠️ **IMPORTANT** : Remplacez `XXXXXXXXXX.supabase.co` par VOTRE URL et `eyJ...` par VOTRE clé.

## 🗄️ Étape 5 : Créer la Base de Données (1 min)

1. Dans Supabase, cliquez sur **SQL Editor** (icône de base de données dans le menu)
2. Cliquez sur **"+ New query"**
3. Copiez-collez le script ci-dessous :

```sql
-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  email text NOT NULL,
  dietary_restrictions text,
  message text,
  created_at timestamptz DEFAULT now(),
  attending_mairie boolean DEFAULT false,
  guests_mairie integer DEFAULT 0,
  attending_corse boolean DEFAULT false,
  guests_corse integer DEFAULT 0,
  attending_brunch boolean DEFAULT false,
  guests_brunch integer DEFAULT 0,
  plus_one_name text
);

-- Enable RLS
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create function to insert RSVPs (bypasses RLS)
CREATE OR REPLACE FUNCTION insert_rsvp(
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
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_id uuid;
BEGIN
  INSERT INTO rsvps (
    guest_name,
    email,
    attending_mairie,
    guests_mairie,
    attending_corse,
    guests_corse,
    attending_brunch,
    guests_brunch,
    plus_one_name,
    dietary_restrictions,
    message
  ) VALUES (
    p_guest_name,
    p_email,
    p_attending_mairie,
    p_guests_mairie,
    p_attending_corse,
    p_guests_corse,
    p_attending_brunch,
    p_guests_brunch,
    p_plus_one_name,
    p_dietary_restrictions,
    p_message
  )
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION insert_rsvp TO anon;
```

4. Cliquez sur **"RUN"** (ou appuyez sur F5)
5. Vous devriez voir : ✅ **"Success. No rows returned"**

## 🎉 Étape 6 : Tester

1. **Redémarrez votre serveur de développement** :
   - Arrêtez-le (Ctrl+C dans le terminal)
   - Relancez : `npm run dev`

2. Rechargez votre page web

3. Remplissez et soumettez le formulaire RSVP

4. Pour vérifier que ça marche :
   - Dans Supabase, allez dans **Table Editor**
   - Cliquez sur la table **"rsvps"**
   - Vous devriez voir votre réponse ! 🎊

## ❌ Dépannage Rapide

### Erreur : "Missing Supabase environment variables"
- Vérifiez que le fichier est bien `wedding-site/.env` (pas juste `.env`)
- Les variables doivent commencer par `VITE_`
- Redémarrez le serveur après modification

### Erreur : "Function not found"
- Réexécutez le script SQL complet dans SQL Editor
- Vérifiez dans **Database** > **Functions** que `insert_rsvp` existe

### Le formulaire affiche toujours "Failed to fetch"
1. Vérifiez que vous avez bien redémarré le serveur
2. Videz le cache du navigateur (Ctrl+Shift+R)
3. Vérifiez la console du navigateur (F12) pour des erreurs détaillées

## 📊 Voir Vos Réponses

Pour consulter tous les RSVPs reçus :
1. Allez dans **Table Editor** dans Supabase
2. Cliquez sur la table **"rsvps"**
3. Toutes les réponses s'affichent en temps réel !

## 💡 Conseils

- L'URL et la clé sont publiques (côté client), c'est normal
- La sécurité est gérée par RLS (Row Level Security)
- Le plan gratuit permet 500 MB de base de données et 50 000 utilisateurs actifs par mois
- Supabase peut mettre en pause votre projet après 1 semaine d'inactivité (plan gratuit) - il suffit de le réactiver

---

**Besoin d'aide ?** Consultez la [documentation Supabase](https://supabase.com/docs) ou vérifiez les logs dans **Logs** > **Postgres Logs**.
