# Portfolio Webdesign — V10

## Corrections apportées

1. **Images `-full` corrigées** : `le-dragon-full.webp`, `nova-studio-full.webp` et `forma-studio-full.webp` sont maintenant de vraies images haute résolution (1880×960), et non plus des copies des miniatures `-card` (469×297) agrandies. Les pages `projets/*.html` affichent désormais les visuels dans leur vraie qualité.

2. **Nettoyage** :
   - Suppression d'une règle CSS morte (ancienne version mobile du hero, référençant une image supprimée).
   - Suppression de 6 images orphelines jamais utilisées dans le site (`automobile.webp`, `hero-large.webp`, `hero-small.webp`, `hero-integrated.webp`, `hero-integrated-mobile.webp`, `hero-approved.webp`).

3. **Pages projet enrichies** : chaque page "Voir le projet" (`restaurant.html`, `studio-digital.html`, `architecture.html`) contient désormais une fiche technique structurée : Secteur, Objectif, Design, Fonctionnalités, Responsive, Performances, Technologies — en plus du texte de direction déjà présent.

## Notes

- Les projets gardent deux usages distincts : `*-card.webp` pour les cartes (index/projets), `*-full.webp` pour les pages projet.
- Les mentions de performance (Lighthouse, etc.) restent formulées comme des objectifs à mesurer après déploiement réel — aucun score n'est inventé.
