import React, { useEffect, useState } from "react";
import FlagDisplay from "../components/FlagDisplay";
import NavigationButtons from "../components/NavigationButtons";
import GameOverScreen from "../components/GameOverScreen";
import useGameStats from "../components/useGameStats";
import { useGame } from "../context/GameContext";

export default function CapitalJeu() {
  const { score, setScore, vies, setVies, rejouer, retourMenu } = useGameStats("capitaleMode");
  const { currentCountry, loadCountry } = useGame();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCountry();
    setIsCorrect(null);
  }, []);

  const verifierReponse = (choix) => {
    if (!currentCountry) return;

    setSelectedAnswer(choix);
    const correct = choix === currentCountry.capital;
    setIsCorrect(correct);

    if (correct) {
      setMessage("Bonne réponse !");
      setScore((prev) => prev + 10);
    } else {
      setMessage("Mauvaise réponse !");
      setVies((prev) => prev - 1);
    }

    setTimeout(() => {
      setIsCorrect(null);
      loadCountry();
    }, 1000);
  };

  if (vies <= 0) {
    return <GameOverScreen mode="capitaleMode" onReplay={rejouer} onReturnMenu={retourMenu} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <NavigationButtons />
      <h1 className="text-3xl md:text-4xl font-bold font-pixel mb-6 md:mb-8 neon-text text-center">
        Trouve la capitale
      </h1>

      <div className={`border-4 p-5 md:p-6 mt-6 md:mt-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md text-center transition-all duration-300 
          ${isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : "border-white"}`}
      >
        <div className="flex justify-between w-full px-4 mb-4">
          <p className="text-base md:text-lg font-bold">Score: {score}</p>
          <p className="text-base md:text-lg font-bold">❤️: {vies} </p>
        </div>

        {currentCountry ? (
          <>
            <div className="w-full flex justify-center mb-4">
              <FlagDisplay flag={currentCountry.flag} className="rounded-lg shadow-md w-full max-h-32 object-cover" />
            </div>

            <p className="text-lg md:text-xl mb-5 font-semibold">
              Quelle est la capitale de {currentCountry.name} ?
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              {currentCountry.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => verifierReponse(option)}
                  className={`px-4 py-2 border-2 text-white font-bold rounded-lg transition-all duration-300 text-sm text-center break-words w-full
                    ${selectedAnswer
                      ? option === currentCountry.capital
                        ? "border-green-500"
                        : option === selectedAnswer
                        ? "border-red-500"
                        : "border-white"
                      : "border-white hover:shadow-lg hover:scale-105 active:scale-95"}`}
                >
                  {option}
                </button>
              ))}
            </div>

            {message && (
              <p className={`mt-4 text-lg ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                {message}
              </p>
            )}
          </>
        ) : (
          <p className="text-lg">Chargement...</p>
        )}
      </div>
    </div>
  );
}
