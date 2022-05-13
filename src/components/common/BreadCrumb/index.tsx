import React from 'react';
import AnchorLink from '@/components/common/AnchorLink';
import styles from './style.module.css';

interface IProps {
  className?: string;
  arr_link?: Array<{ href: string; value: string }>;
  classNameContainer?: string;
  classNameBreadcrumb?: string;
}

let breadcrumb_link: Array<{ href: string; value: string }> = [
  {
    href: '/',
    value: 'Weeta',
  },
];

const Breadcrumb = (props: IProps) => {
  const { arr_link, classNameContainer, classNameBreadcrumb } = props;
  if (arr_link && arr_link.length > 0) {
    breadcrumb_link = arr_link;
  }
  return (
    <div
      className={`h-auto w-full text-[14px] rounded-br-[20px] ${
        classNameContainer ?? ''
      }`}
    >
      <div
        className={`${styles.wrap_breadcrumb} ${
          classNameBreadcrumb ?? ''
        } w-full py-[5px]`}
      >
        {breadcrumb_link.map((item, index) => (
          <div className="flex" key={index}>
            {breadcrumb_link.length > 1 &&
            index === breadcrumb_link.length - 1 ? (
              <p className={`text-black font-normal`}>{item.value}</p>
            ) : (
              <AnchorLink
                href={item.href}
                className={`category-link text-grey-300 font-semibold`}
                style={{ textDecoration: 'none' }}
              >
                {item.value}
              </AnchorLink>
            )}
            {index !== breadcrumb_link.length - 1 && (
              <span className="text-16px text-grey-300 mx-[5px]">{'>'}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
