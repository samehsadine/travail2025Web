import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Col, Row } from 'react-bootstrap';
interface NavigationProjetsProps {
    cheminActuel: string;
}
const cheminProjet = [
    "/projets/demineur",
    "/projets/horloge"
];

const NavigationProjets:React.FC<NavigationProjetsProps> = ({ cheminActuel }) => {
    const navigate = useNavigate();
    const currentIndex = cheminProjet.indexOf(cheminActuel);

    const handlePrevious = () => {
        const prevIndex = (currentIndex - 1 + cheminProjet.length) % cheminProjet.length;
        navigate(cheminProjet[prevIndex]);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % cheminProjet.length;
        navigate(cheminProjet[nextIndex]);
    };

    return (
           <Row className="d-flex justify-content-between mt-2" >
        <Col className="text-left">
            <Button className="me-5" onClick={handlePrevious}>
                Précédent
            </Button>
       
            <Button onClick={handleNext}>
                Suivant
            </Button>
        </Col>
    </Row>
   
    );
};

export default NavigationProjets;