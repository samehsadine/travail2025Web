

/* export interface Cellule {
  aMine: boolean;
  estOuverte: boolean;
  estDrapeau: boolean;
  minesAdjacentes: number;
}

export interface GrilleProps {
  grille: Cellule[][];
  gererClicCellule: (ligne: number, colonne: number) => void;
  gererDrapeau: (ligne: number, colonne: number) => void;
}

export function Grille({ grille, gererClicCellule, gererDrapeau }: GrilleProps) {
  return (
    <div>
      {grille.map((ligne, indexLigne) => (
        <div key={indexLigne} style={{ display: 'flex' }}>
          {ligne.map((cellule, indexColonne) => (
            <div
              key={indexColonne}
              onClick={() => gererClicCellule(indexLigne, indexColonne)}
              onContextMenu={(e) => {
                e.preventDefault();
                gererDrapeau(indexLigne, indexColonne);
              }}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: cellule.estOuverte ? '#ccc' : '#fff',
              }}
            >
              {cellule.estOuverte && cellule.minesAdjacentes > 0 && !cellule.aMine ? cellule.minesAdjacentes : ''}
              {cellule.estDrapeau && '🚩'}
              {cellule.estOuverte && cellule.aMine && '💣'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} */
// Gérer le clic sur une cellule
/* import React from "react";
export interface Cellule {
  aMine: boolean;
  estOuverte: boolean;
  estDrapeau: boolean;
  minesAdjacentes: number;
}

export interface Props {
  grille: Cellule[][]; 
  gererClicCellule: (ligne: number, colonne: number) => void; 
  gererDrapeau: (ligne: number, colonne: number) => void;
}

export const Grille: React.FC<Props> = ({ grille, gererClicCellule, gererDrapeau }) => {
  return (
    <div
      className="grille"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grille.length}, 40px)`,
        gridGap: '2px',
      }}
    >
      {grille.map((ligne, i) =>
        ligne.map((cellule, j) => (
          <div
            key={`${i}-${j}`}
            className={`cellule ${cellule.estOuverte ? 'ouverte' : ''} ${cellule.estDrapeau ? 'drapeau' : ''}`}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: cellule.estOuverte ? '#e0e0e0' : '#fff',
              border: '1px solid #ccc',
              textAlign: 'center',
              lineHeight: '40px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => gererClicCellule(i, j)}
            onContextMenu={(e) => {
              e.preventDefault(); // Prevent right-click context menu
              gererDrapeau(i, j);
            }}
          >
            {cellule.estOuverte && !cellule.aMine && cellule.minesAdjacentes > 0
              ? cellule.minesAdjacentes
              : cellule.estOuverte && cellule.aMine
              ? <img src="/mine.png" alt="Mine" style={{ width: '80%' }} />
           
              : '' }
        
          </div>
        ))
      )}
    </div>
  );
};
 */

/* import React from "react";

export interface Cellule {
  aMine: boolean;
  estOuverte: boolean;
  estDrapeau: boolean;
  minesAdjacentes: number;
}

export interface Props {
  grille: Cellule[][]; 
  gererClicCellule: (ligne: number, colonne: number) => void; 
  gererDrapeau: (ligne: number, colonne: number) => void;
}

export const Grille: React.FC<Props> = ({ grille, gererClicCellule, gererDrapeau }) => {
  return (
    <div
      className="grille"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grille.length}, 40px)`,
        gridGap: '2px',
      }}
    >
      {grille.map((ligne, i) =>
        ligne.map((cellule, j) => (
          <div
            key={`${i}-${j}`}
            className={`cellule ${cellule.estOuverte ? 'ouverte' : ''} ${cellule.estDrapeau ? 'drapeau' : ''}`}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: cellule.estOuverte ? '#e0e0e0' : '#fff',
              border: '1px solid #ccc',
              textAlign: 'center',
              lineHeight: '40px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => gererClicCellule(i, j)}
            onContextMenu={(e) => {
              e.preventDefault(); // Prevent right-click context menu
              gererDrapeau(i, j);
            }}
          >
            {cellule.estOuverte && !cellule.aMine && cellule.minesAdjacentes > 0
              ? cellule.minesAdjacentes
              : cellule.estOuverte && cellule.aMine
              ? <img src="/mine.png" alt="Mine" />
              : ''}
          </div>
        ))
      )}
    </div>
  );
}; */
import React from "react";

export interface Cellule {
  aMine: boolean;
  estOuverte: boolean;
  estDrapeau: boolean;
  minesAdjacentes: number;
}

export interface Props {
  grille: Cellule[][]; 
  gererClicCellule: (ligne: number, colonne: number) => void; 
  gererDrapeau: (ligne: number, colonne: number) => void;
}

export const Grille: React.FC<Props> = ({ grille, gererClicCellule, gererDrapeau }) => {
  return (
    <div
      className="grille d-grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${grille.length}, 40px)`,
      }}
    >
      {grille.map((ligne, i) =>
        ligne.map((cellule, j) => (
          <div
            key={`${i}-${j}`}
            className={`cellule ${cellule.estOuverte ? 'ouverte' : ''} ${cellule.estDrapeau ? 'drapeau' : ''} d-flex justify-content-center align-items-center`}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: cellule.estOuverte ? '#e0e0e0' : '#fff',
              border: '1px solid #ccc',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => gererClicCellule(i, j)}
            onContextMenu={(e) => {
              e.preventDefault(); // Prevent right-click context menu
              gererDrapeau(i, j); // Place or remove flag
            }}
          >
            {cellule.estDrapeau ? (
              <img src="/drapeau.png" alt="Drapeau" className="img-fluid" />
            ) : cellule.estOuverte && !cellule.aMine && cellule.minesAdjacentes > 0 ? (
              cellule.minesAdjacentes
            ) : cellule.estOuverte && cellule.aMine ? (
              <img src="/mine.png" alt="Mine" className="img-fluid" />
            ) : (
              ''
            )}
          </div>
        ))
      )}
    </div>
  );
};