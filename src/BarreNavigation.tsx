
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth0 } from '@auth0/auth0-react';

export function BarreNavigation() {
  const {isAuthenticated,loginWithRedirect,logout} = useAuth0();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Accueil</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {isAuthenticated &&(
          <Nav.Link href="/admin">Admin</Nav.Link> )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              
            <NavDropdown.Item href="/projets/Demineur">Demineur</NavDropdown.Item>
              <NavDropdown.Item href="/projets/horloge">Horloge</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <div>
          <ul>
            {isAuthenticated ?(
              <button className="btn btn-link" onClick={()=>logout()}> Se déconnecter</button>
            ):
            <button className="btn btn-link" onClick={()=>loginWithRedirect()}>Se connecter</button>
            }
          </ul>
        </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
