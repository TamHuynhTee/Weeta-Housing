import { notifyError } from '@/helpers/toast.helpers';
import { useAuth } from '@/stores/Auth';
import React from 'react';

const BoxLessorAccount = () => {
  const [stateAuth] = useAuth();

  console.log('stateAuth', stateAuth.auth);
  const data = stateAuth.auth;

  return (
    <div className="container_shadow">
      <p className="text-black-100 text-[24px] font-bold">Tài khoản môi giới</p>
      <div className="mt-[20px]">
        {!data?.isAutoApproved ? (
          <>
            <div className="bg-bg-warning text-text-warning p-[10px]">
              Hãy xác thực <span className="font-bold">CMND</span> để đăng bài
              không phải chờ duyệt.
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-[10px]">
              <InputImage name="front" />
              <InputImage name="back" />
            </div>
          </>
        ) : (
          <div className="bg-green-100 text-green-500 p-[10px]">
            Tài khoản của bạn đã được xác thực{' '}
            <span className="font-bold">CMND</span>.
          </div>
        )}
      </div>
      <div className="mt-[20px]"></div>
    </div>
  );
};

const InputImage = ({ name }: { name: string }) => {
  const [image, setImage] = React.useState<File | undefined>(undefined);

  const handlePickImages = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (/image\/.*/.test(file?.type || '')) {
      setImage(file);
    } else notifyError('Vui lòng chọn đúng định dạng ảnh');
  };

  return (
    <>
      <div className="border-dashed w-[300px] h-[300px] mt-[10px] border-gray-300 rounded-[3px] border-2 flex justify-center items-center">
        <label
          className="h-full w-full cursor-pointer"
          htmlFor="article_images"
        >
          <img
            src={
              image
                ? (URL || webkitURL).createObjectURL(image)
                : '/icons/ic_add.png'
            }
            alt="add_image"
            className="w-full h-full object-contain"
          />
        </label>
        <input
          type="file"
          //   {...register}
          //   name={name}
          id={name}
          hidden
          accept="image/*"
          onChange={handlePickImages}
        />
      </div>
    </>
  );
};

export default BoxLessorAccount;
