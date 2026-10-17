import { createContext, useContext, useEffect, useState } from 'react';
import { TASKS, APPLICATIONS, PROFILE } from '../data/const';
import { DEFAULT_FILTER } from '../data/constants';
import {
  loadTasks,
  loadApplications,
  loadRole,
  loadFilter,
  saveTasks,
  saveApplications,
  saveRole,
  saveFilter,
} from '../data/storage';

// Fælles app-state. Den deles via React Context, så alle screens (også dem i
// forskellige faner) ser de samme opgaver og ansøgninger, uden at vi skal sende
// data rundt som navigations-parametre.
const AppContext = createContext(null);

// Simpelt unikt id. Der er ingen server, der kan uddele id'er, så tid + et
// tilfældigt suffiks er nok til at undgå sammenfald på én telefon.
function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState('student');
  const [tasks, setTasks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  // Hent alt fra AsyncStorage én gang ved opstart. Indtil det er sket, er
  // ready false, og App.js viser et loading-view.
  useEffect(() => {
    async function load() {
      const [savedTasks, savedApplications, savedRole, savedFilter] = await Promise.all([
        loadTasks(),
        loadApplications(),
        loadRole(),
        loadFilter(),
      ]);
      setTasks(savedTasks);
      setApplications(savedApplications);
      setRole(savedRole);
      setFilter(savedFilter);
      setReady(true);
    }
    load();
  }, []);

  // Gem automatisk hver gang en del af state ændrer sig. Vi venter på ready,
  // så de tomme startværdier ikke overskriver de gemte data, før de er hentet.
  useEffect(() => {
    if (ready) saveTasks(tasks);
  }, [ready, tasks]);
  useEffect(() => {
    if (ready) saveApplications(applications);
  }, [ready, applications]);
  useEffect(() => {
    if (ready) saveRole(role);
  }, [ready, role]);
  useEffect(() => {
    if (ready) saveFilter(filter);
  }, [ready, filter]);

  // Virksomheden opretter en opgave. id, oprettelsestid og status sættes her,
  // så formularen (Modul A) kun skal sende selve indholdet.
  function addTask(taskData) {
    const task = {
      ...taskData,
      id: makeId(),
      status: 'åben',
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
    return task;
  }

  // Den studerende ansøger. Der er ingen login, så navnet tages fra profilen.
  // Man kan kun have én ansøgning pr. opgave (andre studerende kan godt også ansøge).
  function applyToTask(taskId) {
    setApplications((prev) => {
      if (prev.some((app) => app.taskId === taskId && app.studentName === PROFILE.name)) {
        return prev;
      }
      const application = {
        id: makeId(),
        taskId,
        studentName: PROFILE.name,
        status: 'afventer',
        createdAt: new Date().toISOString(),
      };
      return [...prev, application];
    });
  }

  // Virksomheden accepterer/afviser en ansøger. En opgave kan kun løses af én
  // studerende, så når én accepteres, bliver opgaven 'tildelt', og de øvrige
  // ansøgere på samme opgave afvises automatisk.
  function setApplicationStatus(appId, status) {
    const target = applications.find((app) => app.id === appId);
    if (!target) return;

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) return { ...app, status };
        if (status === 'accepteret' && app.taskId === target.taskId) {
          return { ...app, status: 'afvist' };
        }
        return app;
      })
    );

    if (status === 'accepteret') {
      setTasks((prev) =>
        prev.map((task) => (task.id === target.taskId ? { ...task, status: 'tildelt' } : task))
      );
    }
  }

  // Den studerende trækker sin ansøgning tilbage; den fjernes helt, så man
  // kan ansøge igen senere.
  function withdrawApplication(appId) {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  }

  // Sætter opgaver, ansøgninger og filter tilbage til seed-data, fx før en
  // demovideo. Rollen beholdes, så man bliver på samme side af appen.
  function resetDemoData() {
    setTasks(TASKS);
    setApplications(APPLICATIONS);
    setFilter(DEFAULT_FILTER);
  }

  const value = {
    ready,
    role,
    setRole,
    tasks,
    addTask,
    applications,
    applyToTask,
    setApplicationStatus,
    withdrawApplication,
    filter,
    setFilter,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook som alle screens bruger: const { tasks, addTask } = useApp();
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp skal bruges inden i <AppProvider>');
  }
  return context;
}
