# Configuration Supabase Requise

## Problème Actuel

L'URL Supabase dans votre fichier `.env` est une URL fictive qui n'existe pas :
```
https://0ec90b57d6e95fcbda19832f.supabase.co
```

C'est pourquoi vous obtenez l'erreur **"TypeError: Failed to fetch"** - le navigateur ne peut pas atteindre cette URL.

## Solution : Créer un Vrai Projet Supabase

### Étape 1 : Créer un Compte Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub, Google, ou email

### Étape 2 : Créer un Nouveau Projet

1. Une fois connecté, cliquez sur **"New Project"**
2. Remplissez les informations :
   - **Name** : `wedding-rsvp` (ou le nom de votre choix)
   - **Database Password** : Créez un mot de passe fort (notez-le!)
   - **Region** : Choisissez la région la plus proche (ex: Europe West - Paris)
   - **Pricing Plan** : Sélectionnez **Free** (suffisant pour commencer)
3. Cliquez sur **"Create new project"**
4. Attendez 2-3 minutes que le projet soit créé

### Étape 3 : Récupérer les Credentials

1. Une fois le projet créé, allez dans **Settings** (icône d'engrenage dans la barre latérale)
2. Cliquez sur **API** dans le menu de gauche
3. Vous verrez deux informations importantes :

   **Project URL** (URL du projet)
   ```
   https://VOTRE_ID_PROJET.supabase.co
   ```

   **anon public** (Clé publique anonyme)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhY... (très longue clé)
   ```

4. Copiez ces deux valeurs

### Étape 4 : Configurer le Projet

1. Ouvrez le fichier `.env` dans le dossier `wedding-site`
2. Remplacez les valeurs par vos vraies credentials :

```env
VITE_SUPABASE_URL=https://VOTRE_ID_PROJET.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.votre_vraie_clé...
```

3. **IMPORTANT** : Redémarrez le serveur de développement après avoir modifié `.env`
   - Arrêtez le serveur (Ctrl+C)
   - Relancez avec `npm run dev`

### Étape 5 : Créer la Base de Données

1. Dans votre projet Supabase, cliquez sur **SQL Editor** dans la barre latérale
2. Cliquez sur **"New query"**
3. Copiez-collez le script SQL complet du fichier `SUPABASE_SETUP.md` (section "1. SQL Script to Run in Supabase")
4. Cliquez sur **"Run"** (ou F5)
5. Vous devriez voir un message de succès

### Étape 6 : Vérifier la Configuration

1. Rafraîchissez votre page web
2. Ouvrez la console du navigateur (F12)
3. Vous devriez voir :
   ```
   Supabase Configuration Check:
   - URL loaded: true
   - Anon key loaded: true
   ```
4. Essayez de soumettre un RSVP de test

### Étape 7 : Vérifier les Données

1. Allez dans **Table Editor** dans Supabase
2. Sélectionnez la table `rsvps`
3. Vous devriez voir votre RSVP de test apparaître !

## Dépannage

### Erreur : "Missing Supabase environment variables"
- Vérifiez que le fichier `.env` est bien dans le dossier `wedding-site/`
- Vérifiez que les noms des variables commencent par `VITE_`
- Redémarrez le serveur de développement

### Erreur : "Function not found: insert_rsvp"
- Retournez dans SQL Editor et exécutez le script SQL complet
- Vérifiez dans **Database** > **Functions** que `insert_rsvp` existe

### Erreur : "Permission denied"
- Vérifiez dans **Authentication** > **Policies** que les RLS policies existent
- Réexécutez le script SQL si nécessaire

### Le formulaire ne fonctionne toujours pas
1. Vérifiez la console du navigateur pour les erreurs détaillées
2. Vérifiez **Logs** > **Postgres Logs** dans Supabase pour voir les erreurs côté serveur
3. Assurez-vous que votre projet Supabase n'est pas en pause (Free tier)

## Support

Si vous rencontrez des problèmes :
1. Consultez la [documentation Supabase](https://supabase.com/docs)
2. Vérifiez les logs dans la console du navigateur ET dans Supabase
3. Assurez-vous que tous les fichiers de migration ont été exécutés

## Fichiers de Configuration

- **Frontend** : `wedding-site/.env`
- **Setup SQL** : `SUPABASE_SETUP.md`
- **Migrations** : `supabase/migrations/`

## Architecture Actuelle

```
Frontend (React)
    ↓
Supabase Client (@supabase/supabase-js)
    ↓
Supabase API (avec RLS)
    ↓
PostgreSQL Database
    └── Table: rsvps
    └── Function: insert_rsvp()
    └── RLS Policies
```

Le formulaire utilise la fonction `insert_rsvp()` pour insérer les données de manière sécurisée, en contournant les restrictions RLS tout en validant les données.
