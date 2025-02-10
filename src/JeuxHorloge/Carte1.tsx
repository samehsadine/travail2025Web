import React from "react";
import { CarteH } from "./Types";

interface CarteProps {
  carte: CarteH;
}

export default function Carte1({ carte }: CarteProps) {
  // console.log('carte',carte)
  return (
    
      <img  alt={carte.code} src={carte.faceVisible ? `https://deckofcardsapi.com/static/img/${carte.code}.png`
      : 'https://deckofcardsapi.com/static/img/back.png' } style={{ width: "50px", height: "70px" }}/>
  );
}
