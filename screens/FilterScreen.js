import { useMemo, useState } from 'react';
import { View, Text, Switch, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/cities';
import { filterTasks } from '../utils/filterTasks';
import { COLORS, GlobalStyle } from '../styles/GlobalStyle';
import { FilterStyle as styles } from '../styles/FilterStyle';
import PrimaryButton from '../components/PrimaryButton';
import Chip from '../components/Chip';

const TILSTANDE = [
  { mode: 'all', label: 'Hele landet' },
  { mode: 'city', label: 'By + radius' },
  { mode: 'gps', label: 'Min placering (GPS)' },
];
const RADIUSER = [10, 25, 50];
// Under dette antal opgaver foreslår vi at udvide radius (kold start).
const FAA_OPGAVER = 3;

export default function FilterScreen({ navigation }) {
  const { tasks, filter, setFilter } = useApp();

  // Kladde af filteret. Ændringer gemmes først, når man trykker "Anvend
  // filter", så man kan eksperimentere uden at ændre opgavelisten undervejs.
  const [kladde, setKladde] = useState({ ...filter, city: filter.city ?? CITIES[0].name });
  const [henterGps, setHenterGps] = useState(false);
  const [gpsFejl, setGpsFejl] = useState(null);

  function opdater(aendringer) {
    setKladde((prev) => ({ ...prev, ...aendringer }));
  }

  // Live-forhåndsvisning: samme filterfunktion som Opgavelisten, så tallet
  // passer præcis med det, man ser bagefter.
  const antalMatch = useMemo(
    () =>
      filterTasks(
        tasks.filter((task) => task.status === 'åben'),
        kladde
      ).length,
    [tasks, kladde]
  );

  // Henter telefonens placering. Brugeren skal give tilladelse først; afviser
  // de, falder vi tilbage til manuelt by-valg i stedet for at blokere filteret.
  async function brugMinPlacering() {
    setGpsFejl(null);
    setHenterGps(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setGpsFejl(
          'Du har ikke givet adgang til din placering. Det er helt i orden: vælg i stedet en by herunder.'
        );
        opdater({ mode: 'city' });
        return;
      }
      // "Balanced" er hurtigere og bruger mindre strøm end højeste præcision,
      // og vi skal kun bruge placeringen til at regne afstande i km.
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      opdater({
        mode: 'gps',
        coords: { lat: position.coords.latitude, lng: position.coords.longitude },
      });
    } catch (error) {
      setGpsFejl('Vi kunne ikke finde din placering. Vælg i stedet en by herunder.');
      opdater({ mode: 'city' });
    } finally {
      setHenterGps(false);
    }
  }

  function anvendFilter() {
    setFilter(kladde);
    navigation.goBack();
  }

  const visRadius = kladde.mode !== 'all';
  // GPS-tilstand uden placering kan ikke anvendes; brugeren skal hente den først.
  const manglerGps = kladde.mode === 'gps' && !kladde.coords;

  return (
    <ScrollView style={GlobalStyle.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Hvor vil du arbejde?</Text>
      <View style={GlobalStyle.chipRow}>
        {TILSTANDE.map((tilstand) => (
          <Chip
            key={tilstand.mode}
            label={tilstand.label}
            selected={kladde.mode === tilstand.mode}
            onPress={() => opdater({ mode: tilstand.mode })}
          />
        ))}
      </View>

      {kladde.mode === 'city' && (
        <View style={styles.section}>
          <Text style={styles.label}>By</Text>
          <View style={GlobalStyle.chipRow}>
            {CITIES.map((city) => (
              <Chip
                key={city.name}
                label={city.name}
                selected={kladde.city === city.name}
                onPress={() => opdater({ city: city.name })}
              />
            ))}
          </View>
        </View>
      )}

      {kladde.mode === 'gps' && (
        <View style={styles.section}>
          <Text style={styles.label}>Placering</Text>
          <PrimaryButton
            title={kladde.coords ? 'Opdater min placering' : 'Brug min placering'}
            variant="secondary"
            onPress={brugMinPlacering}
            disabled={henterGps}
          />
          {henterGps && <ActivityIndicator style={{ marginTop: 10 }} color={COLORS.primary} />}
          {kladde.coords && !henterGps && (
            <Text style={styles.gpsStatus}>Placering fundet ✓</Text>
          )}
        </View>
      )}

      {gpsFejl && <Text style={styles.gpsError}>{gpsFejl}</Text>}

      {visRadius && (
        <View style={styles.section}>
          <Text style={styles.label}>Radius</Text>
          <View style={GlobalStyle.chipRow}>
            {RADIUSER.map((km) => (
              <Chip
                key={km}
                label={`${km} km`}
                selected={kladde.radiusKm === km}
                onPress={() => opdater({ radiusKm: km })}
              />
            ))}
          </View>
        </View>
      )}

      <View style={styles.switchRow}>
        <View style={styles.switchTextWrap}>
          <Text style={styles.switchLabel}>Medtag online-opgaver</Text>
          <Text style={styles.switchHint}>Opgaver der kan løses hjemmefra, vises altid</Text>
        </View>
        <Switch
          value={kladde.includeRemote}
          onValueChange={(vaerdi) => opdater({ includeRemote: vaerdi })}
          trackColor={{ true: COLORS.primary }}
        />
      </View>

      {/* Viser konsekvensen af filteret, før det anvendes, så man ikke ender
          med en tom liste uden at vide hvorfor */}
      <View style={styles.previewCard}>
        <Text style={styles.previewCount}>
          {manglerGps
            ? 'Tryk "Brug min placering"'
            : `${antalMatch} ${antalMatch === 1 ? 'opgave matcher' : 'opgaver matcher'}`}
        </Text>
        {!manglerGps && visRadius && antalMatch < FAA_OPGAVER && (
          <View style={styles.previewTip}>
            <Text style={styles.previewTipText}>Udvid radius for at se flere opgaver</Text>
          </View>
        )}
      </View>

      <View style={styles.buttons}>
        <PrimaryButton title="Anvend filter" onPress={anvendFilter} disabled={manglerGps} />
      </View>
    </ScrollView>
  );
}
