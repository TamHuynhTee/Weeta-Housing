import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavLogged = () => {
  const router = useRouter();
  const [, actionAuth] = useAuth();

  const handleLogout = () => {
    actionAuth.logoutAsync();
    router.push('/');
  };

  return (
    <div className="flex items-center ml-[25px] md:ml-[20px] gap-x-[20px]">
      <Link href="/tao-tin-moi">
        <a className="button-primary text-center md:text-[14px] md:leading-[17px]">
          Đăng bài mới
        </a>
      </Link>
      <div className="wrap_menuAvatar">
        <div className="h-[40px] w-[40px] rounded-[50%] iconAvatar">
          <img src={DEFAULT_AVATAR} alt="w-full h-full" />
        </div>
        <div className="wrap_contentHover">
          <div className="contentHover py-[16px]">
            <Link href="/thong-tin-ca-nhan">
              <a className="menuProfile menuLinkHover">Thông tin cá nhân</a>
            </Link>
            <div className="lineMenu"></div>
            <Link href="#!">
              <a className="menuProfile menuLinkHover">Thông báo</a>
            </Link>
            <Link href="/tin-nhan">
              <a className="menuProfile menuLinkHover">Tin nhắn</a>
            </Link>
            <div className="lineMenu"></div>
            <Link href="#!">
              <a className="menuProfile menuLinkHover">Nhà trọ yêu thích</a>
            </Link>
            <Link href="#!">
              <a className="menuProfile menuLinkHover">Nhà trọ đã lưu</a>
            </Link>
            <div className="lineMenu"></div>
            <button
              className="menuProfile menuLinkHover text-red-500 font-bold"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavLogged;
