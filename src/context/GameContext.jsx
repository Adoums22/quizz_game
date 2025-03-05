import { createContext, useContext, useEffect, useState } from "react";
import { getRandomCountry } from "../services/countryService";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState(() => {
    return JSON.parse(localStorage.getItem("currentCountry")) || null;
  });

  useEffect(() => {
    // Si currentCountry est null au démarrage, appeler loadCountry
    if (!currentCountry) {
      loadCountry(); // Appel immédiat lors du montage du composant
    }
  }, []);  // [] : Cette useEffect s'exécute uniquement lors du montage initial

  useEffect(() => {
    if (currentCountry) {
      localStorage.setItem("currentCountry", JSON.stringify(currentCountry));
    }
  }, [currentCountry]);

  const loadCountry = async () => {
    if (!currentCountry) {
      const country = await getRandomCountry();
      setCurrentCountry(country);  // Mettre à jour currentCountry
    }
  };

  return (
    <GameContext.Provider value={{ currentCountry, loadCountry }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
