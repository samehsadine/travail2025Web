import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
}
  from 'react-router'
import { Container } from "react-bootstrap";
import { PageAccueil } from "./Pages/PageAccueil";
import { BarreNavigation } from "./BarreNavigation";
import { RoutePrivee } from "./RoutePrivee";
import { PageConnexionRequise } from "./Pages/PageConnexionRequise";
import { Page404 } from "./Pages/Page404";
import { PageDemineur } from "./Pages/PageDemineur";
import { PageJeuxHorloge } from "./Pages/PageJeuxHorloge";


export function App() {

  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<PageAccueil />} />

          <Route path="/projets/demineur" element={<RoutePrivee><PageDemineur /></RoutePrivee>} />
          <Route path="/projets/horloge" element={<RoutePrivee><PageJeuxHorloge /></RoutePrivee>} />
          <Route path="/connexion-requise" element={<PageConnexionRequise />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

      </Container>
    </BrowserRouter>
  );
}
