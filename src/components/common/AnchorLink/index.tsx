import Link from 'next/link';
import React from 'react';

interface IAnchorLink {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  passHref?: boolean;
}

const AnchorLink = ({
  className = '',
  children,
  href,
  style,
  passHref,
}: IAnchorLink) => {
  return (
    <Link href={href} passHref={passHref}>
      <a className={className} style={style}>
        {children}
      </a>
    </Link>
  );
};

export default AnchorLink;
