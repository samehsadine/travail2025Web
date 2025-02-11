import React from "react";
import NavigationProjets from "../NavigationProjets";
import { Horloge } from "../JeuxHorloge/Horloge";
export function PageJeuxHorloge() {
    return (
        <>
            <Horloge />
            <NavigationProjets cheminActuel={"/projets/horloge"} />
        </>
    )
}