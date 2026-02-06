import AsyncStorage from '@react-native-async-storage/async-storage';

export async function readStorage<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  return JSON.parse(raw) as T;
}

export async function writeStorage<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
