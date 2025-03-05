import React, { useEffect, useState } from "react";
import FlagDisplay from "../components/FlagDisplay";
import NavigationButtons from "../components/NavigationButtons";
import GameOverScreen from "../components/GameOverScreen";
import useGameStats from "../components/useGameStats";
import { getRandomCountry } from "../services/countryService";

export default function DrapeauJeu() {
  const { score, setScore, vies, setVies, rejouer, retourMenu } = useGameStats("drapeauMode");

  const [drapeau, setDrapeau] = useState(null);
  const [nomPays, setNomPays] = useState("");
  const [options, setOptions] = useState([]);
  const [bonneReponse, setBonneReponse] = useState("");
  const [message, setMessage] = useState("");
  const [userAnswer, setUserAnswer] = useState(""); // Réponse de l'utilisateur
  const [isCorrect, setIsCorrect] = useState(null);

  const chargerNouvelleQuestion = async () => {
    setUserAnswer(""); // Réinitialiser la réponse de l'utilisateur
    setIsCorrect(null);

    const country = await getRandomCountry(); // Charger un pays aléatoire
    if (!country || !country.flag || !country.name) return; // Vérification des données reçues

    setDrapeau(country.flag);
    setNomPays(country.name);
    setBonneReponse(country.name); // Bonne réponse est le nom du pays
    setMessage("");
  };

  useEffect(() => {
    const savedQuestion = localStorage.getItem("drapeauQuestion");
    if (savedQuestion) {
      const parsed = JSON.parse(savedQuestion);
      setDrapeau(parsed.flag);
      setNomPays(parsed.name);
      setBonneReponse(parsed.name);
    } else {
      chargerNouvelleQuestion();
    }
  }, []);
  
  useEffect(() => {
    if (nomPays) {
      localStorage.setItem(
        "drapeauQuestion",
        JSON.stringify({ flag: drapeau, name: nomPays })
        
      );
      console.log(nomPays);
    }
  }, [drapeau, nomPays]);
  
  

  const verifierReponse = () => {
    if (!bonneReponse || !userAnswer) return;

    const correct = userAnswer.trim().toLowerCase() === bonneReponse.trim().toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      setMessage("Bonne réponse !");
      setScore((prevScore) => prevScore + 10);
    } else {
      setMessage("Mauvaise réponse !");
      setVies((prevVies) => prevVies - 1);
    }

    setTimeout(chargerNouvelleQuestion, 1000); // Charger une nouvelle question après un délai
  };

  if (vies <= 0) {
    return <GameOverScreen mode="drapeauMode" onReplay={rejouer} onReturnMenu={retourMenu} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <NavigationButtons />

      <h1 className="text-3xl md:text-4xl font-bold font-pixel mb-6 md:mb-8 neon-text text-center">
        Trouve le drapeau
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
              Quel est le pays de ce drapeau ?
            </p>

            <div className="w-full mb-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && verifierReponse()} // Vérifier la réponse sur Entrée
                className="w-full px-4 py-2 md:px-6 md:py-3 border-2 text-white font-bold rounded-lg transition-all duration-300 text-sm md:text-lg text-center break-words max-w-[90%] w-full border-white hover:shadow-lg hover:scale-105 active:scale-95"
                placeholder="Tapez votre réponse ici"
              />
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
