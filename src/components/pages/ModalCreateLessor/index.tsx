import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  closeModal: () => void;
}

const ModalCreateLessor = (props: Props) => {
  const { closeModal } = props;
  const router = useRouter();

  const handleConfirm = () => {
    router.push('/nhap-so-dien-thoai');
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[300px]">
      <p className="text-[24px] font-bold text-center mb-[16px]">
        Bạn đang ở tài khoản người dùng
      </p>
      <p className="text-[18px] font-semibold text-black-100 text-center mb-[40px]">
        Bạn có muốn đăng ký trở thành người cho thuê trọ không ?
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
          Đồng ý
        </button>
      </div>
    </div>
  );
};

export default ModalCreateLessor;
