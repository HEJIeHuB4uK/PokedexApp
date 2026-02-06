import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    let isMounted = true;
    NetInfo.fetch().then(state => {
      if (isMounted) {
        setIsOnline(Boolean(state.isConnected));
      }
    });
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(Boolean(state.isConnected));
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return {
    isOnline,
    isOffline: !isOnline,
  };
}
