import { StyleSheet } from 'react-native';
import { COLORS } from './GlobalStyle';

// Styling til MineAnsoegningerScreen (Modul C).
export const MineAnsoegningerStyle = StyleSheet.create({
  list: {
    paddingVertical: 12,
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  headerText: {
    flex: 1,
  },
  company: {
    fontSize: 13,
    color: COLORS.muted,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.ink,
    marginTop: 2,
  },
  meta: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 6,
  },
  statusInfo: {
    fontSize: 14,
    color: COLORS.ink,
    marginTop: 8,
    lineHeight: 20,
  },
  buttons: {
    marginTop: 12,
    gap: 10,
  },

  // Status-badges: én farve pr. status, så man kan se det med et hurtigt blik
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badge_afventer: {
    backgroundColor: COLORS.warningBackground,
  },
  badgeText_afventer: {
    color: COLORS.warning,
  },
  badge_accepteret: {
    backgroundColor: COLORS.successBackground,
  },
  badgeText_accepteret: {
    color: COLORS.success,
  },
  badge_afvist: {
    backgroundColor: COLORS.dangerBackground,
  },
  badgeText_afvist: {
    color: COLORS.danger,
  },

  // Tom-tilstand
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    alignSelf: 'stretch',
  },
});
