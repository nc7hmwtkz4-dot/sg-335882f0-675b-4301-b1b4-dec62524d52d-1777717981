---
title: "Modèle de données relationnel (Tir et Santé)"
status: todo
priority: urgent
type: feature
---

## Notes
Création de l'architecture de la base de données pour accueillir les données massives des fichiers d'export. La sécurité RLS (Row Level Security) doit être intégrée dès la conception.

## Checklist
- [ ] Table principale "Sessions" incluant la date, météo, sensations et type d'arc
- [ ] Tables enfants connectées aux sessions : "Matchs", "Situations" et "Flèches comptées"
- [ ] Table "Santé" dédiée à l'import des données WHOOP (sommeil, fréquence cardiaque, récupération)
- [ ] Règles de sécurité interdisant toute modification des données à un utilisateur ayant le rôle "Entraîneur"