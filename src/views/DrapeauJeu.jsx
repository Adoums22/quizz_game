import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getRandomCountry } from "../services/countryService";
import FlagDisplay from "../components/FlagDisplay";
import NavigationButtons from "../components/NavigationButtons";
import GameOverScreen from "../components/GameOverScreen";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function DrapeauJeu() {
  const navigate = useNavigate();
  const [score, setScore] = useState(() => {
    const savedScore = Cookies.get("score");
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  useEffect(() => {
    Cookies.set("score", score, { expires: 7 });
  }, [score]);

  const [heart, setHeart] = useState(() => {
    const savedHeart = Cookies.get("vies");
    return savedHeart ? parseInt(savedHeart, 10) : 3;
  });

  useEffect(() => {
    Cookies.set("vies", heart, { expires: 7 });
  }, [heart]);

  const [drapeau, setDrapeau] = useState(null);
  const [reponse, setReponse] = useState("");
  const [nomPays, setNomPays] = useState("");
  const [message, setMessage] = useState("");

  const chargerNouveauDrapeau = async () => {
    const country = await getRandomCountry();
    if (country) {
      setDrapeau(country.flag);
      setNomPays(country.name);
      setMessage("");
      setReponse("");
    }
  };

  useEffect(() => {
    chargerNouveauDrapeau();
  }, []);

  const verifierReponse = () => {
    if (reponse.toLowerCase().trim() === nomPays.toLowerCase()) {
      setMessage("✅ Bonne réponse !");
      setScore((prevScore) => prevScore + 10);
      setTimeout(chargerNouveauDrapeau, 1000);
    } else {
      setMessage("❌ Mauvaise réponse !");
      setHeart((prevHeart) => prevHeart - 1);
      setTimeout(chargerNouveauDrapeau, 500);
    }
  };

  const rejouer = () => {
    setScore(0);
    setHeart(3);
    chargerNouveauDrapeau();
  };
  
  const retourMenu = () => {
    Cookies.remove("score");
    Cookies.remove("vies");
    window.location.href = "/";
  };

  if (heart <= 0) {
    return <GameOverScreen score={score} onReplay={rejouer} onReturnMenu={retourMenu} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <NavigationButtons/>
      <h1 className="text-4xl font-bold font-pixel mb-8 neon-text text-center">
        Trouve le drapeau
      </h1>

      <div className="border-4 border-white p-8 mt-8 rounded-2xl shadow-xl flex flex-col items-center 
                      w-full max-w-[400px] shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]">
        <div className="flex justify-between w-full p-4">
          <p className="text-white text-lg font-bold">Score:{score}</p>
          <p className="text-white text-lg font-bold">❤️:{heart} </p>
        </div>

        {drapeau ? (
          <>
            <div className="w-full flex justify-center mb-6">
              <FlagDisplay flag={drapeau} className="rounded-lg shadow-lg w-full max-h-48 object-cover" />
            </div>

            <input
              type="text"
              placeholder="Nom du pays"
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
              className="p-3 w-full rounded-lg text-black bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 shadow-2xl"
            />

            <button
              onClick={verifierReponse}
              className="w-full px-6 py-3 border-4 border-white text-white font-bold rounded-lg shadow-md 
                        hover:bg-blue-600 transition duration-300 shadow-2xl shadow-white w-auto min-w-[150px] max-w-[300px]"
            >
              Vérifier
            </button>

            {message && <p className="mt-3 text-lg text-center">{message}</p>}
          </>
        ) : (
          <p className="text-lg">Chargement...</p>
        )}
      </div>
    </div>
  );
}
