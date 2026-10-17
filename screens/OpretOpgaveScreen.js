import { View, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// STUB fra Fase 1: pladsholder, så navigationen kompilerer, før modulet er
// bygget. Erstattes af modulets ejer.
export default function OpretOpgaveScreen() {
  return (
    <View style={[GlobalStyle.container, GlobalStyle.stubContainer]}>
      <Text style={GlobalStyle.screenTitle}>Modul A: Opret opgave (virksomhed)</Text>
      <Text style={GlobalStyle.stubText}>Denne skærm er endnu ikke bygget.</Text>
    </View>
  );
}
