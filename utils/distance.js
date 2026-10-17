// Afstand i km mellem to punkter på jorden (haversine-formlen). Vi regner
// "i fugleflugt", hvilket er godt nok til et "ca. X km"-filter og ikke
// kræver et kort- eller rute-API.
const JORDENS_RADIUS_KM = 6371;

function tilRadianer(grader) {
  return (grader * Math.PI) / 180;
}

export function distanceKm(fra, til) {
  const dLat = tilRadianer(til.lat - fra.lat);
  const dLng = tilRadianer(til.lng - fra.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(tilRadianer(fra.lat)) * Math.cos(tilRadianer(til.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * JORDENS_RADIUS_KM * Math.asin(Math.sqrt(a));
}
