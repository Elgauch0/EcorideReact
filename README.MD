🎨 Frontend – EcoRide React
Interface utilisateur moderne, rapide et réactive développée avec React et Vite. Ce frontend consomme l'API REST Symfony pour afficher les données de manière dynamique.
⚙️ Prérequis

Node.js (Version LTS recommandée, ex: 18.x) : Télécharger Node.js
npm (Node Package Manager) ou yarn
Git

🚀 Installation & Lancement

1. Cloner le Dépôt
   bashgit clone https://github.com/Elgauch0/EcorideReact
   cd EcorideReact
2. Configuration des Variables d'Environnement
   Décommentez dans le fichier .env à la racine du projet les variables suivantes :
   envVITE_API_URL=http://localhost:8000/api
   VITE_API_Image=http://localhost:8000
3. Installation des Dépendances
   bashnpm install

OU

yarn install 4. Lancement de l'Application
bashnpm run dev

OU

yarn dev
L'application sera accessible dans votre navigateur à l'adresse http://localhost:5173 (ou un autre port indiqué dans votre terminal).

🚦 Démarrage de l'Application Complète

Pour utiliser EcoRide, vous devez **impérativement lancer les deux projets** :

1. **Démarrez d'abord le Backend (API Symfony)** sur http://localhost:8000  
   → [Dépôt Backend : EcorideSymfonyApi](https://github.com/Elgauch0/EcorideSymfonyApi)

2. **Puis démarrez le Frontend (React)** sur http://localhost:5173  
   → [Dépôt Frontend : EcorideReact](https://github.com/Elgauch0/EcorideReact)

Les deux services doivent être actifs simultanément pour permettre :

- La communication entre le frontend et l'API
- L'authentification des utilisateurs
- L'affichage et la gestion des trajets
- Toutes les fonctionnalités de l'application
  🎉 Félicitations !
  L'application EcoRide est maintenant opérationnelle et prête à être utilisée ! 🚗💚
