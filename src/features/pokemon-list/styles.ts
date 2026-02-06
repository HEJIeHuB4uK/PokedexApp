import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.backgroundAlt,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 2,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  search: {
    flex: 1,
    paddingVertical: 10,
    color: colors.textPrimary,
    fontSize: 14,
  },
  searchWithIcon: {
    paddingLeft: 8,
  },
  searchIcon: {
    color: colors.textSecondary,
  },
  offlineBanner: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 12,
  },
  historySection: {
    marginTop: 12,
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  historyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  historyChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyChipText: {
    fontSize: 12,
    color: colors.textPrimary,
    textTransform: 'capitalize',
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
    backgroundColor: colors.surfaceMuted,
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
    paddingVertical: 12,
    paddingBottom: 32,
  },
  row: {
    gap: 12,
    marginBottom: 12,
  },
  card: {
    flex: 1,
  },
  cardPressable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardPressablePressed: {
    opacity: 0.9,
    transform: [{scale: 0.98}],
  },
  helper: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
