---
title: Suppression de la page calendrier
status: in_progress
priority: high
type: chore
tags: [cleanup, pages]
created_by: agent
created_at: 2026-06-09T16:35:00Z
position: 63
---

## Notes
La page `/calendar` pose des problèmes de déploiement (erreur SSG/Build). L'utilisateur souhaite la supprimer complètement ainsi que ses traces dans la configuration, sans toucher au reste de l'application.

## Checklist
- [x] Supprimer le fichier `src/pages/calendar.tsx`
- [x] Nettoyer `public/robots.txt` en retirant la ligne `Disallow: /calendar`