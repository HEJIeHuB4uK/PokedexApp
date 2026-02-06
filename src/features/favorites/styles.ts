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
