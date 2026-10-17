import { Pressable, Text } from 'react-native';
import { GlobalStyle } from '../styles/GlobalStyle';

// Genbrugelig knap, bruges på tværs af alle screens.
// variant="secondary" giver en hvid knap med kant til sekundære handlinger
// (fx "Filter", "Ryd formular", "Afvis"), så den primære handling står tydeligst.
export default function PrimaryButton({ title, onPress, disabled, variant = 'primary' }) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      style={[
        GlobalStyle.primaryButton,
        secondary && GlobalStyle.secondaryButton,
        disabled && GlobalStyle.primaryButtonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          GlobalStyle.primaryButtonText,
          secondary && !disabled && GlobalStyle.secondaryButtonText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
