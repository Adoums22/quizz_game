const API_URL = "https://restcountries.com/v3.1/all?fields=flags,translations,name";

const EXCLUDED_KEYWORDS = ["Île", "Island", "Islands", "Islas", "Isle", "Atoll"];

export async function getRandomCountry() {
  console.log("getRandomCountry() appelée");
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
    console.log("Pays sélectionné :", country);

    // Affichage de la structure complète pour déboguer
    console.log("Structure complète du pays :", country?.translations);

    // Vérification et affichage du nom en français
    console.log("Nom en français :", country?.translations?.fra?.common || "Nom non disponible");
    console.log("Nom en version courante (common) :", country?.name?.common || "Nom non disponible");

    return {
      flag: country?.flags?.png || "",
      name: country?.translations?.fra?.common || country?.name?.common || "Nom inconnu",
      nameOfficial: country?.name?.common || "Nom non disponible"
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
}
