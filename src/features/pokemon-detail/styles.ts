import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 180,
    height: 180,
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#e2e8f0',
  },
  title: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
