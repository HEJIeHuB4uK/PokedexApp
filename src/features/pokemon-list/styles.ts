import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textPrimary,
  },
  search: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
  },
  filtersContainer: {
    marginTop: 8,
    marginBottom: 8,
    minHeight: 36,
  },
  filtersRow: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
  },
  filterChipSpacing: {
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: colors.textSecondary,
    lineHeight: 16,
  },
  filterChipTextActive: {
    color: colors.surface,
  },
  listContent: {
    paddingVertical: 16,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
  },
  helper: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
