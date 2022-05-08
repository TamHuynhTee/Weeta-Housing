import { DEFAULT_AVATAR, ROLE } from '@/constants/base.constants';
import { useAuth } from '@/stores/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  openCreateLessorModal: () => void;
  openFullOfArticleModal: () => void;
};

const NavLogged = ({
  openCreateLessorModal,
  openFullOfArticleModal,
}: Props) => {
  const router = useRouter();
  const [stateAuth, actionAuth] = useAuth();
  //   console.log(`stateAuth`, stateAuth);

  const handleLogout = () => {
    actionAuth.logoutAsync();
    router.push('/');
  };

  const roleBasedHandle = () => {
    if (stateAuth.role === ROLE.LESSOR) {
      if (stateAuth.auth) {
        if (stateAuth.auth.articleUsed >= stateAuth.auth.articleTotal)
          openFullOfArticleModal();
        else router.push('/tao-tin-moi');
      }
      // router.push('/tao-tin-moi');
    } else if (stateAuth.role === ROLE.USER) openCreateLessorModal();
  };

  return (
    <div className="flex items-center ml-[25px] md:ml-[20px] gap-x-[20px]">
      <button
        className="button-primary text-center md:text-[14px] md:leading-[17px]"
        onClick={roleBasedHandle}
      >
        {stateAuth.role === ROLE.LESSOR ? 'Đăng bài mới' : 'Đăng ký cho thuê'}
      </button>
      <div className="wrap_menuAvatar">
        <div className="h-[40px] w-[40px] rounded-[50%] iconAvatar">
          <img
            src={stateAuth.auth ? stateAuth.auth.avatar : DEFAULT_AVATAR}
            className="w-full h-full object-cover rounded-[50%] user_avatar"
            alt="avatar"
          />
        </div>
        <div className="wrap_contentHover">
          <div className="contentHover py-[16px]">
            <Link href="/thong-tin-ca-nhan">
              <a className="menuProfile menuLinkHover">Thông tin cá nhân</a>
            </Link>
            <div className="lineMenu"></div>
            {/* <Link href="#!">
              <a className="menuProfile menuLinkHover">Thông báo</a>
            </Link> */}
            <Link href="/tin-nhan">
              <a className="menuProfile menuLinkHover">Tin nhắn</a>
            </Link>
            {/* <div className="lineMenu"></div> */}
            <Link href="#!">
              <a className="menuProfile menuLinkHover">Nhà trọ yêu thích</a>
            </Link>
            <Link href="#!">
              <a className="menuProfile menuLinkHover">Bài đăng đã lưu</a>
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
