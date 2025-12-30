# Diagnostic du Site de Mariage - Allison & Maxime

**Date:** 23 décembre 2025
**Status:** ✅ SERVEURS OPÉRATIONNELS

## État des Serveurs

### Serveur de Développement (Vite)
- **Port:** 5173
- **Status:** ✅ ACTIF (HTTP 200)
- **URL:** http://localhost:5173/
- **Commande:** `npm run dev`

### Serveur API
- **Port:** 3001
- **Status:** ✅ ACTIF (HTTP 200)
- **URL:** http://localhost:3001/api/health
- **Connexion Supabase:** ✅ Connectée

### Serveur Preview (Production Build)
- **Port:** 4173
- **Status:** ✅ ACTIF (HTTP 200)
- **URL:** http://localhost:4173/
- **Build:** ✅ Réussi (446.86 kB JS, 31.74 kB CSS)

## Tests de Validation

### ✅ Pages Accessibles
- `/` - Page d'accueil
- `/test-direct.html` - Page de test statique
- `/index-simple.html` - Page de test simplifiée
- `/test.html` - Page de diagnostic
- `/status.json` - Statut JSON

### ✅ Composants React
- ErrorBoundary: Fonctionnel
- Navigation: Fonctionnelle
- Home: Fonctionnel
- Programme: Fonctionnel
- Infos: Fonctionnel
- Cadeaux: Fonctionnel
- RSVP: Fonctionnel

### ✅ Build de Production
```
dist/index.html                   1.26 kB │ gzip:   0.57 kB
dist/assets/index-DsldOqJM.css   31.74 kB │ gzip:   6.64 kB
dist/assets/index-gki8ftOH.js   446.86 kB │ gzip: 128.90 kB
```

## URLs de Test

Pour vérifier que tout fonctionne:

1. **Application React principale:** http://localhost:5173/
2. **Page de test simple:** http://localhost:5173/test-direct.html
3. **Version production:** http://localhost:4173/
4. **Status API:** http://localhost:3001/api/health
5. **Status JSON:** http://localhost:5173/status.json

## Configuration

### Vite Configuration
- Host: 0.0.0.0 (accessible de l'extérieur)
- Port: 5173 (dev), 4173 (preview)
- HMR: WebSocket configuré
- Proxy API: /api → http://localhost:3001

### Supabase
- URL: https://oewyfxlphemxgslyxmbe.supabase.co
- Connexion: ✅ Active
- Tables: rsvps disponible

## Processus en Cours d'Exécution

```
✓ node server.js (API backend)
✓ vite (dev server - port 5173)
✓ vite preview (preview server - port 4173)
```

## Solutions si l'Aperçu ne s'Affiche Pas

Si vous ne voyez toujours pas l'aperçu dans votre interface:

1. **Vérifiez le port de l'aperçu:**
   - L'aperçu doit pointer vers `http://localhost:5173/`
   - Ou vers `http://localhost:4173/` pour la version production

2. **Rafraîchissez complètement:**
   - Ctrl+F5 (Windows/Linux)
   - Cmd+Shift+R (Mac)

3. **Testez dans un navigateur directement:**
   - Ouvrez http://localhost:5173/ dans Chrome/Firefox

4. **Vérifiez la console du navigateur:**
   - Appuyez sur F12
   - Regardez s'il y a des erreurs dans l'onglet Console

5. **Redémarrez le serveur:**
   ```bash
   npm run dev
   ```

## Logs

Les logs du serveur sont disponibles dans:
- `/tmp/cc-agent/60756676/project/server.log`
- `/tmp/cc-agent/60756676/project/wedding-site/preview.log`
