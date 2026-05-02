---
title: Configuration authentification et rôles
status: todo
priority: urgent
type: feature
---

## Notes
Mise en place du socle de sécurité pour protéger les données personnelles d'entraînement et de santé. Séparation stricte entre l'espace public (vitrine) et l'espace privé.

## Checklist
- [ ] Page de connexion sécurisée demandant email et mot de passe
- [ ] Verrouillage complet des pages d'entraînement, redirigeant vers la connexion si l'utilisateur n'est pas identifié
- [ ] Mise en place d'un système de rôles basique dans la base de données : distinction entre "Super Admin" (Thomas) et "Entraîneur" (Viewer)
- [ ] Menu de navigation mis à jour conditionnellement (apparition du bouton "Mon Dashboard" uniquement si connecté)
---TASK:task-53.md
