/*import React, { useState, useEffect } from 'react';
import Grille from './Grille';
import Minuteur from './Minuteur';
import CompteurDrapeaux from './CompteurDrapeaux';
import ChoixNomUtilisateur from './ChoixNomUtilisateur';

// App est le composant principal du jeu Démineur
export function Demineur() {
  // Définir les niveaux de difficulté du jeu
  const niveauxDeDifficulte = {
    facile: { taille: 8, mines: 10 },    // Facile : 8x8, 10 mines
    intermédiaire: { taille: 16, mines: 40 }, // Intermédiaire : 16x16, 40 mines
    expert: { taille: 24, mines: 99 },   // Expert : 24x24, 99 mines
  };

  // États pour stocker les différentes valeurs du jeu
  const [grille, setGrille] = useState([]);         // Grille du jeu (où les cellules du démineur sont stockées)
  const [estPartieTerminee, setEstPartieTerminee] = useState(false); // État pour vérifier si le jeu est terminé
  const [minesRestantes, setMinesRestantes] = useState(10); // Mines restantes sur la grille
  const [minuteur, setMinuteur] = useState(0);        // Compteur pour le temps de jeu
  const [minuteurEnCours, setMinuteurEnCours] = useState(false); // État pour vérifier si le timer est en cours
  const [premierClic, setPremierClic] = useState(true);  // Pour gérer le premier clic (lancer le timer)
  const [nomUtilisateur, setNomUtilisateur] = useState(null);  // Nom du joueur choisi
  const [utilisateurs, setUtilisateurs] = useState([]);  // Liste des utilisateurs récupérée depuis l'API
  const [niveauActuel, setNiveauActuel] = useState(niveauxDeDifficulte.facile); // Niveau de difficulté par défaut

  // Utilisation de useEffect pour fetcher les utilisateurs de l'API
  useEffect(() => {
    // Fonction asynchrone pour récupérer les utilisateurs via l'API
    const recupererUtilisateurs = async () => {
      try {
        // Appel à l'API JSONPlaceholder pour récupérer la liste des utilisateurs
        const reponse = await fetch('https://jsonplaceholder.typicode.com/users');
        // Convertir la réponse en format JSON
        const donnees = await reponse.json();
        // Stocker les données des utilisateurs dans l'état 'utilisateurs'
        setUtilisateurs(donnees);
      } catch (erreur) {
        // Si une erreur survient, afficher un message d'erreur
        console.error('Erreur lors de la récupération des utilisateurs:', erreur);
      }
    };
    recupererUtilisateurs();
  });

  const initialiserGrille = () => {
    const taille = niveauActuel.taille;  // Taille de la grille selon le niveau
    const nouvelleGrille = Array(taille).fill(null).map(() => Array(taille).fill({
      aMine: false,
      estOuverte: false,
      estDrapeau: false,
      minesAdjacentes: 0
    }));

    // Placer les mines de manière aléatoire sur la grille
    let minesPlacees = 0;
    while (minesPlacees < niveauActuel.mines) {
      const ligne = Math.floor(Math.random() * taille);
      const colonne = Math.floor(Math.random() * taille);

      if (!nouvelleGrille[ligne][colonne].aMine) {
        nouvelleGrille[ligne][colonne].aMine = true;
        minesPlacees++;
      }
    }
    // Calculer le nombre de mines adjacentes pour chaque cellule
    for (let ligne = 0; ligne < taille; ligne++) {
      for (let colonne = 0; colonne < taille; colonne++) {
        if (!nouvelleGrille[ligne][colonne].aMine) {
          let minesAdjacentes = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const l = ligne + i;
              const c = colonne + j;
              if (l >= 0 && l < taille && c >= 0 && c < taille && nouvelleGrille[l][c].aMine) {
                minesAdjacentes++;
              }
            }
          }
          nouvelleGrille[ligne][colonne].minesAdjacentes = minesAdjacentes;
        }
      }
    }

    // Mettre à jour l'état de la grille
    setGrille(nouvelleGrille);
    setMinesRestantes(niveauActuel.mines);  // Réinitialiser le nombre de mines restantes
  };

  // Fonction pour démarrer le timer
  const demarrerMinuteur = () => {
    let compte = 0;
    const intervalle = setInterval(() => {
      if (!minuteurEnCours) clearInterval(intervalle);  // Si le timer ne doit plus tourner, on arrête l'intervalle
      else setMinuteur(compte++);  // Incrémenter le timer chaque seconde
    }, 1000);
  };

  // Fonction qui gère le clic sur une cellule de la grille
  const gererClicCellule = (ligne, colonne) => {
    // Si la partie est terminée ou si la cellule est marquée avec un drapeau, ne rien faire
    if (estPartieTerminee || grille[ligne][colonne].estDrapeau) return;

    // Si c'est le premier clic, démarrer le timer
    if (premierClic) {
      setMinuteurEnCours(true);
      demarrerMinuteur();
      setPremierClic(false);  // Désactiver le premier clic
    }

    const nouvelleGrille = [...grille]; // Créer une copie de la grille
    if (nouvelleGrille[ligne][colonne].aMine) {  // Si la cellule contient une mine
      setEstPartieTerminee(true);  // La partie est terminée
      setMinuteurEnCours(false);  // Arrêter le timer
    } else {
      ouvrirCellule(nouvelleGrille, ligne, colonne);  // Ouvrir la cellule
    }

    // Mettre à jour la grille
    setGrille(nouvelleGrille);
  };

  // Fonction pour ouvrir une cellule et ses voisines si elle n'a pas de mines adjacentes
  const ouvrirCellule = (nouvelleGrille, ligne, colonne) => {
    if (ligne < 0 || ligne >= niveauActuel.taille || colonne < 0 || colonne >= niveauActuel.taille) return;
    if (nouvelleGrille[ligne][colonne].estOuverte || nouvelleGrille[ligne][colonne].estDrapeau) return;

    nouvelleGrille[ligne][colonne].estOuverte = true;
    if (nouvelleGrille[ligne][colonne].minesAdjacentes === 0) {
      // Ouvrir les cellules adjacentes si la cellule courante n'a pas de mines adjacentes
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          ouvrirCellule(nouvelleGrille, ligne + i, colonne + j);
        }
      }
    }
  };

  // Fonction pour gérer le placement des drapeaux
  const gererDrapeau = (ligne, colonne) => {
    if (grille[ligne][colonne].estOuverte) return; // Si la cellule est déjà ouverte, ne pas permettre de poser un drapeau
    const nouvelleGrille = [...grille];
    nouvelleGrille[ligne][colonne].estDrapeau = !nouvelleGrille[ligne][colonne].estDrapeau;  // Alterner l'état du drapeau
    setGrille(nouvelleGrille);
    setMinesRestantes(prev => prev + (nouvelleGrille[ligne][colonne].estDrapeau ? -1 : 1));  // Réajuster le nombre de mines restantes
  };

  // Fonction pour changer de niveau
  const gererChangementNiveau = (niveau) => {
    setNiveauActuel(niveauxDeDifficulte[niveau]);  // Mettre à jour le niveau de difficulté
    setEstPartieTerminee(false);  // Réinitialiser l'état du jeu
    setMinuteurEnCours(false);  // Arrêter le timer
    setMinuteur(0);  // Réinitialiser le timer
    setPremierClic(true);  // Réactiver le premier clic
  };

  // Fonction pour vérifier si le joueur a gagné
  const gererVictoire = () => {
    if (!estPartieTerminee) {
      alert('Bravo, vous avez gagné en ' + minuteur + ' secondes!');  // Afficher un message de victoire
      const utilisateurChoisi = prompt('Entrez votre nom parmi les utilisateurs: ' + utilisateurs.map(user => user.name).join(', '));
      setNomUtilisateur(utilisateurChoisi);  // Enregistrer le nom du joueur
    }
  };

  // Initialiser la grille lorsque le niveau change
  useEffect(() => {
    initialiserGrille();  // Appeler la fonction pour initialiser la grille
  }, [niveauActuel]);  // Ce useEffect dépend de 'niveauActuel' et sera exécuté chaque fois que le niveau change

  return (
    <div>
      <h1>Démineur</h1>
      <div>
        Niveau :
        <button onClick={() => gererChangementNiveau('facile')}>Facile</button>
        <button onClick={() => gererChangementNiveau('intermédiaire')}>Intermédiaire</button>
        <button onClick={() => gererChangementNiveau('expert')}>Expert</button>
      </div>
      <Minuteur minuteur={minuteur} />  {/* Afficher le timer }
      <Grille grille={grille} gererClicCellule={gererClicCellule} gererDrapeau={gererDrapeau} /> {/* Afficher la grille }
      <CompteurDrapeaux minesRestantes={minesRestantes} /> {/* Afficher le compteur de mines restantes }
      <div>{estPartieTerminee && <div>Partie terminée. Vous avez perdu.</div>}</div>
      {nomUtilisateur && <ChoixNomUtilisateur nomUtilisateur={nomUtilisateur} />} {/* Afficher le nom du joueur }
      {!estPartieTerminee && grille.flat().every(cell => cell.estOuverte || cell.aMine) && gererVictoire()} {/* Vérifier si toutes les cellules sans mine sont ouvertes }
    </div>
  );
}

export default App;
 */

// Demineur.tsx
/*  import React, { useState } from 'react';
import { Minuteur } from './Minuteur';
import { Grille, Cellule } from './Grille';
import { CompteurDrapeaux } from './CompteurDrapeaux';
import { ChoixNomUtilisateur } from './ChoixNomUtilisateur';

export function Demineur() {
  const niveauxDeDifficulte = {
    facile: { taille: 8, mines: 10 },
    intermediaire: { taille: 16, mines: 40 },
    expert: { taille: 24, mines: 99 },
  };

  const [grille, setGrille] = useState<Cellule[][]>([]); // Correction ici
  const [estPartieTerminee, setEstPartieTerminee] = useState(false);
  const [minesRestantes, setMinesRestantes] = useState<number>(10);
  const [minuteur, setMinuteur] = useState<number>(0);
  const [minuteurEnCours, setMinuteurEnCours] = useState(false);
  const [premierClic, setPremierClic] = useState(true);
  const [nomUtilisateur, setNomUtilisateur] = useState<string | null>(null);
  const [niveauActuel, setNiveauActuel] = useState(niveauxDeDifficulte.facile);
  const [message, setMessage] = useState<string | null>(null);

  // Initialiser la grille
  const initialiserGrille = () => {
    const taille = niveauActuel.taille;
    const nouvelleGrille: Cellule[][] = Array(taille)
      .fill(null)
      .map(() =>
        Array(taille).fill({
          aMine: false,
          estOuverte: false,
          estDrapeau: false,
          minesAdjacentes: 0,
        })
      );

    let minesPlacees = 0;
    while (minesPlacees < niveauActuel.mines) {
      const ligne = Math.floor(Math.random() * taille);
      const colonne = Math.floor(Math.random() * taille);

      if (!nouvelleGrille[ligne][colonne].aMine) {
        nouvelleGrille[ligne][colonne] = { ...nouvelleGrille[ligne][colonne], aMine: true };
        minesPlacees++;
      }
    }

    for (let ligne = 0; ligne < taille; ligne++) {
      for (let colonne = 0; colonne < taille; colonne++) {
        if (!nouvelleGrille[ligne][colonne].aMine) {
          let minesAdjacentes = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const l = ligne + i;
              const c = colonne + j;
              if (
                l >= 0 &&
                l < taille &&
                c >= 0 &&
                c < taille &&
                nouvelleGrille[l][c].aMine
              ) {
                minesAdjacentes++;
              }
            }
          }
          nouvelleGrille[ligne][colonne] = { ...nouvelleGrille[ligne][colonne], minesAdjacentes };
        }
      }
    }

    setGrille(nouvelleGrille);
    setMinesRestantes(niveauActuel.mines);
  };

  // Gérer le clic sur une cellule
  const gererClicCellule = (ligne: number, colonne: number) => {
    if (estPartieTerminee || grille[ligne][colonne].estDrapeau) return;

    if (premierClic) {
      setMinuteurEnCours(true);
      setPremierClic(false);
    }

    const nouvelleGrille = [...grille];
    if (nouvelleGrille[ligne][colonne].aMine) {
      setEstPartieTerminee(true);
      setMinuteurEnCours(false);
      setMessage('Partie terminée. Vous avez perdu.');
    } else {
      ouvrirCellule(nouvelleGrille, ligne, colonne);
    }

    setGrille(nouvelleGrille);
  };

  const ouvrirCellule = (nouvelleGrille: Cellule[][], ligne: number, colonne: number) => {
    if (
      ligne < 0 ||
      ligne >= niveauActuel.taille ||
      colonne < 0 ||
      colonne >= niveauActuel.taille
    )
      return;
    if (nouvelleGrille[ligne][colonne].estOuverte || nouvelleGrille[ligne][colonne].estDrapeau)
      return;

    nouvelleGrille[ligne][colonne].estOuverte = true;
    if (nouvelleGrille[ligne][colonne].minesAdjacentes === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          ouvrirCellule(nouvelleGrille, ligne + i, colonne + j);
        }
      }
    }
  };

  // Gérer le placement des drapeaux
  const gererDrapeau = (ligne: number, colonne: number) => {
    if (grille[ligne][colonne].estOuverte) return;
    const nouvelleGrille = [...grille];
    nouvelleGrille[ligne][colonne] = {
      ...nouvelleGrille[ligne][colonne],
      estDrapeau: !nouvelleGrille[ligne][colonne].estDrapeau,
    };
    setGrille(nouvelleGrille);
    setMinesRestantes((prev) => prev + (nouvelleGrille[ligne][colonne].estDrapeau ? -1 : 1));
  };

  // Gérer le changement de niveau
  const gererChangementNiveau = (niveau: keyof typeof niveauxDeDifficulte) => {
    setNiveauActuel(niveauxDeDifficulte[niveau]);
    setEstPartieTerminee(false);
    setMinuteurEnCours(false);
    setMinuteur(0);
    setPremierClic(true);
    setMessage(null);
    initialiserGrille();
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Démineur</h1>
      <div className="mb-3">
        Niveau :
        <button className="btn btn-primary mx-2" onClick={() => gererChangementNiveau('facile')}>
          Facile
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => gererChangementNiveau('intermediaire')}>
          Intermédiaire
        </button>
        <button className="btn btn-danger mx-2" onClick={() => gererChangementNiveau('expert')}>
          Expert
        </button>
      </div>
      <Minuteur minuteur={minuteur} />
      <Grille grille={grille} gererClicCellule={gererClicCellule} gererDrapeau={gererDrapeau} />
      <CompteurDrapeaux minesRestantes={minesRestantes} />
      {message && <div className="alert alert-warning mt-3">{message}</div>}
      {nomUtilisateur && <ChoixNomUtilisateur nomUtilisateur={nomUtilisateur} />}
    </div>
  );
}
  */
import React, { useState, useEffect } from 'react';

import { Grille, Cellule } from './Grille';
import { CompteurDrapeaux } from './CompteurDrapeaux';
import { ChoixNomUtilisateur } from './ChoixNomUtilisateur';
import { HorlogeNumerique } from './HorlogeNumerique';

export function Demineur() {
  const niveauxDeDifficulte = {
    facile: { taille: 8, mines: 10 },
    intermediaire: { taille: 16, mines: 40 },
    expert: { taille: 24, mines: 99 },
  };

  const [grille, setGrille] = useState<Cellule[][]>([]);
  const [estPartieTerminee, setEstPartieTerminee] = useState(false);
  const [minesRestantes, setMinesRestantes] = useState<number>(10);
  const [premierClic, setPremierClic] = useState(true);
  //const [nomUtilisateur, setNomUtilisateur] = useState<string | null>(null);
  const [niveauActuel, setNiveauActuel] = useState(niveauxDeDifficulte.facile);
  const [message, setMessage] = useState<string | null>(null);
  const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
  const [temps, setTemps] = useState<number>(0); // Temps écoulé en secondes
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const demarrerHorloge = () => {
    if (intervalId) return;

    const id = setInterval(() => {
      setTemps((prevTemps) => prevTemps + 1);
    }, 1000);

    setIntervalId(id);
  };
  const arreterHorloge = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };
  const initialiserGrille = () => {
    const taille = niveauActuel.taille;
    const nouvelleGrille: Cellule[][] = Array(taille)
      .fill(null)
      .map(() =>
        Array(taille).fill({
          aMine: false,
          estOuverte: false,
          estDrapeau: false,
          minesAdjacentes: 0,
        })
      );

    let minesPlacees = 0;
    while (minesPlacees < niveauActuel.mines) {
      const ligne = Math.floor(Math.random() * taille);
      const colonne = Math.floor(Math.random() * taille);

      if (!nouvelleGrille[ligne][colonne].aMine) {
        nouvelleGrille[ligne][colonne] = { ...nouvelleGrille[ligne][colonne], aMine: true };
        minesPlacees++;
      }
    }

    for (let ligne = 0; ligne < taille; ligne++) {
      for (let colonne = 0; colonne < taille; colonne++) {
        if (!nouvelleGrille[ligne][colonne].aMine) {
          let minesAdjacentes = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const l = ligne + i;
              const c = colonne + j;
              if (
                l >= 0 &&
                l < taille &&
                c >= 0 &&
                c < taille &&
                nouvelleGrille[l][c].aMine
              ) {
                minesAdjacentes++;
              }
            }
          }
          nouvelleGrille[ligne][colonne] = { ...nouvelleGrille[ligne][colonne], minesAdjacentes };
        }
      }
    }

    setGrille(nouvelleGrille);
    setMinesRestantes(niveauActuel.mines);
    setTemps(0); // Réinitialiser le temps
    arreterHorloge();
  };

  const gererClicCellule = (ligne: number, colonne: number) => {
    if (estPartieTerminee || grille[ligne][colonne].estDrapeau) return;

    if (premierClic) {
      if (grille[ligne][colonne].aMine) {
        initialiserGrille();
        return; // On ne fait rien d'autre, car la grille est réinitialisée
      }
      setPremierClic(false);
      demarrerHorloge();
    }

    const nouvelleGrille = [...grille];
    const cellule =nouvelleGrille[ligne][colonne];

    if (cellule.aMine) {
      setEstPartieTerminee(true);
  
      arreterHorloge();
 
      setMessage('Partie terminée. Vous avez perdu.');
      
    } else {
      ouvrirCellule(nouvelleGrille, ligne, colonne);
    }
    cellule.estOuverte  = true;
    setGrille(nouvelleGrille);
    if (aGagne()) {
      setEstPartieTerminee(true);
      arreterHorloge();
    }
  };


  const ouvrirCellule = (nouvelleGrille: Cellule[][], ligne: number, colonne: number) => {
    if (
      ligne < 0 ||
      ligne >= niveauActuel.taille ||
      colonne < 0 ||
      colonne >= niveauActuel.taille
    )
      return;
    if (nouvelleGrille[ligne][colonne].estOuverte || nouvelleGrille[ligne][colonne].estDrapeau)
      return;

    nouvelleGrille[ligne][colonne].estOuverte = true;
    if (nouvelleGrille[ligne][colonne].minesAdjacentes === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          ouvrirCellule(nouvelleGrille, ligne + i, colonne + j);
        }
      }
    }
  };

  const gererDrapeau = (ligne: number, colonne: number) => {
    setGrille((prevGrille) => {
      const nouvelleGrille = [...prevGrille];
      const cellule = nouvelleGrille[ligne][colonne];

      if (cellule.estDrapeau) {
        // Si un drapeau est déjà placé, le retirer et ajouter une mine
        setMinesRestantes((prev) => prev + 1);
      } else {
        // Si aucun drapeau n'est placé, le mettre et soustraire une mine
        setMinesRestantes((prev) => prev - 1);
      }

      cellule.estDrapeau = !cellule.estDrapeau;
      return nouvelleGrille;
    });
  };
  const gererChangementNiveau = (niveau: keyof typeof niveauxDeDifficulte) => {
    setNiveauActuel(niveauxDeDifficulte[niveau]);
    setEstPartieTerminee(false);
    //setMinuteurEnCours(false);
   // setMinuteur(0);
    setPremierClic(true);
    setMessage(null);
    initialiserGrille();
  };
  const aGagne = () => {
    for (let i = 0; i < niveauActuel.taille; i++) {
      for (let j = 0; j < niveauActuel.taille; j++) {
        const cellule = grille[i][j];
  
        // Vérifie si une cellule non minée n'est pas ouverte
        if (!cellule.aMine && !cellule.estOuverte) {
          return false;
        }
  
        // Vérifie si une mine n'a pas de drapeau
        if (cellule.aMine && !cellule.estDrapeau) {
          return false;
        }
      }
    }
  
    return true; // Toutes les cases respectent les conditions de victoire
  };
  

  // Utiliser useEffect pour fetcher les utilisateurs lorsque la partie est terminée
  useEffect(() => {
    if (estPartieTerminee) {
      if (aGagne()) {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((data) => {
            setUtilisateurs(data);
          });
        setMessage('Vous avez gagné !');
      }
    }
  }, [estPartieTerminee]);

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Démineur</h1>
      <div className="mb-3">
        Niveau :
        <button className="btn btn-primary mx-2" onClick={() => gererChangementNiveau('facile')}>
          Facile
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => gererChangementNiveau('intermediaire')}>
          Intermédiaire
        </button>
        <button className="btn btn-danger mx-2" onClick={() => gererChangementNiveau('expert')}>
          Expert
        </button>
      </div>

   <HorlogeNumerique temps={temps} />

      <div className="d-flex justify-content-between mt-4">
        <div className="game-board">
          <Grille grille={grille} gererClicCellule={gererClicCellule} gererDrapeau={gererDrapeau} />
        </div>

        <div className="user-list">
          {estPartieTerminee && aGagne() && utilisateurs.length > 0 && (
            <div className="mt-4">
              <h3>Choisissez votre nom d'utilisateur :</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nom d'utilisateur</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {utilisateurs.map((utilisateur) => (
                    <tr key={utilisateur.id}>
                      <td>
                          {utilisateur.name}
                      </td>
                      <td>
                        <input type='radio' value={utilisateur.name} name='nomUtilisateur'/>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <button>Choisir</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>

      <CompteurDrapeaux minesRestantes={minesRestantes} />

      {message && <div className="alert alert-warning mt-3">{message}</div>}

    </div>
  );
}
