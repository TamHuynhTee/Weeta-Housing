import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  closeModal: () => void;
}

const ModalFullOfArticle = (props: Props) => {
  const { closeModal } = props;
  const router = useRouter();

  const handleConfirm = () => {
    router.push('/goi-thanh-vien');
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[300px]">
      <p className="text-[24px] font-bold text-center mb-[16px]">Thông báo</p>
      <p className="text-[18px] font-semibold text-black-100 text-center mb-[40px]">
        Bạn đã hết lượt đăng tin, vui lòng nâng cấp gói tài khoản hoặc chờ qua
        tháng tiếp theo để tiếp tục.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="button-outline-primary-grey w-full col-span-1"
          onClick={closeModal}
        >
          Hủy
        </button>
        <button
          className="button-primary w-full col-span-1"
          onClick={handleConfirm}
        >
          Nâng cấp tài khoản
        </button>
      </div>
    </div>
  );
};

export default ModalFullOfArticle;
