import { useCallback, useImperativeHandle, useRef } from 'react';

/**
 * Return a memorized callback of the given callback.
 * The memorized callback cannot be used in concurrent mode and useLayoutEffect in a descendant component
 * c.f. https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * c.f. https://github.com/facebook/react/issues/14099#issuecomment-499781277
 * c.f. https://github.com/facebook/react/issues/14099#issuecomment-569027159
 * @param callback
 */
export function useEventCallback<T extends (...args: any[]) => any>(callback: T): T {
  const ref = useRef<T>(callback);
  useImperativeHandle(ref, () => callback);
  return useCallback((...args: any[]) => (void 0, ref.current)(...args), []) as T;
}
