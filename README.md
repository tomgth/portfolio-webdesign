# Portfolio Webdesign — V11

## Nouveau dans cette version

1. **Nouveau visuel hero** (`hero-v10.webp`) : ta nouvelle image PC + smartphone, avec fond réellement transparent (aucune bande blanche/rectangle — vérifié techniquement, le fichier a un canal alpha propre autour des appareils).
   - Le texte d'interface généré par l'IA était illisible/déformé par endroits ("We'ugrsceed...", "Webuld diard rapmentss..."). J'ai gardé net uniquement le titre principal lisible ("We build / digital experiences / that stand out.") et j'ai adouci (flou léger) les zones de sous-texte, bouton et libellés d'icônes pour que ça se lise comme une interface en arrière-plan plutôt que comme du texte cassé.
   - Une seule image sert maintenant au desktop et au mobile (le fond transparent + `object-fit: contain` s'adaptent naturellement à toutes les tailles d'écran) → suppression de la logique de double fichier desktop/mobile devenue inutile.

2. **Qualité des pages projet (rappel V10)** : `le-dragon-full.webp`, `nova-studio-full.webp`, `forma-studio-full.webp` sont en 1880×960 (vraie haute résolution, plus des miniatures agrandies). Si tu vois encore une qualité médiocre sur ton site en ligne, c'est très probablement parce que ton dépôt GitHub Pages n'a pas encore été mis à jour avec ce ZIP — remplace bien tous les fichiers de `images/` par ceux-ci.

## Notes générales

- Les projets gardent deux usages distincts : `*-card.webp` pour les cartes (index/projets), `*-full.webp` pour les pages projet.
- Les mentions de performance (Lighthouse, etc.) restent formulées comme des objectifs à mesurer après déploiement réel — aucun score n'est inventé.
