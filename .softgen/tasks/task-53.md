---
title: Modèle de données relationnel (Tir et Santé)
status: done
priority: urgent
type: feature
---

## Notes
Création de l'architecture de la base de données pour accueillir les données massives des fichiers d'export. La sécurité RLS (Row Level Security) doit être intégrée dès la conception.

## Checklist
- [x] Table principale "Sessions" incluant la date, météo, sensations et type d'arc
- [x] Tables enfants connectées aux sessions : "Matchs", "Situations" et "Flèches comptées"
- [x] Table "Santé" dédiée à l'import des données WHOOP (sommeil, fréquence cardiaque, récupération)
- [x] Règles de sécurité interdisant toute modification des données à un utilisateur ayant le rôle "Entraîneur"

## Acceptance
- Les sessions de tir peuvent être créées avec tous les détails nécessaires (météo, arc, sensations)
- Les données sont structurées de manière relationnelle (sessions → matches/situations/arrows)
- Les entraîneurs peuvent consulter les données via accès partagé mais ne peuvent pas les modifier
---TASK:task-54.md:662---
---
t
