---
title: Transformer le site en PWA (Progressive Web App)
status: todo
priority: low
type: feature
tags: [pwa, mobile]
created_by: agent
created_at: 2026-04-09T13:16:07Z
position: 11
---

## Notes
Rendre le site installable sur l'écran d'accueil d'un smartphone comme une vraie application native, avec icône personnalisée et chargement hors ligne basique.

Bénéfices :
- Accessibilité rapide (icône sur écran d'accueil)
- Expérience premium type application
- Fonctionne hors ligne (pages déjà visitées)

## Checklist
- [ ] Créer le fichier manifest.json avec métadonnées de l'app
- [ ] Générer les icônes PWA (192x192, 512x512)
- [ ] Configurer le Service Worker pour mise en cache basique
- [ ] Ajouter la balise <link rel="manifest"> dans _document.tsx
- [ ] Tester l'installation sur Android et iOS