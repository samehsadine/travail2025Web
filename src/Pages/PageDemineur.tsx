import React from "react";
import NavigationProjets from "../NavigationProjets"
import { Demineur } from "../JeuxDemineur/Demineur";

export function PageDemineur() {
    return (
        <>
            <h1>Bienvenue Jeux Démineur</h1>  
            <Demineur/>
            <NavigationProjets cheminActuel={"/projets/demineur"} />
       
        </>
    )
}