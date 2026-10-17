import { useMemo, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useApp } from '../context/AppContext';
import { COMPANY } from '../data/constants';
import { GlobalStyle } from '../styles/GlobalStyle';
import { MineOpgaverStyle as styles } from '../styles/MineOpgaverStyle';
import PrimaryButton from '../components/PrimaryButton';

// Tekst til hver ansøgningsstatus set fra virksomhedens side.
const ANSOEGER_STATUS = {
  afventer: 'Afventer dit svar',
  accepteret: 'Accepteret',
  afvist: 'Afvist',
};

export default function MineOpgaverScreen({ navigation }) {
  const { tasks, applications, setApplicationStatus } = useApp();
  // Id på den opgave, hvis ansøgerliste er foldet ud (kun én ad gangen, så
  // listen ikke bliver uoverskuelig).
  const [udfoldetId, setUdfoldetId] = useState(null);

  // Virksomheden "ejer" de opgaver, hvor company matcher mock-virksomheden.
  const mineOpgaver = useMemo(
    () => tasks.filter((task) => task.company === COMPANY.name),
    [tasks]
  );

  // Ansøgere pr. opgave, ældste først (først-til-mølle er mest fair at vise).
  function ansoegereTil(taskId) {
    return applications
      .filter((app) => app.taskId === taskId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  function renderOpgave({ item }) {
    const ansoegere = ansoegereTil(item.id);
    const erUdfoldet = udfoldetId === item.id;
    const erTildelt = item.status === 'tildelt';
    const valgt = ansoegere.find((app) => app.status === 'accepteret');

    return (
      // Hele kortet er trykbart, så det er let at folde ansøgerne ud/ind.
      <Pressable
        style={styles.card}
        onPress={() => setUdfoldetId(erUdfoldet ? null : item.id)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={[styles.badge, erTildelt ? styles.badgeAssigned : styles.badgeOpen]}>
            <Text
              style={[
                styles.badgeText,
                erTildelt ? styles.badgeTextAssigned : styles.badgeTextOpen,
              ]}
            >
              {erTildelt ? 'Tildelt' : 'Åben'}
            </Text>
          </View>
        </View>

        <Text style={styles.meta}>
          {item.location} · {item.hourlyRate} kr/t · {ansoegere.length}{' '}
          {ansoegere.length === 1 ? 'ansøger' : 'ansøgere'}
        </Text>

        {erTildelt && valgt && (
          <View style={styles.assignedBanner}>
            <Text style={styles.assignedBannerText}>Tildelt til {valgt.studentName}</Text>
          </View>
        )}

        <Text style={styles.toggleHint}>
          {erUdfoldet ? 'Skjul ansøgere ▲' : 'Se ansøgere ▼'}
        </Text>

        {erUdfoldet && (
          <View style={styles.applicants}>
            {ansoegere.length === 0 && (
              <Text style={styles.noApplicants}>Ingen ansøgere endnu.</Text>
            )}
            {ansoegere.map((app) => (
              <View key={app.id} style={styles.applicantRow}>
                <Text style={styles.applicantName}>{app.studentName}</Text>
                <Text
                  style={[
                    styles.applicantStatus,
                    app.status === 'accepteret' && styles.applicantAccepted,
                    app.status === 'afvist' && styles.applicantRejected,
                  ]}
                >
                  {ANSOEGER_STATUS[app.status]}
                </Text>

                {/* Knapperne vises kun, så længe der kan træffes et valg. Når én
                    accepteres, afviser context automatisk de øvrige ansøgere. */}
                {app.status === 'afventer' && !erTildelt && (
                  <View style={styles.applicantButtons}>
                    <View style={styles.applicantButton}>
                      <PrimaryButton
                        title="Acceptér"
                        onPress={() => setApplicationStatus(app.id, 'accepteret')}
                      />
                    </View>
                    <View style={styles.applicantButton}>
                      <PrimaryButton
                        title="Afvis"
                        variant="secondary"
                        onPress={() => setApplicationStatus(app.id, 'afvist')}
                      />
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <View style={GlobalStyle.container}>
      <FlatList
        data={mineOpgaver}
        keyExtractor={(item) => item.id}
        renderItem={renderOpgave}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Ingen opgaver endnu</Text>
            <Text style={styles.emptyText}>
              Opret din første opgave under fanen "Opret opgave", så kan studerende ansøge.
            </Text>
            <View style={styles.emptyButton}>
              <PrimaryButton
                title="Opret opgave"
                onPress={() => navigation.navigate('Opret opgave')}
              />
            </View>
          </View>
        }
      />
    </View>
  );
}
