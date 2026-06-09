---
title: Articles feed page
status: todo
priority: high
type: feature
tags: [blog, ui]
created_by: agent
created_at: 2026-06-09T17:40:00Z
position: 65
---

## Notes
Création de la page principale répertoriant tous les articles. Cette page affiche un flux unique chronologique. 
Contrainte critique : la page ne doit pas s'afficher si la variable d'environnement d'activation n'est pas "true".

## Checklist
- [ ] Créer la page liste des articles accessible via une URL dédiée.
- [ ] Mettre en place un système de sécurité (feature flag) : si la fonctionnalité n'est pas activée via les variables d'environnement, afficher une erreur 404 (Page introuvable).
- [ ] Construire une mise en page sous forme de grille ou de liste, respectant l'esthétique épurée du site.
- [ ] Créer les cartes d'aperçu pour chaque article affichant : l'image de couverture, le titre, la date de publication et un court résumé.
- [ ] Assurer que l'ensemble s'adapte parfaitement sur mobile.

## Acceptance
- La page affiche les articles du plus récent au plus ancien.
- Si le "feature flag" est désactivé, la page n'est pas accessible et affiche une page 404.