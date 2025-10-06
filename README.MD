Ecoride – Frontend (React + Vite)
Ce dépôt contient la partie frontend (interface utilisateur) de l'application Ecoride.

Développé avec React et Vite, il offre une interface moderne, rapide et réactive. Ce frontend est conçu pour consommer l'API REST Symfony (le backend du projet) et afficher les données de manière dynamique.

⚙️ Prérequis
Avant de procéder à l'installation, assurez-vous que les outils suivants sont installés sur votre système :

Node.js (Version LTS recommandée, ex: 18.x) : Télécharger Node.js

npm (Node Package Manager) ou yarn

Git

🚀 Installation & Lancement
Suivez ces étapes pour installer et démarrer le projet en local :

1. Cloner le dépôt
   Ouvrez votre terminal et clonez le dépôt Git, puis naviguez dans le répertoire du projet :

Bash

git clone https://github.com/Elgauch0/EcorideReact
cd EcorideReact 2. Configuration des variables d'environnement
Le frontend doit savoir où joindre le backend (API Symfony). décomentez dans .env à la racine du projet les variables suivantes :

VITE_API_URL=http://localhost:8000/api
VITE_API_Image=http://localhost:8000

3. Installation des dépendances
   Installez toutes les dépendances du projet avec votre gestionnaire de paquets préféré :

Bash

npm install

# OU

# yarn install

4. Lancement de l'application
   Démarrez le serveur de développement en utilisant la commande dev :

Bash
npm run dev

# OU

# yarn dev

L'application sera accessible dans votre navigateur, généralement à l'adresse http://localhost:5173 (ou un autre port libre, indiqué dans votre terminal).

🎉 Félicitations ! Le frontend d'Ecoride est maintenant en cours d'exécution.
