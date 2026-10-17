import { StyleSheet } from 'react-native';
import { COLORS } from './GlobalStyle';

// Styling til OpretOpgaveScreen (Modul A).
export const OpretOpgaveStyle = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  intro: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.ink,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  numberRow: {
    flexDirection: 'row',
    gap: 12,
  },
  numberColumn: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  switchLabel: {
    fontSize: 15,
    color: COLORS.ink,
  },

  // Prisoverslag
  priceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.tagBackground,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.ink,
  },
  priceValue: {
    fontSize: 14,
    color: COLORS.ink,
  },
  priceDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  priceTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.ink,
  },
  priceTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  priceNote: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 8,
  },
  buttons: {
    marginTop: 20,
    gap: 10,
  },
});
