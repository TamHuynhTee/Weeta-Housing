import { useRef, useEffect, useCallback } from 'react';

const useDebounce = <F extends (...args: any) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => ReturnType<F>) => {
  const timer = useRef<NodeJS.Timer | null>();
  const savedFunc = useRef<F | null>(func);

  useEffect(() => {
    savedFunc.current = func;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitFor]);

  return useCallback((...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    timer.current = setTimeout(() => savedFunc.current?.(...args), waitFor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) as (...args: Parameters<F>) => ReturnType<F>;
};

export default useDebounce;
