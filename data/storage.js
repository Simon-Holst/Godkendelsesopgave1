import AsyncStorage from '@react-native-async-storage/async-storage';
import { TASKS } from './const';
import { DEFAULT_FILTER } from './constants';

// Tynde hjælpere omkring AsyncStorage. AsyncStorage gemmer kun tekst, så alt
// gemmes som JSON. Nøglerne har et fælles præfiks, så vores data ikke kan
// forveksles med andre pakkers data på telefonen.
export const KEYS = {
  tasks: '@studiegig/tasks',
  applications: '@studiegig/applications',
  role: '@studiegig/role',
  filter: '@studiegig/filter',
};

// Læser og parser en nøgle. Hvis der intet er gemt, eller hvis data er
// korrupte (fx ugyldig JSON), returneres fallback i stedet for at crashe appen.
async function readJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Kunne ikke læse ${key}, bruger standardværdi`, error);
    return fallback;
  }
}

async function writeJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // En fejlet skrivning må ikke vælte appen; brugeren kan stadig bruge den,
    // data bliver bare ikke husket til næste gang.
    console.warn(`Kunne ikke gemme ${key}`, error);
  }
}

// Opgaver: første gang (eller hvis data er ødelagt) seedes med mock-opgaverne
// fra const.js. Derefter er det AsyncStorage, der er "sandheden".
export async function loadTasks() {
  const tasks = await readJSON(KEYS.tasks, null);
  if (!Array.isArray(tasks)) {
    await writeJSON(KEYS.tasks, TASKS);
    return TASKS;
  }
  return tasks;
}

export async function loadApplications() {
  const applications = await readJSON(KEYS.applications, []);
  return Array.isArray(applications) ? applications : [];
}

// Rollen kan kun være én af to værdier; alt andet behandles som studerende.
export async function loadRole() {
  const role = await readJSON(KEYS.role, 'student');
  return role === 'virksomhed' ? 'virksomhed' : 'student';
}

// Gemte felter lægges oven på standardfilteret, så et filter gemt af en ældre
// version af appen (med færre felter) stadig virker.
export async function loadFilter() {
  const filter = await readJSON(KEYS.filter, null);
  if (filter == null || typeof filter !== 'object') return DEFAULT_FILTER;
  return { ...DEFAULT_FILTER, ...filter };
}

export const saveTasks = (tasks) => writeJSON(KEYS.tasks, tasks);
export const saveApplications = (applications) => writeJSON(KEYS.applications, applications);
export const saveRole = (role) => writeJSON(KEYS.role, role);
export const saveFilter = (filter) => writeJSON(KEYS.filter, filter);
