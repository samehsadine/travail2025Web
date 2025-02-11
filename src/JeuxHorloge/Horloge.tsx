import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PileHorloge from "./PileHorloge";
import { Deck } from "./Deck";
import { CarteH, EtatPiles, EtatPaquet, EtatIndexCourant } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Importez le fichier CSS

export function Horloge () {
  const [etatPiles, setEtatPiles] = useState<EtatPiles>({
    piles: Array(13).fill(null).map(() => ({ cartes: [] })),
  });

  const [etatPaquet, setEtatPaquet] = useState<EtatPaquet>({
    paquet: [],
  });

  const [faceCarte, setFaceCarte] = useState(false);
  const [carte, setCarte] = useState<CarteH>();

  const [etatIndexCourant, setEtatIndexCourant] = useState<EtatIndexCourant>({
    indexCourant: -1,
  });

  const [tempsEcoule, setTempsEcoule] = useState(0);
  const [timerActif, setsetTimeActif] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [estTerminer, setEstTerminer] = useState(false);
  const [message, setMessage] = useState("");
  const [score , setScore] = useState(0);

  const demarrerTimer = () => {
    if (!timerActif) {
      setsetTimeActif(true);
      const id = setInterval(() => {
        setTempsEcoule((prevTemps) => prevTemps + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const arreterTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setsetTimeActif(false);
    }
  };

  const calculerScore = () => {
    setScore(prevScore => prevScore + 5);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const initialiserJeu = async () => {
      const nouveauPaquet = await Deck.creerPaquet();
      distribuerCartes(nouveauPaquet);
    };

    initialiserJeu();
  }, []);

  const distribuerCartes = (paquet: CarteH[]) => {
    console.log('distribuerCartes function start');
    const paquetMelange = [...paquet].sort(() => Math.random() - 0.5);
    const nouvellesPiles = Array(13).fill(null).map(() => ({ cartes: [] as CarteH[] }));
    let indexCarte = 0;

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        nouvellesPiles[j].cartes.push({
          ...paquetMelange[indexCarte],
          faceVisible: false,
        });
        indexCarte++;
      }
    }
    console.log('nouvellesPiles', nouvellesPiles);
    let carteVisible: CarteH | null = null;
    if (nouvellesPiles[0].cartes.length > 0) {
      nouvellesPiles[0].cartes[nouvellesPiles[0].cartes.length - 1].faceVisible = true;
      carteVisible = nouvellesPiles[0].cartes[nouvellesPiles[0].cartes.length - 1];
      setCarte(carteVisible);
      setFaceCarte(true);
    }

    const pileCibleIndex = carteVisible ? obtenirPileCorrespondante(carteVisible) : -1;
    console.log('pileCibleIndex', pileCibleIndex);
    setEtatPiles({ piles: nouvellesPiles });
    setEtatPaquet({ paquet: paquetMelange });
    setEtatIndexCourant({ indexCourant: 0 });
    console.log('distribuerCartes function end');
  };

  const deplacerCarte = (indexPileCible: number) => {

    if(estTerminer){
      setMessage(`Le jeu est terminé. votre score est :${score} points `);
      return;
      
    }
    console.log('deplacerCarte function start');
    if (indexPileCible === -1 || indexPileCible >= etatPiles.piles.length) return;
    console.log('debut');
    console.log('etatIndexCourant', etatIndexCourant.indexCourant);
    console.log('indexPileCible', indexPileCible);
    const nouvellesPiles = [...etatPiles.piles];
    const pileSource = nouvellesPiles[etatIndexCourant.indexCourant];
    const pileCible = nouvellesPiles[indexPileCible];

    if (pileSource.cartes.length === 0) return;

    //const carteADeplacer = pileSource.cartes.pop()!;
    const carteADeplacer = pileSource.cartes[pileSource.cartes.length - 1]; // Récupère la dernière carte sans la retirer
    const PileCorrespondante = obtenirPileCorrespondante(carteADeplacer);
    console.log('carteADeplacer', carteADeplacer);
    if (!carteADeplacer.faceVisible || PileCorrespondante !== indexPileCible) {
      alert("Vous ne pouvezpas deplacer la carte ici : l'index de la pile cible est incorrect. ");
      return;
    }
 
    pileSource.cartes.pop();


    pileCible.cartes.unshift({
      ...carteADeplacer,
      faceVisible: true,
    });

    if (pileCible.cartes.length > 0) {
      pileCible.cartes[pileCible.cartes.length - 1].faceVisible = true;
    }

    const nouvelleCarteVisible = pileCible.cartes[pileCible.cartes.length - 1];
    const nouvellePileCibleIndex = nouvelleCarteVisible
      ? obtenirPileCorrespondante(nouvelleCarteVisible)
      : -1;

    console.log('fin');
    console.log('etatIndexCourant', indexPileCible);
    console.log('nouvellePile', nouvellesPiles);
    calculerScore();
    setEtatPiles({ piles: nouvellesPiles });
    setEtatIndexCourant({ indexCourant: indexPileCible });
    jeuTerminer();
  };
  const jeuTerminer = () => {
    const nouvellesPiles = [...etatPiles.piles];
    const pilCentral = nouvellesPiles[0];
    for (let i = 0; i < pilCentral.cartes.length; i++) {
      if (pilCentral.cartes[i].value !== "KING") return;

    }
    setEstTerminer(true);
    setMessage("Partie terminée");
    arreterTimer();
  };
  const obtenirPileCorrespondante = (carte: CarteH) => {
    const rangs: { [key: string]: number } = {
      "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
      "JACK": 11, "QUEEN": 12, "KING": 0, "ACE": 1,
    };
    return rangs[carte.value] ?? -1;
  };

  return (
    <Container style={{
      backgroundImage: "url('/carte.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh"
    }}>
      <div className="container text-center mt-5">
        <Row>
          <h1>Bienvenue au jeu d'Horloge Solitaire</h1>
        </Row>
        <Row className="mt-4"> {/* Ajout de mt-4 pour un espacement supplémentaire */}
          <div className="timer-score-container">
            <div className="timer">Temps: {formatTime(tempsEcoule)}</div>
            <div className="score">Score: {score}</div>
          </div>
        </Row>
        <Row>
          <div
            className="position-relative"
            style={{ width: "500px", height: "500px", margin: "0 auto" }}
          >
            {etatPiles.piles.map((pile, index) => {
              const angle = ((index - 3) * 30) * (Math.PI / 180);
              const radius = index === 0 ? 0 : 180;
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
                    onClick={() => {
                      if (!timerActif) {
                        demarrerTimer();
                      }
                      console.log(index, etatIndexCourant.indexCourant);
                      // if (index === etatIndexCourant.indexCourant) {
                      deplacerCarte(index);
                      //  }
                    }}
                    isCentrale={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </Row>
        <Row>
        {message && <div className="alert alert-danger mt-3"/>}
        </Row>
      </div>
    </Container>
  );
};
