import React from "react";

interface HorlogeNumeriqueProps {
  temps: number; // Temps en secondes
}

export function HorlogeNumerique({ temps }: HorlogeNumeriqueProps) {
  const formatTemps = (temps: number): string => {
    const minutes = Math.floor(temps / 60);
    const secondes = temps % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
  };

  return (
    <div
      className="text-center bg-dark text-danger border border-danger rounded px-3 py-1"
      style={{ fontFamily: "'Digital-7 Mono', monospace", fontSize: "2rem", width: "fit-content" }}
    >
      {formatTemps(temps)}
    </div>
  );
}
