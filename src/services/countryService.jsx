const API_URL = "https://restcountries.com/v3.1/all?fields=flags,translations";

export async function getRandomCountry() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Problème avec l'API");

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("Données invalides");

    const country = data[Math.floor(Math.random() * data.length)];
    
    return {
      flag: country?.flags?.png || "",
      name: country?.translations?.fra?.common || "Nom inconnu"
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
}
