import React from 'react';

interface Props {
  className?: string;
  overrideClassName?: boolean;
}

const LineHorizontal = (props: Props) => {
  const { className, overrideClassName } = props;
  const defaultClassName = 'w-full h-[0.5px] bg-grey-200';
  const _className = overrideClassName
    ? className
    : defaultClassName + ' ' + className;

  return <div className={_className} />;
};

export default LineHorizontal;
