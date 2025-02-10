// Types.ts

export interface CarteH {
    code: string;  // Code de la carte (par exemple 'AS', '2S', 'KH'...)
    image: string; 
    faceVisible: boolean;
    value: string;
  }
  
  export interface Pile {
    cartes: CarteH[];  // Chaque pile contient un tableau de cartes de type CarteH
  }
  export interface EtatApp {
    piles: Pile[];
    pileCentrale: Pile;
    paquet: CarteH[];
    cartesRevelees: CarteH[]; // Remplace string[] par CarteH[]
    pileCibleIndex: number;
  }
  