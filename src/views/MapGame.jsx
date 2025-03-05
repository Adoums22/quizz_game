import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import useGameStats from "../components/useGameStats";
import { useGame } from "../context/GameContext";
import { getRandomCountry } from "../services/countryService";
import NavigationButtons from "../components/NavigationButtons";

export default function MapGame() {
  const { score, setScore, vies, setVies, rejouer, retourMenu } = useGameStats("mapMode");
  const { currentCountry, loadCountry } = useGame();
  
  // Variables d'état pour gérer le jeu
  const [nomPays, setNomPays] = useState("");
  const [nomPaysOfficiel, setNomPaysOfficiel] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentCountryState, setCurrentCountry] = useState(null); // Etat pour stocker le pays actuel

  const chargerNouvelleQuestion = async () => {
    setMessage(""); // Réinitialiser les messages
    setIsCorrect(null); // Réinitialiser la validation de réponse

    const country = await getRandomCountry(); // Charger un pays aléatoire
    if (!country || !country.name) return; // Vérifier que le pays est valide

    setNomPays(country.name); // Définir le nom du pays
    setNomPaysOfficiel(country.nameOfficial);
    setCurrentCountry(country); // Définir le pays actuel
};


  // Charger une question au démarrage (si nécessaire)
  useEffect(() => {
    const savedQuestion = localStorage.getItem("carteQuestion");
    if (savedQuestion) {
      const parsed = JSON.parse(savedQuestion);
      setNomPays(parsed.name);
      setNomPaysOfficiel(parsed.nameOfficial);
      setCurrentCountry(parsed); // Réinitialiser avec la dernière question sauvegardée
    } else {
      chargerNouvelleQuestion(); // Charger une nouvelle question si aucune donnée n'est en local
    }
  }, []);

  useEffect(() => {
    if (currentCountryState) {
      // Sauvegarder le pays actuel dans localStorage uniquement si currentCountryState est défini
      localStorage.setItem(
        "carteQuestion",
        JSON.stringify({
          name: currentCountryState.name, // Sauvegarder le nom du pays à partir de currentCountryState
          nameOfficial: currentCountryState.nameOfficial, // Sauvegarder le nom officiel
        })
      );
    }
  }, [currentCountryState]); // Se déclenche uniquement lorsque currentCountryState change
  

  const handleClick = (geo) => {
    const englishNameFromApi = currentCountryState?.nameOfficial || "Nom non disponible"; // Nom officiel du pays
    const englishNameClicked = geo.properties.name; // Nom du pays cliqué sur la carte
  
    console.log(`Pays cliqué: ${englishNameClicked}, Pays actuel: ${englishNameFromApi}`);
  
    // Vérifie si currentCountryState est bien défini et si le nom officiel correspond
    if (englishNameFromApi !== "Nom non disponible" && englishNameFromApi === englishNameClicked) {
      setMessage("Bonne réponse !");
      setScore((prev) => prev + 10);
      setIsCorrect(true);
    } else {
      setMessage("Mauvaise réponse !");
      setVies((prev) => prev - 1);
      setIsCorrect(false);
    }
  
    setTimeout(() => {
      setIsCorrect(null);
      chargerNouvelleQuestion(); // Charger un nouveau pays après chaque question
    }, 3000);
  };
  

  // Vérification si currentCountry est bien chargé
  if (!currentCountryState) {
    return <div>Chargement de la carte...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <NavigationButtons />
  
      <h1 className="text-3xl md:text-4xl font-bold font-pixel mb-6 md:mb-8 neon-text text-center">
        Trouve {currentCountryState?.name}
      </h1>
  
      <div
        className={`border-4 p-5 md:p-6 mt-6 md:mt-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md md:max-w-lg text-center transition-all duration-300
          ${isCorrect === true ? "border-green-500" : isCorrect === false ? "border-red-500" : "border-white"}
        `}
      >
        <div className="flex justify-between w-full px-4 mb-4">
          <p className="text-white text-base md:text-lg font-bold">Score: {score}</p>
          <p className="text-white text-base md:text-lg font-bold">❤️: {vies}</p>
        </div>
  
        {currentCountryState ? (
          <>
            <p className="text-lg md:text-xl mb-5 md:mb-6 font-semibold">
              Clique sur {currentCountryState?.name} sur la carte
            </p>
  
            <div className="w-full mb-4">
              <ComposableMap>
                <Geographies geography="/features.json">
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleClick(geo)}
                        style={{
                          default: { fill: "#DDD", stroke: "#000", strokeWidth: 0.5 },
                          hover: { fill: "#FF5722" },
                          pressed: { fill: "#4CAF50" },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
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
