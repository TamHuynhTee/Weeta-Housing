import React from 'react';

export const useClickOutside = (handler: any) => {
  const domNode = React.useRef<any>();

  const eventHandler = (event: any) => {
    if (!domNode.current?.contains(event.target)) {
      handler();
    }
  };
  React.useEffect(() => {
    document.addEventListener('mousedown', eventHandler);
    document.addEventListener('wheel', eventHandler);
    return () => {
      document.removeEventListener('mousedown', eventHandler);
      document.removeEventListener('wheel', eventHandler);
    };
  });

  return domNode;
};
