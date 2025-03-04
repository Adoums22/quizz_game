import { createContext, useContext, useEffect, useState } from "react";
import { getRandomCountry } from "../services/countryService";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentCountry, setCurrentCountry] = useState(() => {
    return JSON.parse(localStorage.getItem("currentCountry")) || null;
  });

  useEffect(() => {
    if (currentCountry) {
      localStorage.setItem("currentCountry", JSON.stringify(currentCountry));
    }
  }, [currentCountry]);

  const loadCountry = async () => {
    if (!currentCountry) {
      const country = await getRandomCountry();
      setCurrentCountry(country);
    }
  };

  return (
    <GameContext.Provider value={{ currentCountry, loadCountry }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
