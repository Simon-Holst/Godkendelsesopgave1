import { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useApp } from '../context/AppContext';
import { filterTasks } from '../utils/filterTasks';
import { GlobalStyle } from '../styles/GlobalStyle';
import PrimaryButton from '../components/PrimaryButton';

export default function OpgavelisteScreen({ navigation }) {
  const { tasks, filter } = useApp();

  // Kun åbne opgaver vises; tildelte opgaver kan studerende ikke længere søge.
  const aabneOpgaver = useMemo(() => tasks.filter((task) => task.status === 'åben'), [tasks]);
  // Lokationsfilteret (Modul D) kan fjerne opgaver, sortere dem og tilføje distanceKm.
  const synligeOpgaver = useMemo(() => filterTasks(aabneOpgaver, filter), [aabneOpgaver, filter]);

  return (
    <View style={GlobalStyle.container}>
      {/* Opgaverne kommer fra AsyncStorage via context, ikke længere direkte fra const.js */}
      <FlatList
        data={synligeOpgaver}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListHeaderComponent={
          <View style={GlobalStyle.listHeader}>
            <Text style={GlobalStyle.screenTitle}>Ledige opgaver</Text>
            <View style={GlobalStyle.listHeaderRow}>
              {/* Tælleren gør det synligt, når filteret skjuler opgaver (kold start-risiko) */}
              <Text style={GlobalStyle.listCount}>
                Viser {synligeOpgaver.length} af {aabneOpgaver.length} opgaver
              </Text>
              <View style={GlobalStyle.listHeaderButton}>
                <PrimaryButton
                  title="Filter"
                  variant="secondary"
                  onPress={() => navigation.navigate('Filter')}
                />
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={GlobalStyle.emptyText}>
            Ingen opgaver matcher dit filter. Prøv at udvide radius.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={GlobalStyle.taskCard}>
            <Text style={GlobalStyle.taskCompany}>{item.company}</Text>
            <Text style={GlobalStyle.taskTitle}>{item.title}</Text>

            {/* Sted, evt. online og afstand (afstand findes kun, når filteret kender placeringen) */}
            <Text style={GlobalStyle.taskLocation}>
              {item.location}
              {item.remote ? ' · Kan løses online' : ''}
              {item.distanceKm != null ? ` · ca. ${Math.round(item.distanceKm)} km` : ''}
            </Text>

            <View style={GlobalStyle.taskMetaRow}>
              <View style={GlobalStyle.categoryTag}>
                <Text style={GlobalStyle.categoryTagText}>{item.category}</Text>
              </View>
              <Text style={GlobalStyle.taskRate}>{item.hourlyRate} kr/t</Text>
            </View>

            <PrimaryButton
              title="Se opgave"
              // Sender hele opgave-objektet med som parameter til detalje-skærmen
              onPress={() => navigation.navigate('OpgaveDetalje', { task: item })}
            />
          </View>
        )}
      />
    </View>
  );
}
