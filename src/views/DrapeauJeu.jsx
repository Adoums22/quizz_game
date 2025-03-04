import React, { useEffect, useState } from "react";
import { getRandomCountry } from "../services/countryService";
import FlagDisplay from "../components/FlagDisplay";

export default function DrapeauJeu() {
  const [drapeau, setDrapeau] = useState(null);
  const [reponse, setReponse] = useState("");
  const [nomPays, setNomPays] = useState("");
  const [message, setMessage] = useState("");

  // Fonction pour charger un nouveau drapeau
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
    chargerNouveauDrapeau(); // Charger un pays au démarrage
  }, []);

  const verifierReponse = () => {
    if (reponse.toLowerCase().trim() === nomPays.toLowerCase()) {
      setMessage("✅ Bonne réponse !");
      setTimeout(chargerNouveauDrapeau, 1000); // Attendre 1s avant de changer de pays
    } else {
      setMessage("❌ Mauvaise réponse, essaye encore !");
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
    <h1 className="text-4xl font-bold font-pixel mb-8 neon-text text-center">
      Trouve le drapeau
    </h1>

    {/* Card recentrée et responsive */}
    <div className="border-4 border-white p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col items-center 
                    w-full max-w-[400px] bg-black bg-opacity-50">

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
            className="p-3 w-full rounded-lg text-black bg-white border focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <button
            onClick={verifierReponse}
            className="w-full px-6 py-3 border-4 border-white text-white font-bold rounded-lg shadow-md 
                      hover:bg-blue-600 transition duration-300"
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
