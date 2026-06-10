---
title: Intégration Google Analytics
status: done
priority: high
type: feature
tags: [analytics, seo]
---

## Notes
L'utilisateur a créé un profil Google Analytics et fourni le tag de suivi avec l'identifiant `G-7K99Z9WZ70`. Le but est de suivre le trafic sur l'ensemble du site. Grâce au framework utilisé, l'intégration doit se faire au niveau global afin de s'appliquer automatiquement à toutes les pages (publiées ou non).

## Checklist
- [x] Intégrer le script de suivi Google Analytics au niveau global du site pour qu'il s'injecte directement dans le `<head>` de chaque page.
- [x] Configurer le chargement du script source (`G-7K99Z9WZ70`) de manière asynchrone pour préserver les performances et la rapidité du site.
- [x] Ajouter le script d'initialisation inline qui configure le `dataLayer` et lance la commande de tracking (`gtag config`).
- [x] Vérifier que la compilation de l'application prend bien en compte ces ajouts sans erreur.