import { Pressable, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// Genbrugelig "chip": en lille valgknap, der er fremhævet, når den er valgt.
// Bruges i stedet for dropdowns, fordi alle valg kan ses og trykkes på med
// ét tryk, hvilket gør formularer og filtre hurtigere at udfylde.
export default function Chip({ label, selected, onPress }) {
  return (
    <Pressable style={[GlobalStyle.chip, selected && GlobalStyle.chipSelected]} onPress={onPress}>
      <Text style={[GlobalStyle.chipText, selected && GlobalStyle.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}
