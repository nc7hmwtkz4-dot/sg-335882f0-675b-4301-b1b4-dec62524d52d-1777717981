---
title: "Configuration Base de données et Accès Admin"
status: done
priority: urgent
type: feature
---

## Notes
Mise en place de l'accès sécurisé (login) et de la table pour stocker les compétitions. Supabase est déjà connecté, il faut recréer un accès minimal.

## Checklist
- [x] Création d'une page de connexion simple pour l'administrateur
- [x] Création de la table `competitions` avec les champs : titre, date de début, date de fin, lieu, et programme détaillé
- [x] Sécurisation des données via RLS (accès limité à l'utilisateur connecté)

## Acceptance
- Accès impossible au calendrier sans être connecté
- La table de base de données est prête à recevoir les événements