---
title: Articles navigation links
status: done
priority: medium
type: chore
tags: [navigation, ui]
created_by: agent
created_at: 2026-06-09T17:40:00Z
position: 67
---

## Notes
Intégration de la nouvelle section "Articles" dans la navigation du site (header et footer). Ces liens doivent obéir à la règle de visibilité.

## Checklist
- [x] Ajouter un lien vers la page "Articles" dans la barre de navigation principale.
- [x] Configurer ce lien pour qu'il n'apparaisse **que si** la variable d'environnement de la fonctionnalité est activée.
- [x] Ajouter le lien vers la page "Articles" dans le pied de page (Footer).
- [x] Masquer également le lien du pied de page si la fonctionnalité est désactivée.

## Acceptance
- Quand la fonctionnalité est désactivée en coulisses, aucun visiteur ne peut deviner l'existence de la section Articles via la navigation.