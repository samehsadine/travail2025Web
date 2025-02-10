import { CarteH } from "./Types";

export interface Cartes {
    valeur: string;
    couleur: string;
  }
  
  export const Deck = {
    async creerPaquet(): Promise<CarteH[]> {
  const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
  const data = await response.json();
  return data.cards.map((card: any) => ({
    code: card.code,
    image: card.image,
    faceVisible: false, // Default to face down
    value: card.value
  }));
},
  
    async tirerCartes(deck_id: string): Promise<CarteH[]> {
      try {
        // Tire 52 cartes du paquet créé
        const reponse = await fetch(
          `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=52`
        );
        const donnees = await reponse.json();

        console.log('Donnees',donnees)
  
        // Vérifie si les cartes sont présentes dans la réponse
        if (donnees.cards) {
          // Récupère les codes des cartes
          return donnees.cards.map((carte: any) => carte);
        } else {
          throw new Error("Erreur lors de la récupération des cartes.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
        return []; // Retourne un tableau vide en cas d'erreur
      }
    },
  };
  
  