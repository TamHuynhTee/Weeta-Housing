import InputCheckbox from '@/components/common/InputCheckbox';
import { notifyError } from '@/helpers/toast.helpers';
import { useAuth } from '@/stores/Auth';
import React from 'react';
import { useForm } from 'react-hook-form';

const BoxLessorAccount = () => {
  const [stateAuth] = useAuth();

  const { register } = useForm();

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
            <InputCheckbox
              register={register('accept')}
              className="mt-[10px]"
              name="accept"
              label="Tôi cam kết chịu trách nhiệm về xác thực của mình"
            />
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
      <div className="border-dashed bg-gray-100 w-[300px] h-[300px] mt-[10px] border-gray-300 rounded-[10px] border-2 flex justify-center items-center">
        <label
          className="h-full w-full cursor-pointer active:scale-95"
          htmlFor={name}
        >
          <img
            src={
              image
                ? (URL || webkitURL).createObjectURL(image)
                : '/icons/ic_add_image.png'
            }
            alt="add_image"
            className="w-full h-full object-contain rounded-[10px]"
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
