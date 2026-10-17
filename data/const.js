import { findCity } from './cities';

// Koordinater for en by, så seed-opgaverne bruger præcis de samme punkter som
// filteret. Hver opgave får lat/lng fra sin by.
function coordsFor(cityName) {
  const city = findCity(cityName);
  return { lat: city.lat, lng: city.lng };
}

// Seed-opgaver: de bruges kun første gang appen åbnes. Derefter ligger opgaverne
// i AsyncStorage (se data/storage.js), så nye opgaver fra virksomheder og
// statusændringer huskes, efter appen er lukket.
// remote: true betyder, at opgaven kan løses online, så den kan vises uanset
// hvor den studerende bor (vigtigt for lokationsfilteret).
export const TASKS = [
  {
    id: '1',
    company: 'Café Nomad',
    title: 'Opdater Instagram-feed for en uge',
    category: 'Marketing',
    description:
      'Vi mangler en, der kan planlægge og poste opslag på Instagram i en uge, mens vores medarbejder er syg. Du får adgang til billedmateriale og skal blot planlægge og poste 5 opslag.',
    estimatedHours: 5,
    hourlyRate: 150,
    location: 'København',
    ...coordsFor('København'),
    remote: true,
    status: 'åben',
    createdAt: '2026-10-01T09:00:00.000Z',
  },
  {
    id: '2',
    company: 'Nordic Fitness',
    title: 'Analyse af medlemsdata i Excel',
    category: 'Dataanalyse',
    description:
      'Vi har et regneark med 12 måneders medlemsdata og mangler nogen til at lave simple grafer og finde ud af, hvornår flest medlemmer melder sig ud.',
    estimatedHours: 8,
    hourlyRate: 180,
    location: 'Aarhus',
    ...coordsFor('Aarhus'),
    remote: true,
    status: 'åben',
    createdAt: '2026-10-02T09:00:00.000Z',
  },
  {
    id: '3',
    company: 'ByggeTeam ApS',
    title: 'Opsætning af ny printer og netværk på kontoret',
    category: 'IT',
    description:
      'Vores kontor har fået to nye printere, som skal sættes op og forbindes til det trådløse netværk. Du skal også lave en kort guide til medarbejderne.',
    estimatedHours: 3,
    hourlyRate: 200,
    location: 'Odense',
    ...coordsFor('Odense'),
    remote: false,
    status: 'åben',
    createdAt: '2026-10-03T09:00:00.000Z',
  },
  {
    id: '4',
    company: 'Grøn Vækst A/S',
    title: 'Indtastning og oprydning af kundeliste',
    category: 'Admin',
    description:
      'Vi har en kundeliste med dubletter og manglende oplysninger, som skal ryddes op i og indtastes korrekt i vores CRM-system.',
    estimatedHours: 6,
    hourlyRate: 140,
    location: 'København',
    ...coordsFor('København'),
    remote: false,
    status: 'åben',
    createdAt: '2026-10-04T09:00:00.000Z',
  },
  {
    id: '5',
    company: 'Studenterhuset',
    title: 'Design af plakat til fredagsbar',
    category: 'Marketing',
    description:
      'Vi mangler en fængende plakat til vores månedlige fredagsbar. Du får frie hænder til designet, men skal bruge vores logo og farver.',
    estimatedHours: 4,
    hourlyRate: 160,
    location: 'Aalborg',
    ...coordsFor('Aalborg'),
    remote: false,
    status: 'åben',
    createdAt: '2026-10-05T09:00:00.000Z',
  },
  {
    id: '6',
    company: 'DataSyn ApS',
    title: 'Test af ny app inden lancering',
    category: 'IT',
    description:
      'Vi skal have testet vores nye mobilapp grundigt inden lancering. Du skal gennemgå en testliste og rapportere fejl, du finder.',
    estimatedHours: 5,
    hourlyRate: 175,
    location: 'København',
    ...coordsFor('København'),
    remote: false,
    status: 'åben',
    createdAt: '2026-10-06T09:00:00.000Z',
  },
  {
    id: '7',
    company: 'Café Nomad',
    title: 'Kundetilfredshedsundersøgelse',
    category: 'Dataanalyse',
    description:
      'Vi vil gerne have lavet en kort spørgeskemaundersøgelse blandt vores gæster og have resultaterne samlet i et overskueligt overblik.',
    estimatedHours: 6,
    hourlyRate: 155,
    location: 'København',
    ...coordsFor('København'),
    remote: true,
    status: 'åben',
    createdAt: '2026-10-07T09:00:00.000Z',
  },
];

// Mock-profil for den studerende, vist på ProfilScreen.
export const PROFILE = {
  name: 'Simon Holst',
  education: 'HA(it.) på CBS, 5. semester',
  bio: 'Studerende med interesse for teknologi, data og marketing. Bruger StudieGig til at få praktisk erfaring ved siden af studiet.',
  skills: ['Marketing', 'Dataanalyse', 'IT-support', 'Excel', 'Sociale medier'],
};
