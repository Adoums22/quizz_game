import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import de Link pour la navigation
import HomeLogo from "../assets/home-logo.png"; // Ton logo que tu avais importé
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"; // Import des icônes React Icons
import { playSound, stopSound, playLoopingSound } from "../utils/audioUtils"; // Import des fonctions pour gérer le son
import homeMusic from "../assets/home-music.wav"; // Import du fichier son
import buttonSound from "../assets/sounds/boutton-sound.wav";

export default function Home() {
  // État pour savoir si le son est activé ou non
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Fonction pour activer ou désactiver le son
  const toggleSound = () => {
    if (isSoundOn) {
      stopSound(); // Arrêter le son si il est activé
    } else {
      playLoopingSound(homeMusic); // Jouer le son si il est désactivé
    }
    setIsSoundOn(!isSoundOn); // Inverser l'état du son
  };

  const handleLinkClick = () => {
    playSound(buttonSound); // Jouer le son lorsque l'utilisateur clique sur un lien
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-white text-3xl font-bold font-pixel text-center">
        Quiz Géographie
      </h1>
      <h2 className="text-white text-2xl font-bold font-pixel mt-4 mb-12 text-center">
        Viens tester tes connaissances !
      </h2>

      {/* Section du logo */}
      <div className="flex flex-col items-center justify-center border-8 border-white rounded-2xl p-10 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]">
        <img src={HomeLogo} alt="Home Logo" className="w-32 h-32" />
      </div>

      {/* Section des liens Solo et Multijoueur */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Link
          onClick={handleLinkClick}
          to="/solo"
          className="border-4 border-white text-white text-xl font-bold font-pixel px-6 py-2 rounded-lg transition-transform hover:scale-105 border-white rounded-2xl p-10 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]"
        >
          Solo
        </Link>
        <Link
          onClick={handleLinkClick} // Exécute la fonction toggleSound au clic
          to="/multijoueur"
          className="border-4 border-white text-white text-xl font-bold font-pixel px-6 py-2 rounded-lg transition-transform hover:scale-105 border-white rounded-2xl p-10 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]"
        >
          Multijoueur
        </Link>
      </div>

      {/* Affichage de l'icône de son */}
      <div className="mt-4">
        <button
          onClick={toggleSound} // Exécute la fonction toggleSound au clic
          className="text-white" // Style de l'icône
        >
          {/* Afficher l'icône en fonction de l'état du son */}
          {isSoundOn ? (
            <FaVolumeUp className="text-3xl" /> // Icône quand le son est activé
          ) : (
            <FaVolumeMute className="text-3xl" /> // Icône quand le son est désactivé
          )}
        </button>
      </div>
    </div>
  );
}
