import ContainerModal from '@/components/common/ContainerModal';
import { ROLE } from '@/constants/base.constants';
import { getSplitPathName } from '@/helpers/base.helpers';
import { useAuth } from '@/stores/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import BoxMenuAvatar from '../BoxAvatar';
import ModalAvatar from '../ModalAvatar';

interface IProps {
  children: any;
}

const ContainerProfile = (props: IProps) => {
  const [stateAuth] = useAuth();
  const { children } = props;
  const [modalAvatar, setModalAvatar] = React.useState(false);
  const router = useRouter();
  return (
    <div className="w-full pb-[70px]">
      {/* <TabMenu /> */}
      <div className="mt-[20px] container_app mx-auto px-[50px] grid grid-cols-7 gap-x-[30px]">
        <div className="col-span-2">
          <div className="w-full sticky top-[100px]">
            <div className="container_shadow w-full">
              {/* Avatar */}
              <BoxMenuAvatar openModal={() => setModalAvatar(true)} />
              {/*  */}
              <div className="w-full mt-[24px]">
                <h2 className="text-[20px] font-bold text-baseColor">
                  Cập nhật thông tin cá nhân
                </h2>
                <div className="pl-[20px] grid">
                  <Link href="/thong-tin-ca-nhan">
                    <a
                      className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                        getSplitPathName(router.pathname, 2) === '' &&
                        'font-bold text-green-600'
                      } `}
                    >
                      Thông tin tài khoản
                    </a>
                  </Link>
                  {stateAuth.role === ROLE.LESSOR && (
                    <Link href="/thong-tin-ca-nhan/tai-khoan-moi-gioi">
                      <a
                        className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                          getSplitPathName(router.pathname, 2) ===
                            'tai-khoan-moi-gioi' && 'font-bold text-green-600'
                        } `}
                      >
                        Tài khoản môi giới
                      </a>
                    </Link>
                  )}
                  <Link href="/thong-tin-ca-nhan/doi-mat-khau">
                    <a
                      className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                        getSplitPathName(router.pathname, 2) ===
                          'doi-mat-khau' && 'font-bold text-green-600'
                      } `}
                    >
                      Đổi mật khẩu
                    </a>
                  </Link>
                  <Link href="/tin-nhan">
                    <a
                      className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 `}
                    >
                      Tin nhắn của tôi
                    </a>
                  </Link>
                  {stateAuth.role === ROLE.LESSOR && (
                    <Link href="/thong-tin-ca-nhan/lich-su-giao-dich">
                      <a
                        className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                          getSplitPathName(router.pathname, 2) ===
                            'lich-su-giao-dich' && 'font-bold text-green-600'
                        } `}
                      >
                        Lịch sử giao dịch
                      </a>
                    </Link>
                  )}
                </div>
              </div>
              <div className="w-full mt-[24px]">
                <h2 className="text-[20px] font-bold text-baseColor">
                  Quản lý Bài viết
                </h2>
                <div className="pl-[20px] grid">
                  {stateAuth.role === ROLE.LESSOR && (
                    <Link href="/thong-tin-ca-nhan/quan-ly-bai-dang/da-duyet">
                      <a
                        className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                          getSplitPathName(router.pathname, 2) ===
                            'quan-ly-bai-dang' && 'font-bold text-green-600'
                        } `}
                      >
                        Bài viết của tôi
                      </a>
                    </Link>
                  )}
                  <Link href="/thong-tin-ca-nhan/bai-dang-da-luu">
                    <a
                      className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                        getSplitPathName(router.pathname, 2) ===
                          'bai-dang-da-luu' && 'font-bold text-green-600'
                      } `}
                    >
                      Bài viết đã lưu
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <div className="w-full">{children}</div>
        </div>
      </div>
      <ContainerModal
        isVisible={modalAvatar}
        closeModal={() => setModalAvatar(false)}
      >
        <ModalAvatar closeModal={() => setModalAvatar(false)} />
      </ContainerModal>
    </div>
  );
};

// Home.layout = LayoutCommon;

export default ContainerProfile;
