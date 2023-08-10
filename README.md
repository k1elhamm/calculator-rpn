# Projet Angular - Calculatrice RPN

Ce projet est une calculatrice en notation polonaise inversée (RPN) développée en utilisant le framework Angular 16. Il vous permet d'effectuer des opérations arithmétiques simples en plaçant les opérandes dans une pile et en appliquant les opérations sur ceux-ci ( tous les calculs sont fait coté serveur ).

## Prérequis

Avant de pouvoir exécuter ce projet, assurez-vous d'avoir Node.js et Angular CLI installés sur votre machine. Vous aurez également besoin de `json-server` pour exécuter le serveur mock.

## Installation

1. Clonez ce référentiel sur votre machine locale en utilisant la commande suivante :
   
   ```
   git clone https://github.com/k1elhamm/calculator-rpn.git
   ```

2. Accédez au répertoire du projet :
   
   ```
   cd calculator
   ```

3. Installez les dépendances du projet en exécutant la commande :
   
   ```
   npm install
   ```

4. Installez le serveur mock `json-server` :
   
   ```
   npm install -g json-server
   ```

## Lancer le Serveur Mock

Pour exécuter le serveur mock, assurez-vous d'être dans le répertoire du projet, puis exécutez la commande suivante :
   
   ```
   json-server --watch db.json
   ```

Le serveur mock sera lancé et écoutera les appels API simulés à partir du fichier `db.json`.

## Lancer le Projet Front

Pour lancer l'application Angular, assurez-vous d'être dans le répertoire du projet, puis exécutez la commande suivante :
   
   ```
   ng serve
   ```

Ouvrez votre navigateur et accédez à `http://localhost:4200/` pour voir et interagir avec la calculatrice RPN.

## Conclusion

Félicitations ! Vous avez réussi à installer et exécuter le projet Angular de la calculatrice RPN.
