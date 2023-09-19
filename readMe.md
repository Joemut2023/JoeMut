```
# African's art (API)

* créer un fichier .env en se basant sur le fichier .env.example(renseigner les information de votre base donnés)
* créer un fichier config/config.json  se basant sur le fichier sur config/config.example.json (renseigner les information de votre base donnés)
* créer un fichier `/assets/js/url.js` et renseigner l'url de l'appli `const SITE_URL = 'http://localhost:3000'`
* `npm install`
* `npx sequelize-cli init`
* `npx sequelize-cli db:migrate`
* `npx sequelize-cli db:seed:all`
* `npm run dev`
* `npm run css`
* `npm run js`
* `node helpers/generate_tailles_data.js`
* `node helpers/generate_frais_port_data.js`
* `node helpers/generate_statut_expedition_data.js`
* `node helpers/generate_statut_commande_data.js`
```
