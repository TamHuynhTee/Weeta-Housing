import Link from 'next/link';
import React from 'react';

const NavNotLogged = () => {
  return (
    <div className="flex items-center ml-[25px] md:ml-[20px]">
      <Link href="/dang-nhap">
        <a className="button-no-outline-primary text-center  md:text-[14px] md:leading-[17px]">
          Đăng nhập
        </a>
      </Link>
      <Link href="/dang-ky">
        <a className="button-primary text-center md:text-[14px] md:leading-[17px]">
          Đăng ký
        </a>
      </Link>
    </div>
  );
};

export default NavNotLogged;
