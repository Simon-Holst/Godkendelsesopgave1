// Faste byer med koordinater. Bruges både til seed-opgaverne, til by-valget
// i "Opret opgave" (Modul A) og til by-filteret (Modul D), så alle regner ud
// fra de samme punkter. Koordinaterne er bymidten, hvilket er præcist nok til
// et "ca. X km"-filter.
export const CITIES = [
  { name: 'København', lat: 55.6761, lng: 12.5683 },
  { name: 'Aarhus', lat: 56.1629, lng: 10.2039 },
  { name: 'Odense', lat: 55.4038, lng: 10.4024 },
  { name: 'Aalborg', lat: 57.0488, lng: 9.9217 },
];

// Slår en by op på navn. Returnerer undefined, hvis byen ikke findes.
export function findCity(name) {
  return CITIES.find((city) => city.name === name);
}
