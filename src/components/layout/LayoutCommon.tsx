// import HeaderSearchSkill from 'components/common/HeaderSearchSkill';
// import NavLang from 'components/common/NavLang';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import Footer from '../common/Footer';
import HeaderSearch from '../common/HeaderSearch';
import NavNotLogged from '../common/NavNotLogged';

interface IProps {
  children: React.ReactElement;
  isVisibleFooter?: boolean;
  isVisibleSearchBar?: boolean;
  title?: string;
}

const LayoutCommon: FC<IProps> = ({
  children,
  isVisibleFooter = true,
  isVisibleSearchBar = false,
  title = 'Thông tin cá nhân',
}: IProps) => {
  const router = useRouter();
  //   const [stateAuth] = useAuth();
  //   console.log(router);
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="w-full sticky top-0 bg-white z-[100]">
        <div className="w-full border-b border-grey-100">
          <div className="container_app mx-auto px-[50px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <a className="font-bold text-[32px] md:text-[24px] text-back-100 mr-[25px] text-baseColor">
                    WEETA HOUSING
                  </a>
                </Link>
                {isVisibleSearchBar && router.pathname !== '/tim-kiem' && (
                  <HeaderSearch
                    className={`pb-[2 px] w-full h-full text-[16px] text-back-100 placeholder-grey-50 border-0 outline-none md:hidden`}
                  />
                )}
              </div>

              <div className="flex items-center">
                <div className="flex items-center">
                  {/* <Link href="#!">
                    <a className={`menu-link mr-[30px]`}>Danh sách</a>
                  </Link> */}
                  <Link href="#!">
                    <a className={`menu-link`}>Chủ trọ</a>
                  </Link>
                  <Link href="#!">
                    <a className={`menu-link`}>Blog</a>
                  </Link>
                  <Link href="/goi-dich-vu">
                    <a
                      className={`menu-link${
                        router.pathname === '/goi-dich-vu' ? ' active' : ''
                      }`}
                    >
                      Gói dịch vụ
                    </a>
                  </Link>
                  {/* <NavLang /> */}
                </div>
                <NavNotLogged />
                {/* {stateAuth.isLoggedIn ? <NavLogged /> : <NavNotLogged />} */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
      {isVisibleFooter && <Footer />}
    </React.Fragment>
  );
};

export default LayoutCommon;
