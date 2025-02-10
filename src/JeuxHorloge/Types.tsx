// // Types.ts

// export interface CarteH {
//     code: string;  // Code de la carte (par exemple 'AS', '2S', 'KH'...)
//     image: string; 
//     faceVisible: boolean;
//     value: string;
//   }
  
//   export interface Pile {
//     cartes: CarteH[];  // Chaque pile contient un tableau de cartes de type CarteH
//   }
//   export interface EtatApp {
//     piles: Pile[];
//     pileCentrale: Pile;
//     paquet: CarteH[];
//     cartesRevelees: CarteH[]; // Remplace string[] par CarteH[]
//     pileCibleIndex: number;
//   }
  
// Types.ts
export interface CarteH {
  code: string; // Code de la carte (par exemple 'AS', '2S', 'KH'...)
  image: string;
  faceVisible: boolean;
  value: string;
}

export interface Pile {
  cartes: CarteH[]; // Chaque pile contient un tableau de cartes de type CarteH
}

// État pour les piles
export interface EtatPiles {
  piles: Pile[]; // 13 piles (12 pour les heures + 1 pour les rois au centre)
}

// État pour le paquet de cartes
export interface EtatPaquet {
  paquet: CarteH[]; // Paquet de cartes non distribuées
}

// État pour l'index courant
export interface EtatIndexCourant {
  indexCourant: number; // Index de la pile actuellement ciblée
}