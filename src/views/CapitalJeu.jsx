import React, { useEffect, useState } from "react";
import FlagDisplay from "../components/FlagDisplay";
import NavigationButtons from "../components/NavigationButtons";
import GameOverScreen from "../components/GameOverScreen";
import useGameStats from "../components/useGameStats";
import { getRandomCapital, shuffleArray } from "../services/capitalsService";

export default function CapitalJeu() { // ✅ Corrigé pour correspondre au fichier CapitalJeu.jsx
  const { score, setScore, vies, setVies, rejouer, retourMenu } = useGameStats("capitaleMode");

  const [drapeau, setDrapeau] = useState(null);
  const [nomPays, setNomPays] = useState("");
  const [bonneReponse, setBonneReponse] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const chargerNouvelleQuestion = async () => {
    setSelectedAnswer(null);
    setIsCorrect(null);

    const country = await getRandomCapital();
    if (!country || !country.capital || !country.flag || !country.name) return; // ✅ Vérification pour éviter les erreurs

    setDrapeau(country.flag);
    setNomPays(country.name);
    setBonneReponse(country.capital);
    setOptions(shuffleArray([country.capital, ...country.fakeCapitals]));
    setMessage("");
  };

  useEffect(() => {
    const savedQuestion = localStorage.getItem("currentQuestion");
    if (savedQuestion) {
      const parsed = JSON.parse(savedQuestion);
      setDrapeau(parsed.flag);
      setNomPays(parsed.name);
      setBonneReponse(parsed.capital);
      setOptions(parsed.options);
    } else {
      chargerNouvelleQuestion();
    }
  }, []);
  
  useEffect(() => {
    if (nomPays) {
      localStorage.setItem("currentQuestion", JSON.stringify({ flag: drapeau, name: nomPays, capital: bonneReponse, options }));
    }
  }, [drapeau, nomPays, bonneReponse, options]);
  

  const verifierReponse = (choix) => {
    if (!bonneReponse) return; // ✅ Évite les erreurs si les données ne sont pas chargées

    setSelectedAnswer(choix);
    const correct = choix === bonneReponse;
    setIsCorrect(correct);

    if (correct) {
      setMessage("Bonne réponse !");
      setScore((prevScore) => prevScore + 10);
    } else {
      setMessage("Mauvaise réponse !");
      setVies((prevVies) => prevVies - 1);
    }

    setTimeout(chargerNouvelleQuestion, 1000);
  };

  if (vies <= 0) {
    return <GameOverScreen mode="capitale" onReplay={rejouer} onReturnMenu={retourMenu} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <NavigationButtons />

      <h1 className="text-3xl md:text-4xl font-bold font-pixel mb-6 md:mb-8 neon-text text-center">
        Trouve la capitale
      </h1>

      <div
        className={`border-4 p-5 md:p-6 mt-6 md:mt-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md md:max-w-lg text-center transition-all duration-300
          ${isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : "border-white"}
        `}
      >
        <div className="flex justify-between w-full px-4 mb-4">
          <p className="text-white text-base md:text-lg font-bold">Score: {score}</p>
          <p className="text-white text-base md:text-lg font-bold">❤️: {vies} </p>
        </div>

        {drapeau ? (
          <>
            <div className="w-full flex justify-center mb-4">
              <FlagDisplay flag={drapeau} className="rounded-lg shadow-md w-full max-h-32 md:max-h-40 object-cover" />
            </div>

            <p className="text-lg md:text-xl mb-5 md:mb-6 font-semibold">
              Quelle est la capitale de {nomPays} ?
            </p>

            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => verifierReponse(option)}
                  className={`px-4 py-2 md:px-6 md:py-3 border-2 text-white font-bold rounded-lg transition-all duration-300 
                    text-sm md:text-lg text-center break-words max-w-[90%] w-full
                    ${
                      selectedAnswer
                        ? option === bonneReponse
                          ? "border-green-500"
                          : option === selectedAnswer
                          ? "border-red-500"
                          : "border-white"
                        : "border-white hover:shadow-lg hover:scale-105 active:scale-95"
                    }`}
                  title={option} 
                >
                  {option}
                </button>
              ))}
            </div>

            {message && (
              <p className={`mt-4 text-lg ${message.includes("Bonne") ? "text-green-400" : "text-red-400"}`}>
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
