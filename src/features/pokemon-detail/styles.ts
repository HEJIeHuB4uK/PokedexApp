import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  image: {
    width: 180,
    height: 180,
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.border,
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
    color: colors.textPrimary,
  },
  favoriteButton: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  favoriteButtonActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  favoriteButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  favoriteButtonTextActive: {
    color: colors.surface,
  },
  helper: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  typesRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  typeChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
    textTransform: 'capitalize',
  },
  section: {
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statName: {
    width: 90,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  statBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 6,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  statValue: {
    width: 32,
    textAlign: 'right',
    fontSize: 12,
    color: colors.textPrimary,
  },
  abilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  abilityChipText: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
});
