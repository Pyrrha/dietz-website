# Dietz.dev

Site statique Jekyll, hébergé sur GitHub Pages (domaine `dietz.dev`).

## Où modifier quoi

| Contenu | Fichier |
|---|---|
| Accueil (titre, sous-titre) | `index.html` (front matter) |
| Pages « Pour qui » | `_solutions/*.md` (un fichier = une page `/pour-qui/<nom>/`) |
| Pages « Expertises » | `_expertises/*.md` (un fichier = une page `/expertises/<nom>/`) |
| Cas clients (anonymisés) | `_data/cases.yml` |
| Formats d'engagement | `_data/formats.yml` |
| Profil, certifications, chiffres « En bref » | `_data/profile.yml` |
| Parcours (frise) | `_data/timeline.yml` |
| Navigation, lien de prise de rendez-vous | `_data/nav.yml` |
| Liens du pied de page et du contact | `_data/footer.yml` |
| Mentions légales (société, SIREN, adresse) | `_data/legal.yml` |
| Icônes | `_data/icons.yml` |

Tout le contenu des pages « Pour qui » et « Expertises » est dans le front matter
de leur fichier Markdown ; la mise en page est dans `_layouts/solution.html` et
`_layouts/expertise.html`.

### Chiffres des cas clients

Les chiffres précis (`figures` dans `_data/cases.yml`) ne s'affichent que si
`show_case_figures: true` dans `_config.yml`. Sinon, c'est le texte `outcome`
qui est affiché.

## Performances

- Aucune dépendance JavaScript : `assets/js/main.js` (~4 Ko) gère uniquement le
  menu mobile, la barre de progression et les apparitions au défilement.
- Animations en CSS, désactivées si l'utilisateur préfère réduire les animations.
- Polices auto-hébergées dans `assets/fonts/` (licence SIL OFL), aucun appel à Google.

## Développement local

```bash
docker compose up
```

Ouvre http://localhost:4000
