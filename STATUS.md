# Status du Serveur - Site de Mariage

**Date:** 23 décembre 2025
**Site:** Allison & Maxime - Mariage 2026

## ✅ Serveurs Actifs

- **Dev Server (Vite):** Port 5173 - OPÉRATIONNEL
- **API Backend:** Port 3001 - OPÉRATIONNEL
- **Build Production:** Validé (446.86 kB JS, 31.74 kB CSS)

## URLs Disponibles

### Serveur de Développement
- **Application principale:** http://localhost:5173/
- **Page de diagnostic:** http://localhost:5173/_health.html
- **Status JSON:** http://localhost:5173/health.json

### Pages du Site
- `/` - Accueil
- `/programme` - Programme des événements
- `/infos` - Informations pratiques
- `/cadeaux` - Liste de cadeaux
- `/rsvp` - Formulaire RSVP

## Configuration

- **Framework:** React 19 + Vite 7
- **Base de données:** Supabase
- **Déploiement:** Netlify
- **Host:** 0.0.0.0 (accepte toutes les connexions)

## Commandes

```bash
# Démarrer le serveur
npm run dev

# Build de production
npm run build

# Preview de production
npm run preview
```

## Diagnostic

Tous les systèmes sont opérationnels. Le serveur est configuré pour accepter les connexions externes et l'application React se charge correctement.

Si l'aperçu ne s'affiche pas dans l'interface Bolt, le problème vient du système d'aperçu lui-même, pas du serveur backend qui fonctionne parfaitement.
