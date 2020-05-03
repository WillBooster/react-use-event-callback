import { useCallback, useLayoutEffect, useRef } from 'react';

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;

export function useEventCallback<A extends any[], R>(fn: Fn<A, R>): Fn<A, R> {
  const ref = useRef<Fn<A, R>>(fn);
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args) => ref.current(...args), []);
}
