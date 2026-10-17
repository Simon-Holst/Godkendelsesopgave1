import { View, Text, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { GlobalStyle } from '../styles/GlobalStyle';
import PrimaryButton from '../components/PrimaryButton';

// Knaptekst afhænger af, hvor ansøgningen står, så den studerende kan se
// status direkte på opgaven (forventningsafstemning).
const STATUS_TEKST = {
  afventer: 'Ansøgning sendt',
  accepteret: 'Du har fået opgaven',
  afvist: 'Ansøgning afvist',
};

export default function OpgaveDetaljeScreen({ route }) {
  const { tasks, applications, applyToTask } = useApp();

  // Opgaven sendes med som navigations-parameter, men vi slår den op i context,
  // så vi viser den nyeste status (fx 'tildelt'), hvis den er ændret siden.
  const task = tasks.find((t) => t.id === route.params.task.id) ?? route.params.task;

  // Ansøgningen gemmes nu i AsyncStorage via context i stedet for lokal state,
  // så den huskes, når man forlader skærmen eller lukker appen.
  const ansoegning = applications.find((app) => app.taskId === task.id);
  const erTildelt = task.status === 'tildelt';

  let knapTekst = 'Ansøg om opgaven';
  if (ansoegning) knapTekst = STATUS_TEKST[ansoegning.status];
  else if (erTildelt) knapTekst = 'Opgaven er tildelt';

  return (
    <ScrollView style={GlobalStyle.container}>
      <View style={GlobalStyle.detailCard}>
        <Text style={GlobalStyle.detailCompany}>{task.company}</Text>
        <Text style={GlobalStyle.detailTitle}>{task.title}</Text>

        <View style={GlobalStyle.categoryTag}>
          <Text style={GlobalStyle.categoryTagText}>{task.category}</Text>
        </View>

        <Text style={GlobalStyle.detailLabel}>Beskrivelse</Text>
        <Text style={GlobalStyle.detailValue}>{task.description}</Text>

        <Text style={GlobalStyle.detailLabel}>Sted</Text>
        <Text style={GlobalStyle.detailValue}>
          {task.location}
          {task.remote ? ' (kan løses online)' : ''}
        </Text>

        <Text style={GlobalStyle.detailLabel}>Estimeret tidsforbrug</Text>
        <Text style={GlobalStyle.detailValue}>{task.estimatedHours} timer</Text>

        <Text style={GlobalStyle.detailLabel}>Timeløn</Text>
        <Text style={GlobalStyle.detailValue}>{task.hourlyRate} kr/time</Text>

        <View style={{ marginTop: 20 }}>
          {/* Deaktiveret når man allerede har ansøgt, eller opgaven er givet til en anden */}
          <PrimaryButton
            title={knapTekst}
            onPress={() => applyToTask(task.id)}
            disabled={Boolean(ansoegning) || erTildelt}
          />
        </View>

        {ansoegning?.status === 'afventer' && (
          <Text style={GlobalStyle.confirmationText}>
            Din ansøgning er sendt til {task.company}!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
