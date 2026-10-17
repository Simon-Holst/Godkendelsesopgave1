import { useMemo } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { useApp } from '../context/AppContext';
import { PROFILE } from '../data/const';
import { GlobalStyle } from '../styles/GlobalStyle';
import { MineAnsoegningerStyle as styles } from '../styles/MineAnsoegningerStyle';
import PrimaryButton from '../components/PrimaryButton';

// Badge-tekst og en kort forklaring pr. status. Forklaringen er med for at
// afstemme forventninger: den studerende skal vide, hvad der sker nu.
const STATUS = {
  afventer: {
    label: 'Afventer',
    info: 'Virksomheden har ikke svaret endnu.',
  },
  accepteret: {
    label: 'Accepteret',
    info: 'Du har fået opgaven! Virksomheden kontakter dig om det praktiske.',
  },
  afvist: {
    label: 'Afvist',
    info: 'Virksomheden valgte en anden denne gang. Prøv en af de andre opgaver.',
  },
};

export default function MineAnsoegningerScreen({ navigation }) {
  const { tasks, applications, withdrawApplication } = useApp();

  // Kobler den studerendes egne ansøgninger sammen med opgavens data, så vi
  // kan vise titel, virksomhed og løn. Nyeste ansøgning øverst.
  const mineAnsoegninger = useMemo(
    () =>
      applications
        .filter((app) => app.studentName === PROFILE.name)
        .map((app) => ({ ...app, task: tasks.find((task) => task.id === app.taskId) }))
        // Spring ansøgninger over, hvis opgaven ikke findes længere.
        .filter((app) => app.task)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [applications, tasks]
  );

  // Bekræftelse før tilbagetrækning, så man ikke trækker sig ved et uheld.
  function bekraeftTilbagetraek(app) {
    Alert.alert('Træk ansøgning tilbage?', `Din ansøgning til "${app.task.title}" slettes.`, [
      { text: 'Annullér', style: 'cancel' },
      { text: 'Træk tilbage', style: 'destructive', onPress: () => withdrawApplication(app.id) },
    ]);
  }

  function renderAnsoegning({ item }) {
    const status = STATUS[item.status];
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerText}>
            <Text style={styles.company}>{item.task.company}</Text>
            <Text style={styles.title}>{item.task.title}</Text>
          </View>
          <View style={[styles.badge, styles[`badge_${item.status}`]]}>
            <Text style={[styles.badgeText, styles[`badgeText_${item.status}`]]}>
              {status.label}
            </Text>
          </View>
        </View>

        <Text style={styles.meta}>
          {item.task.location} · {item.task.hourlyRate} kr/t · {item.task.estimatedHours} timer
        </Text>
        <Text style={styles.statusInfo}>{status.info}</Text>

        <View style={styles.buttons}>
          {/* Navigerer ind i Opgaver-fanens stack. initial: false sørger for, at
              Opgavelisten ligger under detaljen, så tilbage-knappen virker. */}
          <PrimaryButton
            title="Se opgave"
            onPress={() =>
              navigation.navigate('Opgaver', {
                screen: 'OpgaveDetalje',
                params: { task: item.task },
                initial: false,
              })
            }
          />
          {/* Man kan kun trække sig, mens virksomheden ikke har svaret. */}
          {item.status === 'afventer' && (
            <PrimaryButton
              title="Træk ansøgning tilbage"
              variant="secondary"
              onPress={() => bekraeftTilbagetraek(item)}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={GlobalStyle.container}>
      <FlatList
        data={mineAnsoegninger}
        keyExtractor={(item) => item.id}
        renderItem={renderAnsoegning}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Ingen ansøgninger endnu</Text>
            <Text style={styles.emptyText}>
              Find en opgave, der passer til dig, og send din første ansøgning.
            </Text>
            <View style={styles.emptyButton}>
              <PrimaryButton title="Find opgaver" onPress={() => navigation.navigate('Opgaver')} />
            </View>
          </View>
        }
      />
    </View>
  );
}
