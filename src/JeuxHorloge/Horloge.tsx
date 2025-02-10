/*import React, { useState, useEffect } from "react";
import PileHorloge from "./PileHorloge";
import { Deck } from "./Deck";
import { EtatApp, CarteH, Pile } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

const Horloge: React.FC = () => {
  const [etat, setEtat] = useState<EtatApp>({
    piles: Array(12).fill(null).map(() => ({ cartes: [] as CarteH[] })), // 12 piles vides
    pileCentrale: { cartes: [] as CarteH[] }, // Pile centrale vide
    paquet: [], // Paquet vide
    cartesRevelees: [], // Aucune carte révélée au départ
    pileCibleIndex: -1
  });

  useEffect(() => {
    const initialiserJeu = async () => {
      const nouveauPaquet = await Deck.creerPaquet();
      setEtat((ancienEtat) => ({ ...ancienEtat, paquet: nouveauPaquet }));
      distribuerCartes(nouveauPaquet);
    };
    

    initialiserJeu();
  }, []);


  const distribuerCartes = (paquet: CarteH[]) => {
    const piles = Array(12).fill(null).map(() => ({ cartes: [] as CarteH[] }));

    
    const pileCentrale = { cartes: [] as CarteH[] };

    let indexCarte = 0;

    // Mélanger le paquet pour distribuer les cartes de manière aléatoire
    paquet.sort(() => Math.random() - 0.5);


    // Distribution des 12 piles en cercle (4 cartes par pile, face cachée)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 12; j++) {
        piles[j].cartes.push({
          code: paquet[indexCarte].code, // Correct ici
          image: paquet[indexCarte].image, // Utiliser directement l'image de l'objet
          faceVisible: false, // Toutes les cartes commencent face cachée
          value: paquet[indexCarte].value
        });
        indexCarte++;
        console.log(piles);
      }
    }

   

    // Distribution de la pile centrale (4 cartes, face cachée)
    for (let i = 0; i < 4; i++) {
      pileCentrale.cartes.push({
        code: paquet[indexCarte].code, // Correct ici
        image: paquet[indexCarte].image, // Utiliser l'image de l'objet
        faceVisible: false,
        value: paquet[indexCarte].value
      });
      indexCarte++;
      console.log(pileCentrale);
    }

    // Choisir une carte au hasard parmi les 4 premières cartes de la pile centrale pour la rendre visible
    const indexCarteVisible = 3;//Math.floor(Math.random() * 4);
    pileCentrale.cartes[indexCarteVisible].faceVisible = true;
    console.log('originalpilecentrale',pileCentrale.cartes);
    // Mettre à jour l'état avec les nouvelles piles, la pile centrale et la carte révélée
    setEtat((ancienEtat) => ({
      ...ancienEtat,
      piles,
      pileCentrale,
      cartesRevelees: [pileCentrale.cartes[indexCarteVisible]], // Ajouter la carte révélée
    }));
  };

  // Fonction pour déplacer une carte dans la pile correspondante
  /* const deplacerCarte = (carte: CarteH, indexPile: number) => {
    console.log("index de la pile est "+indexPile);
    const nouvellesPiles = [...etat.piles];
    const pileCentrale = [etat.pileCentrale];
    console.log('pileCentrale',pileCentrale);
    console.log('nouvellesPiles',nouvellesPiles);
    console.log(carte);
    // Vérifier si la carte peut être déplacée (par exemple, si elle est face visible)
 /*    if (!carte.faceVisible) {
      alert(`Vous ne pouvez pas déplacer une carte face cachée ! ${indexPile}`);
      return;
    } */

    // Ajouter la carte à la pile correspondante et la rendre face visible
   /* nouvellesPiles[indexPile].cartes.push({ ...carte, faceVisible: true });

    // Mettre à jour l'état avec les nouvelles piles et la carte révélée
    setEtat((ancienEtat) => ({
      ...ancienEtat,
      piles: nouvellesPiles,
      cartesRevelees: [...ancienEtat.cartesRevelees, carte], // Ajouter la carte aux cartes révélées
    }));
  }; */
 /* const deplacerCarte = () => {
    
    setEtat((ancienEtat) => {
      
      let nouvellesPiles = [...ancienEtat.piles];
      let nouvellePileCentrale = { ...ancienEtat.pileCentrale };
  
      let carteCouranteADeplacer = nouvellePileCentrale.cartes.find(c => c.faceVisible) || null;
  
      if (!carteCouranteADeplacer) {
        console.log("Aucune carte visible à déplacer !");
        return ancienEtat;
      }
  
      let indexPileDestination = obtenirPileCorrespondante(carteCouranteADeplacer);
  
      if (indexPileDestination === -1) {
        console.log("Erreur : Impossible de trouver la pile correspondante !");
        return ancienEtat;
      }
  
      nouvellesPiles[indexPileDestination].cartes.unshift({
        ...carteCouranteADeplacer,
        faceVisible: true,
      });
  
      nouvellePileCentrale.cartes = nouvellePileCentrale.cartes.filter(c => c.code !== carteCouranteADeplacer!.code);
  
      const pileCible = nouvellesPiles[indexPileDestination];
  
      pileCible.cartes.forEach((carte, index) => {
        carte.faceVisible = index === 0 || index === 4;
      });
  
      return {
        ...ancienEtat,
        piles: nouvellesPiles,
        pileCentrale: nouvellePileCentrale,
        cartesRevelees: [...ancienEtat.cartesRevelees, carteCouranteADeplacer],
        pileCibleIndex: indexPileDestination, // Enregistrer l'index de la pile cible
      };
    });
  };
  
  const deplacerCarteSuivante = () => {
    console.log("alooo");
    setEtat((ancienEtat) => {
      let nouvellesPiles = [...ancienEtat.piles];
      const pileCible = nouvellesPiles[ancienEtat.pileCibleIndex];
      const carteVisible = pileCible.cartes.find(c => c.faceVisible);
  
      if (!carteVisible) {
        console.log("Aucune carte visible à déplacer dans la pile cible !");
        return ancienEtat;
      }
  
      let indexPileDestination = obtenirPileCorrespondante(carteVisible);
  
      if (indexPileDestination === -1) {
        console.log("Erreur : Impossible de trouver la pile correspondante pour la carte visible !");
        return ancienEtat;
      }
  
      nouvellesPiles[indexPileDestination].cartes.unshift({
        ...carteVisible,
        faceVisible: true,
      });
  
      pileCible.cartes = pileCible.cartes.filter(c => c.code !== carteVisible.code);
  
      return {
        ...ancienEtat,
        piles: nouvellesPiles,
      };
    });
  };
  
  
  

  // Fonction pour obtenir l'index de la pile correspondant à une carte
  const obtenirPileCorrespondante = (carte: CarteH) => {
    const valeurCarte = carte.value; // Extrait la valeur de la carte (par exemple "2", "JACK", etc.)
    console.log(valeurCarte);
    const rangs: { [key: string]: number } = {
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      "JACK": 11,
      "QUEEN": 0,
      "KING": -1,
      "ACE": 1,
    };
    console.log(rangs[valeurCarte] ?? -1);
    return rangs[valeurCarte] ?? -1; // Retourne l'index de la pile correspondant au rang
  };

  return (
    <div className="container text-center mt-5">
      <h1>Clock Solitaire</h1>
      <div
        className="position-relative"
        style={{ width: "500px", height: "500px", margin: "0 auto" }}
      >
        {etat.piles.map((pile, index) => {
          const angle = ((index -3)*30) * (Math.PI / 180);
          const radius = 180;
          const x = 250 + radius * Math.cos(angle);
          const y = 250 + radius * Math.sin(angle);
          return (
            <div
              key={index}
              className="position-absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PileHorloge
                pile={pile.cartes}
                indexPile={index}
                deplacerCarte={deplacerCarte}
                centrale={false}
              />
            </div>
          );
        })}
        <div className="position-absolute top-50 start-50 translate-middle">
          <PileHorloge
            pile={etat.pileCentrale.cartes}
            indexPile={-1}
            deplacerCarte={deplacerCarte}
            centrale={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Horloge;*/
// Horloge.tsx
import React, { useState, useEffect } from "react";
import PileHorloge from "./PileHorloge";
import { Deck } from "./Deck";
import { CarteH, Pile, EtatPiles, EtatPaquet, EtatIndexCourant } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

const Horloge: React.FC = () => {
  // États séparés
  const [etatPiles, setEtatPiles] = useState<EtatPiles>({
    piles: Array(13).fill(null).map(() => ({ cartes: [] })), // 12 piles pour les heures + 1 pile centrale pour les rois
  });

  const [etatPaquet, setEtatPaquet] = useState<EtatPaquet>({
    paquet: [], // Paquet vide
  });

  const [etatIndexCourant, setEtatIndexCourant] = useState<EtatIndexCourant>({
    indexCourant: -1, // Aucune pile ciblée au départ
  });

  useEffect(() => {
    const initialiserJeu = async () => {
      const nouveauPaquet = await Deck.creerPaquet();
      distribuerCartes(nouveauPaquet);
    };

    initialiserJeu();
  }, []);

  const distribuerCartes = (paquet: CarteH[]) => {
    // Mélanger le paquet
    const paquetMelange = [...paquet].sort(() => Math.random() - 0.5);
  
    // Distribuer les cartes dans les 13 piles
    const nouvellesPiles = Array(13).fill(null).map(() => ({ cartes: [] as CarteH[] }));
    let indexCarte = 0;
  
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        nouvellesPiles[j].cartes.push({
          ...paquetMelange[indexCarte],
          faceVisible: false, // Toutes les cartes commencent face cachée
        });
        indexCarte++;
      }
    }
  
    // Révéler la carte du dessus de la pile centrale
    if (nouvellesPiles[0].cartes.length > 0) {
      nouvellesPiles[0].cartes[nouvellesPiles[0].cartes.length - 1].faceVisible = true;
    }
  
    // Mettre à jour les états
    setEtatPiles({ piles: nouvellesPiles });
    setEtatPaquet({ paquet: paquetMelange });
    setEtatIndexCourant({ indexCourant: 0 }); // Commencer par la pile centrale
  };

  const deplacerCarte = () => {
    const nouvellesPiles = [...etatPiles.piles];
    const indexPileSource = etatIndexCourant.indexCourant;
    const pileSource = nouvellesPiles[indexPileSource];
  
    // Vérifier si la pile source est vide
    if (pileSource.cartes.length === 0) {
      console.log("La pile est vide !");
      return;
    }
  
    // Récupérer la carte du dessus de la pile source
    const carteADeplacer = pileSource.cartes[pileSource.cartes.length - 1];
  
    // Vérifier si la carte est face visible
    if (!carteADeplacer.faceVisible) {
      console.log("La carte est face cachée !");
      return;
    }
  
    // Retirer la carte du dessus de la pile source
    pileSource.cartes.pop();
  
    // Trouver la pile de destination en fonction de la valeur de la carte
    const indexPileDestination = obtenirPileCorrespondante(carteADeplacer);
  
    if (indexPileDestination === -1) {
      console.log("Erreur : Impossible de trouver la pile correspondante !");
      return;
    }
  
    // Ajouter la carte à la pile de destination et la rendre visible
    nouvellesPiles[indexPileDestination].cartes.unshift({
      ...carteADeplacer,
      faceVisible: true,
    });
  
    // Révéler la nouvelle carte du dessus de la pile source
    if (pileSource.cartes.length > 0) {
      pileSource.cartes[pileSource.cartes.length - 1].faceVisible = true;
    }
  
    // Mettre à jour les états
    setEtatPiles({ piles: nouvellesPiles });
    setEtatIndexCourant({ indexCourant: indexPileDestination }); // Mettre à jour l'index courant
  };
  const obtenirPileCorrespondante = (carte: CarteH) => {
    const rangs: { [key: string]: number } = {
      "2": 2,
      "3": 3,
      "4": 4,
      "5": 5,
      "6": 6,
      "7": 7,
      "8": 8,
      "9": 9,
      "10": 10,
      "JACK": 11,
      "QUEEN": 12,
      "KING": 0, // Les rois vont au centre (pile 0)
      "ACE": 1,
    };
    return rangs[carte.value] ?? -1;
  };
  return (
    <div className="container text-center mt-5">
      <h1>Clock Solitaire</h1>
      <div
        className="position-relative"
        style={{ width: "500px", height: "500px", margin: "0 auto" }}
      >
        {etatPiles.piles.map((pile, index) => {
          const angle = ((index - 3) * 30) * (Math.PI / 180);
          const radius = index === 0 ? 0 : 180; // La pile centrale (0) est au centre
          const x = 250 + radius * Math.cos(angle);
          const y = 250 + radius * Math.sin(angle);

          return (
            <div
              key={index}
              className="position-absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <PileHorloge
                pile={pile.cartes}
                indexPile={index}
                onClick={() => deplacerCarte()}
                isCentrale={index === 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Horloge;/*  */