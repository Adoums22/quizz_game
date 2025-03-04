const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,translations";

const EXCLUDED_REGIONS = [
  "Antarctica", "Caribbean", "Polynesia", "Melanesia", "Micronesia", 
  "Central America", "British Overseas Territory", "Dependent Territory"
];

export async function getRandomCapital() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const countries = data.filter(
      (c) => c.capital?.[0] && !EXCLUDED_REGIONS.includes(c.region) && !EXCLUDED_REGIONS.includes(c.subregion)
    );

    if (countries.length === 0) throw new Error("Aucune capitale valide trouvée.");

    const randomCountry = countries[Math.floor(Math.random() * countries.length)];

    return {
      name: randomCountry.translations?.fra?.common || randomCountry.name?.common || "Nom inconnu",
      flag: randomCountry.flags?.png || randomCountry.flags?.svg || undefined,
      capital: randomCountry.capital[0],
      fakeCapitals: getFakeCapitals(countries, randomCountry.capital[0]),
    };
  } catch (error) {
    console.error("Erreur dans getRandomCapital :", error);
    return null;
  }
}

export function getFakeCapitals(countries, correctCapital) {
  const filtered = countries.filter((c) => c.capital?.[0] && c.capital[0] !== correctCapital);
  return shuffleArray(filtered.map((c) => c.capital[0])).slice(0, 3);
}

export function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
