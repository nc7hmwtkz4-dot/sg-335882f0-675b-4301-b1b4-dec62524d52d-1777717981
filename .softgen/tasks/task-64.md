---
title: Data structure for articles
status: in_progress
priority: high
type: feature
tags: [blog, data]
created_by: agent
created_at: 2026-06-09T17:40:00Z
position: 64
---

## Notes
Mise en place de la structure de données locale pour la section "Articles". L'utilisateur ne souhaite pas d'interface d'administration ; les articles seront codés "en dur" dans un fichier de données local via l'assistant IA. Cette tâche consiste à créer le squelette qui accueillera ces contenus.

## Checklist
- [x] Créer un fichier de données centralisé pour stocker la liste des articles (avec des champs pour : identifiant, url/slug, titre, date, résumé, image de couverture, contenu détaillé, et données SEO spécifiques).
- [x] Ajouter un article d'exemple ou un brouillon vide pour valider la structure.
- [x] Créer une fonction utilitaire pour récupérer la liste complète des articles triée par date (du plus récent au plus ancien).
- [x] Créer une fonction utilitaire pour récupérer un article spécifique via son URL (slug).