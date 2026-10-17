import { StyleSheet } from 'react-native';

// Farvepalette
export const COLORS = {
  background: '#F4F6F8',
  card: '#FFFFFF',
  ink: '#1D3557',
  muted: '#6C757D',
  primary: '#2A9D8F',
  primaryPressed: '#1F776C',
  border: '#E0E0E0',
  tagBackground: '#E9F5F3',
};

export const GlobalStyle = StyleSheet.create({
  // Fælles
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenPadding: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.ink,
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginTop: 24,
  },

  // Pladsholder-screens fra Fase 1 (fjernes, når modulerne er bygget)
  stubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stubText: {
    fontSize: 15,
    color: COLORS.muted,
  },

  // OpgavelisteScreen
  listHeader: {
    paddingHorizontal: 16,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  listCount: {
    fontSize: 14,
    color: COLORS.muted,
  },
  listHeaderButton: {
    width: 110,
  },
  taskLocation: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 8,
  },
  taskCard: {
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
  taskCompany: {
    fontSize: 13,
    color: COLORS.muted,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.ink,
    marginTop: 2,
    marginBottom: 8,
  },
  taskMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: COLORS.tagBackground,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryTagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  taskRate: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },

  // Knap (genbrugelig)
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButtonDisabled: {
    backgroundColor: COLORS.muted,
    borderColor: COLORS.muted,
  },
  secondaryButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingVertical: 10.5,
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },

  // OpgaveDetaljeScreen
  detailCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 18,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  detailCompany: {
    fontSize: 14,
    color: COLORS.muted,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
    marginTop: 4,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 12,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.ink,
    lineHeight: 21,
  },
  confirmationText: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },

  // ProfilScreen
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: COLORS.tagBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
  },
  profileEducation: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 2,
  },
  profileBio: {
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 20,
    paddingHorizontal: 16,
    marginTop: 12,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.muted,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  skillTag: {
    backgroundColor: COLORS.tagBackground,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  skillTagText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  // Rolleskift på ProfilScreen
  roleCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  roleText: {
    fontSize: 15,
    color: COLORS.ink,
    marginBottom: 12,
  },
});
