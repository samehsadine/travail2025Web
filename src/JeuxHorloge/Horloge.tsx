import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PileHorloge from "./PileHorloge";
import { Deck } from "./Deck";
import { CarteH, EtatPiles, EtatPaquet, EtatIndexCourant } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"; // Importez le fichier CSS

const Horloge: React.FC = () => {
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
  const [timerActif, setTimerActif] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const demarrerTimer = () => {
    if (!timerActif) {
      setTimerActif(true);
      const id = setInterval(() => {
        setTempsEcoule((prevTemps) => prevTemps + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const arreterTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setTimerActif(false);
    }
  };

  const calculerScore = () => {
    return Math.max(0, 1000 - tempsEcoule * 10); // Score basé sur le temps
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

    let carteVisible: CarteH | null = null;
    if (nouvellesPiles[0].cartes.length > 0) {
      nouvellesPiles[0].cartes[nouvellesPiles[0].cartes.length - 1].faceVisible = true;
      carteVisible = nouvellesPiles[0].cartes[nouvellesPiles[0].cartes.length - 1];
      setCarte(carteVisible);
      setFaceCarte(true);
    }

    const pileCibleIndex = carteVisible ? obtenirPileCorrespondante(carteVisible) : -1;
    setEtatPiles({ piles: nouvellesPiles });
    setEtatPaquet({ paquet: paquetMelange });
    setEtatIndexCourant({ indexCourant: pileCibleIndex });
  };

  const deplacerCarte = (indexPileCible: number) => {
    if (indexPileCible === -1 || indexPileCible >= etatPiles.piles.length) return;

    const nouvellesPiles = [...etatPiles.piles];
    const pileCentrale = nouvellesPiles[0];
    const pileCible = nouvellesPiles[indexPileCible];

    if (pileCentrale.cartes.length === 0) return;

    const carteADeplacer = pileCentrale.cartes.pop()!;
    if (!carteADeplacer.faceVisible) return;

    pileCible.cartes.unshift({
      ...carteADeplacer,
      faceVisible: true,
    });

    if (pileCible.cartes.length > 0) {
      pileCible.cartes[0].faceVisible = true;
    }

    const nouvelleCarteVisible = pileCible.cartes[0];
    const nouvellePileCibleIndex = nouvelleCarteVisible
      ? obtenirPileCorrespondante(nouvelleCarteVisible)
      : -1;

    setEtatPiles({ piles: nouvellesPiles });
    setEtatIndexCourant({ indexCourant: nouvellePileCibleIndex });
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
            <div className="score">Score: {calculerScore()}</div>
          </div>
        </Row>

        {/* Message de fin de jeu */}
        {etatPiles.piles.every(pile => pile.cartes.length === 0) && (
          <Row className="mt-4"> {/* Ajout de mt-4 pour un espacement supplémentaire */}
            <div>
              <h2>Félicitations ! Vous avez terminé le jeu !</h2>
              <p>Votre score final est : {calculerScore()}</p>
            </div>
          </Row>
        )}
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
                      if (index === etatIndexCourant.indexCourant) {
                        deplacerCarte(index);
                      }
                    }}
                    isCentrale={index === 0}
                  />
                </div>
              );
            })}
          </div>
        </Row>
      </div>
    </Container>
  );
};

export default Horloge;