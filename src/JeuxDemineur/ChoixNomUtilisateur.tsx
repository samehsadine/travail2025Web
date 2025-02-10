// ChoixNomUtilisateur.tsx
import React from 'react';

export interface ChoixNomUtilisateurProps {
  nomUtilisateur: string | null;
}

export function ChoixNomUtilisateur({ nomUtilisateur }: ChoixNomUtilisateurProps) {
  return <div>Félicitations, {nomUtilisateur}!</div>;
}