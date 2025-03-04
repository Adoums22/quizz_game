import React from "react";
import { Link } from "react-router-dom";
import Drapeau from "../assets/drapeau-logo.png";
import Capital from "../assets/capital-logo.png";
import Carte from "../assets/carte-logo.png";
import NavigationButtons from "../components/NavigationButtons";

// Tableau des modes de jeu
const MODES_JEU = [
  { id: 1, nom: "Trouve le drapeau", logo: Drapeau, route: "/mode/drapeau" },
  { id: 2, nom: "Trouve la capitale", logo: Capital, route: "/mode/capital" },
  { id: 3, nom: "Trouve sur la carte", logo: Carte, route: "/mode/carte" },
];

export default function ModeJeu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <NavigationButtons/>
      <h1 className="text-white text-3xl font-bold font-pixel text-center mb-10">
        Choisis ton mode de jeu :
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {MODES_JEU.map((mode) => (
          <Link
            key={mode.id}
            to={mode.route}
            className="flex flex-col items-center justify-center border-8 border-white rounded-2xl p-6 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[250px] transition-transform hover:scale-105"
          >
            <img src={mode.logo} alt={mode.nom} className="w-32 h-32 mb-4" />
            <h2 className="text-white text-xl font-bold font-pixel text-center">{mode.nom}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
