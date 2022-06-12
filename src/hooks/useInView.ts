import React from 'react';

const useInView = (targetRef: any, options: IntersectionObserverInit) => {
  const [inView, setInView] = React.useState<boolean>(false);

  const optionsMemo = React.useMemo(() => {
    return options;
  }, [options]);

  const callBackFunc = (entries: Array<IntersectionObserverEntry>) => {
    const [entry] = entries;
    if (entry) setInView(entry.isIntersecting);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(callBackFunc, optionsMemo);
    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsMemo]);

  return inView;
};

export default useInView;
