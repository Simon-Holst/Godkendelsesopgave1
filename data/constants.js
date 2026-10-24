// Forretningskonstanter for meritZ, samlet ét sted så de er lette at ændre.

// Platformens gebyr som andel af lønnen (10 %). Det er en HYPOTESE, ikke en
// endelig pris: vi tester i interviews med virksomheder, om de accepterer et
// gebyr i den størrelse, når det vises gennemsigtigt i prisoverslaget.
export const PLATFORM_FEE_RATE = 0.1;

// Mock-virksomheden, man "er", når rollen er sat til virksomhed. Der er intet
// login, så virksomheden ejer simpelthen de opgaver, hvor company === COMPANY.name.
export const COMPANY = { name: 'Café Nomad' };

// Standardfilter: vis alle opgaver i hele landet, inkl. online-opgaver. Vi
// starter bredt, fordi den største bekymring i surveyet var for få opgaver
// (kold start), og et snævert filter ville gøre listen endnu tommere.
export const DEFAULT_FILTER = {
  mode: 'all', // 'all' | 'city' | 'gps'
  city: null, // bynavn fra CITIES, når mode === 'city'
  coords: null, // { lat, lng } fra GPS, når mode === 'gps'
  radiusKm: 25,
  includeRemote: true,
};
