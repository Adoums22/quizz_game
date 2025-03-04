import React from "react";
import { Link } from "react-router-dom";
import Drapeau from "../assets/drapeau-logo.png";
import Capital from "../assets/capital-logo.png";
import Carte from "../assets/carte-logo.png";
import NavigationButtons from "../components/NavigationButtons";

const MODES_JEU = [
  { id: 1, nom: "Trouve le drapeau", logo: Drapeau, route: "/mode/drapeau" },
  { id: 2, nom: "Trouve la capitale", logo: Capital, route: "/mode/capital" },
  { id: 3, nom: "Trouve sur la carte", logo: Carte, route: "/mode/carte" },
];

export default function ModeJeu() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <NavigationButtons />

      <h1 className="text-white text-3xl md:text-4xl font-bold font-pixel text-center mb-12">
        Choisis ton mode de jeu :
      </h1>

      {/* Grid responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl mx-auto p-4">
        {MODES_JEU.map((mode) => (
          <Link
            key={mode.id}
            to={mode.route}
            className="flex flex-col items-center justify-center border-8 border-white rounded-2xl p-6 shadow-xl shadow-white transition-transform hover:scale-105 w-full max-w-[200px] mx-auto"
          >
            <img src={mode.logo} alt={mode.nom} className="w-24 h-24 mb-4 object-contain" />
            <h2 className="text-white text-lg font-bold font-pixel text-center text-sm md:text-base">{mode.nom}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
