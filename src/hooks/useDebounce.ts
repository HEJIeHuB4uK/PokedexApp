import {useMemo, useRef} from 'react';

type AnyFn = (...args: any[]) => void;

export function useDebounce<T extends AnyFn>(fn: T, delayMs: number): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const debounced = (...args: Parameters<T>) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fnRef.current(...args);
      }, delayMs);
    };
    return debounced as T;
  }, [delayMs]);
}
