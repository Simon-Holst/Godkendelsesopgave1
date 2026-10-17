import { useState } from 'react';
import { View, Text, TextInput, Switch, ScrollView, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { CITIES } from '../data/cities';
import { COMPANY, PLATFORM_FEE_RATE } from '../data/constants';
import { formatKr } from '../utils/format';
import { COLORS, GlobalStyle } from '../styles/GlobalStyle';
import { OpretOpgaveStyle as styles } from '../styles/OpretOpgaveStyle';
import PrimaryButton from '../components/PrimaryButton';
import Chip from '../components/Chip';

const KATEGORIER = ['Marketing', 'Dataanalyse', 'IT', 'Admin'];

// Tom formular. Kategori og by har en standardværdi, så virksomheden kun
// SKAL udfylde titel, timer og timeløn (feedback: oprettelse skal være simpel).
const TOM_FORMULAR = {
  titel: '',
  beskrivelse: '',
  kategori: 'Marketing',
  timer: '',
  timeloen: '',
  by: CITIES[0].name,
  remote: false,
};

// Tekstfelter giver altid tekst. Vi accepterer dansk komma (fx "7,5") og
// returnerer 0 ved ugyldig tekst, så prisoverslaget aldrig viser NaN.
function tilTal(tekst) {
  const tal = parseFloat(tekst.replace(',', '.'));
  return Number.isFinite(tal) ? tal : 0;
}

export default function OpretOpgaveScreen() {
  const { addTask } = useApp();
  const [form, setForm] = useState(TOM_FORMULAR);

  // Opdaterer ét felt ad gangen og beholder resten af formularen.
  function opdater(felt, vaerdi) {
    setForm((prev) => ({ ...prev, [felt]: vaerdi }));
  }

  // Live prisoverslag: beregnes ved hver indtastning, så virksomheden kan se
  // præcis hvad opgaven koster, inden den oprettes (feedback: gennemsigtig pris).
  const timer = tilTal(form.timer);
  const timeloen = tilTal(form.timeloen);
  const loen = timer * timeloen;
  const gebyr = loen * PLATFORM_FEE_RATE;
  const total = loen + gebyr;

  function opretOpgave() {
    if (form.titel.trim() === '') {
      Alert.alert('Mangler titel', 'Giv opgaven en kort titel.');
      return;
    }
    if (timer <= 0 || timeloen <= 0) {
      Alert.alert('Ugyldige tal', 'Timer og timeløn skal være større end 0.');
      return;
    }

    // Opgaven får byens koordinater, så den kan findes med lokationsfilteret.
    const by = CITIES.find((city) => city.name === form.by);
    addTask({
      company: COMPANY.name,
      title: form.titel.trim(),
      category: form.kategori,
      description: form.beskrivelse.trim() || 'Ingen beskrivelse.',
      estimatedHours: timer,
      hourlyRate: timeloen,
      location: by.name,
      lat: by.lat,
      lng: by.lng,
      remote: form.remote,
    });

    Alert.alert('Opgaven er oprettet', 'Studerende kan nu se og ansøge om opgaven.');
    setForm(TOM_FORMULAR);
  }

  return (
    <ScrollView
      style={GlobalStyle.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
    >
      <Text style={styles.intro}>Opret en opgave på under et minut.</Text>

      <Text style={styles.label}>Titel</Text>
      <TextInput
        style={styles.input}
        value={form.titel}
        onChangeText={(tekst) => opdater('titel', tekst)}
        placeholder="Fx Opdater vores hjemmeside"
        placeholderTextColor={COLORS.muted}
      />

      <Text style={styles.label}>Beskrivelse</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={form.beskrivelse}
        onChangeText={(tekst) => opdater('beskrivelse', tekst)}
        placeholder="Hvad skal den studerende lave?"
        placeholderTextColor={COLORS.muted}
        multiline
      />

      <Text style={styles.label}>Kategori</Text>
      <View style={GlobalStyle.chipRow}>
        {KATEGORIER.map((kategori) => (
          <Chip
            key={kategori}
            label={kategori}
            selected={form.kategori === kategori}
            onPress={() => opdater('kategori', kategori)}
          />
        ))}
      </View>

      <View style={styles.numberRow}>
        <View style={styles.numberColumn}>
          <Text style={styles.label}>Estimeret timer</Text>
          <TextInput
            style={styles.input}
            value={form.timer}
            onChangeText={(tekst) => opdater('timer', tekst)}
            placeholder="Fx 5"
            placeholderTextColor={COLORS.muted}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.numberColumn}>
          <Text style={styles.label}>Timeløn (kr)</Text>
          <TextInput
            style={styles.input}
            value={form.timeloen}
            onChangeText={(tekst) => opdater('timeloen', tekst)}
            placeholder="Fx 160"
            placeholderTextColor={COLORS.muted}
            keyboardType="number-pad"
          />
        </View>
      </View>

      <Text style={styles.label}>By</Text>
      <View style={GlobalStyle.chipRow}>
        {CITIES.map((city) => (
          <Chip
            key={city.name}
            label={city.name}
            selected={form.by === city.name}
            onPress={() => opdater('by', city.name)}
          />
        ))}
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Kan løses online</Text>
        <Switch
          value={form.remote}
          onValueChange={(vaerdi) => opdater('remote', vaerdi)}
          trackColor={{ true: COLORS.primary }}
        />
      </View>

      {/* Prisoverslag: gebyret står som sin egen linje, så intet er skjult */}
      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>Prisoverslag</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            Løn til studerende ({timer} t × {formatKr(timeloen)})
          </Text>
          <Text style={styles.priceValue}>{formatKr(loen)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            Platformsgebyr ({Math.round(PLATFORM_FEE_RATE * 100)} %)
          </Text>
          <Text style={styles.priceValue}>{formatKr(gebyr)}</Text>
        </View>
        <View style={styles.priceDivider} />
        <View style={styles.priceRow}>
          <Text style={styles.priceTotalLabel}>Total for virksomheden</Text>
          <Text style={styles.priceTotalValue}>{formatKr(total)}</Text>
        </View>
        <Text style={styles.priceNote}>
          Prisen er et overslag ud fra de estimerede timer.
        </Text>
      </View>

      <View style={styles.buttons}>
        <PrimaryButton title="Opret opgave" onPress={opretOpgave} />
        <PrimaryButton
          title="Ryd formular"
          variant="secondary"
          onPress={() => setForm(TOM_FORMULAR)}
        />
      </View>
    </ScrollView>
  );
}
