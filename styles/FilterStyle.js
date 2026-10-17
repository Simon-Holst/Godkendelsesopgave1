import { StyleSheet } from 'react-native';
import { COLORS } from './GlobalStyle';

// Styling til FilterScreen (Modul D).
export const FilterStyle = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 6,
  },
  section: {
    marginTop: 4,
  },
  gpsStatus: {
    fontSize: 14,
    color: COLORS.ink,
    marginTop: 10,
  },
  gpsError: {
    fontSize: 14,
    color: COLORS.danger,
    marginTop: 10,
    lineHeight: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  switchTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  switchLabel: {
    fontSize: 15,
    color: COLORS.ink,
  },
  switchHint: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },

  // Live-forhåndsvisning af antal matchende opgaver
  previewCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  previewCount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
  },
  previewTip: {
    backgroundColor: COLORS.warningBackground,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignSelf: 'stretch',
  },
  previewTipText: {
    color: COLORS.warning,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttons: {
    marginTop: 20,
  },
});
