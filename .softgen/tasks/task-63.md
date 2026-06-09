---
title: Suppression de la page calendrier
status: done
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

## Acceptance
- La page `/calendar` n'existe plus dans le projet
- Le fichier `robots.txt` ne fait plus référence à `/calendar`
- Le build se déploie sans erreur liée à cette page