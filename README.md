# Pierre Moreau — Site CV / portfolio

Portfolio personnel de Pierre Moreau (Docteur en Machine Learning, Ingénieur IA Santé).
Design éditorial sombre, bilingue EN/FR, 100 % statique.

## 🌐 En ligne

**[pierremoreau.myddns.me](https://pierremoreau.myddns.me)** (GitHub Pages, domaine via `CNAME`)

## Architecture

Le site est généré à partir d'une **source unique** : `build.js`.
Tout le contenu (EN + FR) et les métadonnées SEO y sont centralisés ;
`node build.js` régénère les deux pages statiques.

```
build.js          # SOURCE UNIQUE : contenu bilingue (objet CONTENT) + SEO → génère les pages
index.html        # EN  (généré, ne pas éditer à la main)
index-fr.html     # FR  (généré, ne pas éditer à la main)
styles.css        # design (variables CSS + classes), thème sombre
script.js         # interactions vanilla : reveal au scroll, compteurs, scroll-spy
favicon.svg/.ico  # favicon (monogramme « P »)
apple-touch-icon.png  # icône iOS (180×180)
og-image.png      # image Open Graph / Twitter (source : og-image.svg)
CNAME             # domaine personnalisé
sitemap.xml / robots.txt
```

### Modifier le contenu

1. Éditer l'objet `CONTENT` (et si besoin `SEO`) dans **`build.js`**.
2. Lancer `node build.js` → régénère `index.html` et `index-fr.html`.
3. Committer les fichiers générés.

⚠️ Ne pas éditer `index.html` / `index-fr.html` directement : ils sont écrasés au prochain build.

### Thème

Couleurs, typographies et espacements sont des variables CSS en tête de `styles.css`
(`:root { --bg, --accent, --tx, --disp, --mono, ... }`).

## Fonctionnalités

- **Bilingue EN/FR** : deux pages statiques distinctes (bon SEO, `hreflang`, JSON-LD par langue),
  bascule EN/FR dans la barre de navigation.
- **SEO complet** : `canonical`, alternates `hreflang`, Schema.org `Person`, Open Graph, Twitter Cards.
- **Sans dépendance JS externe** : interactions en JavaScript vanilla (aucune librairie).
  Le site reste lisible sans JavaScript (contenu servi en HTML statique).
- **Responsive** et **accessible** (respect de `prefers-reduced-motion`, styles d'impression).
- **Polices** : Space Grotesk (titres), IBM Plex Sans (texte), IBM Plex Mono (labels) via Google Fonts.

## Développement local

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Déploiement

GitHub Pages sert directement les fichiers statiques du dépôt.
Après modification : `node build.js`, puis commit + push sur `main`.
