import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider, useApp } from './context/AppContext';
import OpgavelisteScreen from './screens/OpgavelisteScreen';
import OpgaveDetaljeScreen from './screens/OpgaveDetaljeScreen';
import FilterScreen from './screens/FilterScreen';
import MineAnsoegningerScreen from './screens/MineAnsoegningerScreen';
import OpretOpgaveScreen from './screens/OpretOpgaveScreen';
import MineOpgaverScreen from './screens/MineOpgaverScreen';
import ProfilScreen from './screens/ProfilScreen';
import { COLORS, GlobalStyle } from './styles/GlobalStyle';

const Tab = createBottomTabNavigator();
const OpgaveStack = createNativeStackNavigator();

// Stack til Opgaver-fanen: liste → detalje/filter, så man kan navigere "ind i"
// en opgave eller filteret og stadig blive i samme bundfane.
function OpgaverStackScreen() {
  return (
    <OpgaveStack.Navigator>
      <OpgaveStack.Screen
        name="Opgaveliste"
        component={OpgavelisteScreen}
        options={{ title: 'Opgaver' }}
      />
      <OpgaveStack.Screen
        name="OpgaveDetalje"
        component={OpgaveDetaljeScreen}
        options={{ title: 'Opgavedetaljer' }}
      />
      <OpgaveStack.Screen
        name="Filter"
        component={FilterScreen}
        options={{ title: 'Filter' }}
      />
    </OpgaveStack.Navigator>
  );
}

// Bundfanerne afhænger af rollen, så én app kan vise begge sider af platformen
// (studerende og virksomhed). Profil findes i begge, så man altid kan skifte
// rolle derfra.
function RootNavigator() {
  const { ready, role } = useApp();

  // Vent til data er hentet fra AsyncStorage, så listerne ikke blinker tomme.
  if (!ready) {
    return (
      <View style={GlobalStyle.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
      }}
    >
      {role === 'student' ? (
        <>
          <Tab.Screen name="Opgaver" component={OpgaverStackScreen} />
          <Tab.Screen
            name="Ansøgninger"
            component={MineAnsoegningerScreen}
            options={{ headerShown: true, title: 'Mine ansøgninger' }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Opret opgave"
            component={OpretOpgaveScreen}
            options={{ headerShown: true }}
          />
          <Tab.Screen
            name="Mine opgaver"
            component={MineOpgaverScreen}
            options={{ headerShown: true }}
          />
        </>
      )}
      <Tab.Screen name="Profil" component={ProfilScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}

// AppProvider ligger yderst, så både navigationen og alle screens kan bruge useApp().
export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}
