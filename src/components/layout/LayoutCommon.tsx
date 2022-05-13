// import HeaderSearchSkill from 'components/common/HeaderSearchSkill';
// import NavLang from 'components/common/NavLang';
import { getSplitPathName } from '@/helpers/base.helpers';
import { useAuth } from '@/stores/Auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ContainerModal from '../common/ContainerModal';
import Footer from '../common/Footer';
import HeaderSearch from '../common/HeaderSearch';
import NavLogged from '../common/NavLogged';
import NavNotLogged from '../common/NavNotLogged';
import ModalCreateLessor from '../pages/ModalCreateLessor';
import ModalFullOfArticle from '../pages/ModalFullOfArticle';

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
  title = 'Weeta',
}: IProps) => {
  const router = useRouter();

  const [modalCreateLessor, setModalCreateLessor] = React.useState(false);
  const [modalFullOfArticle, setModalFullOfArticle] = React.useState(false);
  const [stateAuth] = useAuth();

  const openCreateLessorModal = () => setModalCreateLessor(true);
  const closeCreateLessorModal = () => setModalCreateLessor(false);
  const openFullOfArticleModal = () => setModalFullOfArticle(true);
  const closeFullOfArticleModal = () => setModalFullOfArticle(false);

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
                {isVisibleSearchBar && router.pathname !== '/thue-tro' && (
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
                  <Link href="/thue-tro">
                    <a
                      className={`menu-link ${
                        getSplitPathName(router.pathname, 1) === 'thue-tro' &&
                        'active'
                      }`}
                    >
                      Thuê trọ
                    </a>
                  </Link>
                  {/* <Link href="#!">
                    <a className={`menu-link`}>Blog</a>
                  </Link> */}
                  <Link href="/goi-dich-vu">
                    <a
                      className={`menu-link ${
                        getSplitPathName(router.pathname, 1) ===
                          'goi-dich-vu' && 'active'
                      }`}
                    >
                      Gói dịch vụ
                    </a>
                  </Link>
                  {/* <NavLang /> */}
                </div>
                {stateAuth.isLoggedIn ? (
                  <NavLogged
                    openCreateLessorModal={openCreateLessorModal}
                    openFullOfArticleModal={openFullOfArticleModal}
                  />
                ) : (
                  <NavNotLogged />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container_app mx-auto">{children}</main>
      {isVisibleFooter && <Footer />}
      <ContainerModal
        isVisible={modalCreateLessor}
        closeModal={closeCreateLessorModal}
      >
        <ModalCreateLessor closeModal={closeCreateLessorModal} />
      </ContainerModal>
      <ContainerModal
        isVisible={modalFullOfArticle}
        closeModal={closeFullOfArticleModal}
      >
        <ModalFullOfArticle closeModal={closeFullOfArticleModal} />
      </ContainerModal>
    </React.Fragment>
  );
};

export default LayoutCommon;
