import InputCheckbox from '@/components/common/InputCheckbox';
import SingleImagePicker from '@/components/common/SingleImagePicker';
import { notifyError } from '@/helpers/toast.helpers';
import { useAuth } from '@/stores/Auth';
import React from 'react';
import { useForm } from 'react-hook-form';

const BoxLessorAccount = () => {
  const [stateAuth, actionAuth] = useAuth();

  const { register, handleSubmit, setValue } = useForm();

  const data = stateAuth.auth;

  const handleUpload = async (data: any) => {
    const { accept, ...files } = data;
    if (!accept) {
      notifyError('Vui lòng chọn ô xác nhận');
      return;
    }
    await actionAuth.uploadIDCardAsync({ files: Object.values(files) });
  };

  return (
    <div className="container_shadow">
      <p className="text-black-100 text-[24px] font-bold">Tài khoản môi giới</p>
      <div className="mt-[20px]"></div>
      <div className="mt-[20px]">
        {data?.isAutoApproved ? (
          <div className="bg-green-100 text-green-500 p-[10px]">
            Tài khoản của bạn đã được xác thực{' '}
            <span className="font-bold">CMND</span>.
          </div>
        ) : (data?.IDCard.length || 0) > 0 ? (
          <div className="bg-sky-50 text-sky-500 p-[10px]">
            <span className="font-bold">CMND</span> của bạn đang đợi duyệt.
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleUpload)}>
            <div className="bg-bg-warning text-text-warning p-[10px]">
              Hãy xác thực <span className="font-bold">CMND</span> để đăng bài
              không phải chờ duyệt.
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-[10px]">
              <SingleImagePicker name="front" setValue={setValue} />
              <SingleImagePicker name="back" setValue={setValue} />
            </div>
            <InputCheckbox
              register={register('accept')}
              className="mt-[10px]"
              name="accept"
              label="Tôi cam kết chịu trách nhiệm về xác thực của mình"
            />
            <button className="button-primary">Xác thực</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BoxLessorAccount;
