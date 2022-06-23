import { DEFAULT_AVATAR, ROLE, TYPE_MEMBER } from '@/constants/base.constants';
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
    window.google?.accounts?.id?.disableAutoSelect();
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
            <div className="py-[5px] px-[20px]">
              <p className="text-[14px] max_line-1 my-[5px]">
                {stateAuth.role === ROLE.LESSOR ? 'Nhà môi giới' : 'Người dùng'}
                : <span className="font-bold">{stateAuth.auth?.fullname}</span>
              </p>

              {stateAuth.role === ROLE.LESSOR ? (
                <>
                  <p className="text-[14px] max_line-1 my-[5px]">
                    Loại tài khoản:{' '}
                    {stateAuth.auth?.memberPackage ? (
                      <Link href={`/goi-thanh-vien`}>
                        <a
                          className={`font-bold text-[${
                            TYPE_MEMBER[stateAuth.auth.memberPackage].color
                          }]`}
                        >
                          {TYPE_MEMBER[stateAuth.auth.memberPackage].name}
                        </a>
                      </Link>
                    ) : (
                      ''
                    )}
                  </p>
                  <p className="text-[14px] max_line-1 my-[5px]">
                    Số bài viết trong tháng:{' '}
                    <span className="font-bold">
                      {stateAuth.auth?.articleUsed}/
                      {stateAuth.auth?.articleTotal}
                    </span>
                  </p>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="lineMenu"></div>
            <Link href="/thong-tin-ca-nhan">
              <a className="menuProfile menuLinkHover">Thông tin cá nhân</a>
            </Link>
            <div className="lineMenu"></div>
            <Link href="/tin-nhan">
              <a className="menuProfile menuLinkHover">Tin nhắn</a>
            </Link>
            <Link href="/thong-tin-ca-nhan/bai-dang-da-luu">
              <a className="menuProfile menuLinkHover">Lưu bài viết</a>
            </Link>
            {stateAuth.role === ROLE.LESSOR && (
              <Link href="/thong-tin-ca-nhan/quan-ly-bai-dang/da-duyet">
                <a className="menuProfile menuLinkHover">Bài viết của tôi</a>
              </Link>
            )}
            <div className="lineMenu"></div>
            <button
              className="menuProfile menuLinkHover !text-red-700 font-bold"
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
