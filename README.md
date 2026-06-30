# Dietz.dev — Thème Jekyll

Site statique Jekyll, hébergeable sur GitHub Pages. Rendu identique au projet Vite d'origine.

## Structure

```
├── _config.yml          ← Config du site (url, titre, description)
├── _data/
│   ├── nav.yml          ← Liens de navigation + CTA
│   ├── footer.yml       ← Liens du footer
│   ├── services.yml     ← Les 3 cartes de services
│   ├── metrics.yml      ← Les 4 chiffres d'impact
│   ├── timeline.yml     ← Les événements de la timeline
│   └── about.yml        ← Texte de la section À propos
├── _includes/           ← Composants HTML réutilisables
├── _layouts/
│   └── default.html     ← Layout principal (head, nav, footer)
├── assets/
│   ├── css/main.css     ← CSS compilé (ne pas modifier)
│   └── js/main.js       ← JS compilé (ne pas modifier)
├── index.md             ← Page d'accueil (front matter éditable)
└── favicon.svg
```

## Modifier le contenu

**Tout le contenu est dans `_data/` — modifie uniquement ces fichiers YAML.**

- Changer les services → `_data/services.yml`
- Changer les chiffres d'impact → `_data/metrics.yml`
- Ajouter un événement à la timeline → `_data/timeline.yml`
- Changer le texte À propos → `_data/about.yml`
- Changer le lien de réservation → `_data/nav.yml` (champ `cta.url`)

**Pour les textes du hero et contact**, modifie le front matter de `index.md`.

## Ajouter une nouvelle page

Crée un fichier `.md` à la racine :

```md
---
layout: default
title: "Ma nouvelle page"
description: "Description SEO"
---

# Contenu en Markdown

Mon texte ici...
```

## Déploiement sur GitHub Pages

1. Push le projet sur un repo GitHub
2. Dans Settings → Pages → Source : sélectionne `main` branch / `/ (root)`
3. GitHub Pages build automatiquement avec Jekyll

### Avec un domaine custom

Dans `_config.yml`, mets à jour :
```yaml
url: "https://ton-domaine.com"
baseurl: ""
```

## Développement local

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

Ouvre http://localhost:4000
