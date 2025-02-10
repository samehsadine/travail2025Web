// CompteurDrapeaux.tsx
import React from 'react';

export interface CompteurDrapeauxProps {
  minesRestantes: number;
}

export function CompteurDrapeaux({ minesRestantes }: CompteurDrapeauxProps) {
  return <div>Mines restantes: {minesRestantes}</div>;
}