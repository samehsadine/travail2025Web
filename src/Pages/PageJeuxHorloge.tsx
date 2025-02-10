import React from "react";
import NavigationProjets from "../NavigationProjets";
import Horloge from "../JeuxHorloge/Horloge";
export function PageJeuxHorloge() {
    return (
        <>
            <h1>Bienvenue Jeux d' Horloge</h1>  
            <Horloge />
            <NavigationProjets cheminActuel={"/projets/horloge"} />
        </>
    )
}