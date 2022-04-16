import ContainerModal from '@/components/common/ContainerModal';
import { isCurrentLink } from '@/helpers/base.helpers';
import Link from 'next/link';
import React from 'react';
import BoxMenuAvatar from '../BoxAvatar';
import ModalAvatar from '../ModalAvatar';

interface IProps {
  children: any;
}

const ContainerProfile = (props: IProps) => {
  const { children } = props;
  const [modalAvatar, setModalAvatar] = React.useState(false);
  return (
    <div className="w-full pb-[70px]">
      {/* <TabMenu /> */}
      <div className="mt-[20px] container_app mx-auto px-[50px] grid grid-cols-7 gap-x-[30px]">
        <div className="col-span-2">
          <div className="w-full">
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
                        isCurrentLink('/thong-tin-ca-nhan') &&
                        'font-bold text-green-600'
                      } `}
                    >
                      Thông tin tài khoản
                    </a>
                  </Link>
                  <Link href="/thong-tin-ca-nhan/doi-mat-khau">
                    <a
                      className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                        isCurrentLink('/thong-tin-ca-nhan/doi-mat-khau') &&
                        'font-bold text-green-600'
                      } `}
                    >
                      Đổi mật khẩu
                    </a>
                  </Link>
                  <Link href="/thong-tin-ca-nhan/xac-thuc-tai-khoan">
                    <a
                      className={`mt-[16px] text-black text-[16px] hover:font-bold hover:text-green-600 ${
                        isCurrentLink(
                          '/thong-tin-ca-nhan/xac-thuc-tai-khoan'
                        ) && 'font-bold text-green-600'
                      } `}
                    >
                      Xác thực tài khoản
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
