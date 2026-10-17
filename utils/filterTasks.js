import { findCity } from '../data/cities';
import { distanceKm } from './distance';

// Udgangspunktet for afstandsberegningen: den valgte by eller telefonens
// GPS-placering. null betyder "ingen placering", og så filtreres der ikke.
function findUdgangspunkt(filter) {
  if (filter.mode === 'city') {
    const city = findCity(filter.city);
    return city ? { lat: city.lat, lng: city.lng } : null;
  }
  if (filter.mode === 'gps' && filter.coords) {
    return filter.coords;
  }
  return null;
}

// Filtrerer opgaver efter lokation:
// - "Hele landet" (eller ukendt placering): alle opgaver, uændret rækkefølge.
// - Ellers: kun opgaver inden for radius, plus online-opgaver hvis includeRemote.
//   Hver opgave får distanceKm, og listen sorteres med nærmeste først.
// Online-opgaver medtages som standard, fordi et snævert filter ellers kan
// give en næsten tom liste (kold start-problemet fra surveyet).
export function filterTasks(tasks, filter) {
  const udgangspunkt = findUdgangspunkt(filter);
  if (!udgangspunkt) return tasks;

  return tasks
    .map((task) => ({
      ...task,
      // Opgaver uden koordinater får ingen afstand og kan kun vises som online-opgaver.
      distanceKm: task.lat != null && task.lng != null ? distanceKm(udgangspunkt, task) : null,
    }))
    .filter((task) => {
      if (task.remote && filter.includeRemote) return true;
      return task.distanceKm != null && task.distanceKm <= filter.radiusKm;
    })
    .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
}
