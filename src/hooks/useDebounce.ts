import {useEffect, useMemo, useRef} from 'react';

type AnyFn = (...args: any[]) => void;

export function useDebounce<T extends AnyFn>(fn: T, delayMs: number): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return useMemo(() => {
    const debounced = (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delayMs);
    };
    return debounced as T;
  }, [delayMs]);
}
