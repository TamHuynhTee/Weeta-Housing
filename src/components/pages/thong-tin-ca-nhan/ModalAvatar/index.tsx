import { DEFAULT_AVATAR } from '@/constants/base.constants';
import { isFileImage } from '@/helpers/base.helpers';
import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import React from 'react';

interface ModalAvatarProps {
  closeModal: () => void;
}

const ModalAvatar = (props: ModalAvatarProps) => {
  const { closeModal } = props;
  const avatarRef = React.useRef<any>(null);

  const handleChangeAvatar = async (e: any) => {
    if (isFileImage(e.target.files[0])) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e: any) {
          document
            .getElementById(`upload_img_avatar`)!
            .setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        notifySuccess(`Upload ảnh thành công`);
      }
    } else {
      notifyError(`Vui lòng chọn file ảnh`);
    }
  };

  const handleSaveAvatar = async () => {
    console.log('changed', avatarRef.current.files);
    closeModal();
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[12px] min-w-[300px]">
      <p className="mt-[16px] text-[20px] font-bold text-black-100 text-center">
        Đổi ảnh đại diện
      </p>
      <div className="my-[25px]">
        <label htmlFor={'upload_avatar'}>
          <div className="flex justify-center">
            <div className="border-[1px] border-[#5EA199] w-[200px] h-[200px] rounded-[50%] cursor-pointer">
              <img
                src={DEFAULT_AVATAR}
                id={`upload_img_avatar`}
                className="w-full h-full object-cover rounded-[50%]"
                alt="upload-default"
              />
            </div>
          </div>
        </label>
        <input
          type="file"
          id={'upload_avatar'}
          ref={avatarRef}
          hidden
          onChange={handleChangeAvatar}
        />
        <div className="w-full flex justify-center mt-[15px]">
          <button className="button-primary " onClick={handleSaveAvatar}>
            Đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAvatar;
