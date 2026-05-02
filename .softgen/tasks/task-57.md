---
title: Interface d'import CSV (Tir et Santé)
status: done
priority: high
type: feature
created_by: agent
created_at: 2026-05-02T13:43:16Z
position: 57
---

## Notes
Interface permettant d'importer les fichiers CSV des sessions de tir à l'arc et des données WHOOP dans la base de données. L'interface doit parser les CSV, valider les données et afficher un résumé des imports.

## Checklist
- [x] Page d'import dans le dashboard avec upload de fichiers
- [x] Service de parsing CSV pour les sessions de tir (archery_sessions, matches, arrows)
- [x] Service de parsing CSV pour les données WHOOP (health_metrics)
- [x] Validation des données avant insertion
- [x] Affichage des résultats d'import (succès/erreurs)
- [x] Gestion des erreurs et messages utilisateur
- [x] Support de 4 formats différents de fichiers de tir à l'arc
- [x] Ajustement du schéma pour supporter tous les champs des CSV réels

## Acceptance
- Les fichiers CSV peuvent être uploadés via l'interface
- Les données sont parsées et insérées dans les bonnes tables
- Un résumé détaillé de l'import est affiché (nombre de lignes, erreurs)