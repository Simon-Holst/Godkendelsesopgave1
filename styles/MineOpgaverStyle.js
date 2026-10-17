import { StyleSheet } from 'react-native';
import { COLORS } from './GlobalStyle';

// Styling til MineOpgaverScreen (Modul B).
export const MineOpgaverStyle = StyleSheet.create({
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
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.ink,
  },
  meta: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 6,
  },
  toggleHint: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 8,
  },

  // Status-badge for opgaven
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeOpen: {
    backgroundColor: COLORS.tagBackground,
  },
  badgeAssigned: {
    backgroundColor: COLORS.successBackground,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextOpen: {
    color: COLORS.primary,
  },
  badgeTextAssigned: {
    color: COLORS.success,
  },

  // Udfoldet ansøgerliste
  applicants: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
  },
  applicantRow: {
    paddingVertical: 8,
  },
  applicantName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  applicantStatus: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  applicantAccepted: {
    color: COLORS.success,
    fontWeight: '700',
  },
  applicantRejected: {
    color: COLORS.danger,
  },
  applicantButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  applicantButton: {
    flex: 1,
  },
  noApplicants: {
    fontSize: 14,
    color: COLORS.muted,
    paddingVertical: 8,
  },
  assignedBanner: {
    backgroundColor: COLORS.successBackground,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  assignedBannerText: {
    color: COLORS.success,
    fontWeight: '700',
    fontSize: 14,
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
