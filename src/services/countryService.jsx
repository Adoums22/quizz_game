const API_URL = "https://restcountries.com/v3.1/all?fields=flags,translations";

const EXCLUDED_KEYWORDS = ["Île", "Island", "Islands", "Islas", "Isle", "Atoll"];

export async function getRandomCountry() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Problème avec l'API");

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("Données invalides");

    const filteredCountries = data.filter(country => {
      const countryName = country?.translations?.fra?.common || "";
      return !EXCLUDED_KEYWORDS.some(keyword => countryName.includes(keyword));
    });

    if (filteredCountries.length === 0) throw new Error("Aucun pays valide trouvé après filtrage");

    const country = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];

    return {
      flag: country?.flags?.png || "",
      name: country?.translations?.fra?.common || "Nom inconnu"
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
}
