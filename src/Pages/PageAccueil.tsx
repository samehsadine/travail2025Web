import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Container } from 'react-bootstrap';

export function PageAccueil() {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <h1>Bienvenue sur la page d'accueil</h1>
            <p>Choisissez un jeu pour commencer à jouer :</p>

            <div className="d-flex justify-content-center gap-5 mt-4">
                <div className="d-flex flex-column align-items-center">
                    <img 
                        src="/demineur.png" 
                        alt="Démineur" 
                        className="mb-3" 
                        style={{ width: '200px', height: 'auto' }}
                    />
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={() => navigate('/projets/demineur')}
                    >
                        Jouer au Démineur
                    </Button>
                </div>

                <div className="d-flex flex-column align-items-center">
               
                    <img 
                        src="/horloge.png" 
                        alt="Horloge" 
                        className="mb-3" 
                        style={{ width: '180px', height: 'auto' }}
                    />
               
                    <Button 
                        variant="success" 
                        size="lg"
                        onClick={() => navigate('/projets/horloge')}
                    >
                        Jouer à l'Horloge
                    </Button>
                </div>
            </div>
        </Container>
    );
} 
   