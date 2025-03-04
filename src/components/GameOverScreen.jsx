import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { VscDebugRestart } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";

const GameOverScreen = ({ score, onReplay, onReturnMenu }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <div className="border-4 border-white p-8 rounded-2xl shadow-xl flex flex-col items-center 
                      w-full max-w-[400px] shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]">
        <h2 className="text-4xl font-bold text-red-500">Game Over</h2>
        <p className="mt-4 text-lg">
          Ton score final : <span className="font-bold">{score}</span>
        </p>

        <div className="mt-6 flex flex-col gap-4 w-full">
          {/* Bouton Rejouer */}
          <button
            onClick={onReplay}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border-4 border-white text-white font-bold rounded-lg shadow-md 
                      hover:bg-green-600 transition duration-300 shadow-2xl shadow-white min-w-[150px] max-w-[300px]"
          >
            <VscDebugRestart className="text-xl" />
            Rejouer
          </button>

          {/* Bouton Retour Menu */}
          <Link
            onClick={onReturnMenu}
            to="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 text-center border-4 border-white text-white font-bold rounded-lg shadow-md 
                      hover:bg-blue-600 transition duration-300 shadow-2xl shadow-white min-w-[150px] max-w-[300px]"
          >
            <FaHome className="text-xl" />
            Retourner au menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
