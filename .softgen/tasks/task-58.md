---
title: Affichage des statistiques réelles dans le Dashboard
status: done
priority: high
type: feature
created_by: agent
created_at: 2026-05-02T15:37:21Z
position: 58
---

## Notes
Le dashboard affiche actuellement des valeurs statiques. Il faut interroger la base de données pour afficher les vraies statistiques basées sur les données importées via CSV.

## Checklist
- [x] Créer dashboardService.ts pour récupérer les statistiques
- [x] Récupérer le nombre de sessions du mois en cours
- [x] Calculer le score moyen des sessions
- [x] Récupérer la dernière métrique de récupération WHOOP
- [x] Calculer la tendance sur 30 jours
- [x] Mettre à jour dashboard.tsx pour utiliser les vraies données
- [x] Gérer les états de chargement et les erreurs

## Acceptance
- Le dashboard affiche le nombre réel de sessions du mois
- Le score moyen est calculé à partir des sessions de tir
- La récupération WHOOP affiche la dernière valeur disponible
- La tendance montre l'évolution sur 30 jours