import InputField from '@/components/common/InputField';
import LimitedTextArea from '@/components/common/LimitedTextArea';
import { useAuth } from '@/stores/Auth';
import React from 'react';
import { useForm } from 'react-hook-form';

const BoxProfile = () => {
  const [stateAuth, actionAuth] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  React.useEffect(() => {
    if (stateAuth.auth) {
      setValue('username', stateAuth.auth.username);
      setValue('fullname', stateAuth.auth.fullname);
      setValue('email', stateAuth.auth.email);
      setValue('phoneNumber', stateAuth.auth.phoneNumber);
      setValue('introduction', stateAuth.auth.introduction);
    }
  }, [stateAuth.auth, setValue]);

  const handleEditProfile = async (data: any) => {
    if (stateAuth.auth) {
      await actionAuth.updateProfileAsync(data);
    }
  };

  //   console.log(stateAuth.auth);

  return (
    <div className="container_shadow">
      <form className="w-full" onSubmit={handleSubmit(handleEditProfile)}>
        <p className="text-black-100 text-[24px] font-bold">
          Thông tin cá nhân
        </p>
        <div className="mt-[20px]">
          <InputField
            type="text"
            register={register('username')}
            name="username"
            label="Tên đăng nhập"
            errors={errors}
            placeholder="Username"
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="text"
            register={register('fullname')}
            name="fullname"
            label="Họ tên"
            errors={errors}
            placeholder="Họ tên của bạn"
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="email"
            register={register('email')}
            name="email"
            label="Email"
            errors={errors}
            placeholder="Email của bạn"
            disabled
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="text"
            register={register('phoneNumber')}
            name="phoneNumber"
            label="Số điện thoại"
            errors={errors}
            placeholder="Số điện thoại của bạn"
            disabled
          />
        </div>
        <div className="mt-[20px]">
          <label
            htmlFor="introduction"
            className="block font-semibold mb-[10px]"
          >
            Tự giới thiệu
          </label>
          <LimitedTextArea
            name="introduction"
            id="introduction"
            registerForm={register('introduction')}
            limit={600}
            value=""
            placeholder="Giới thiệu bản thân"
          />
        </div>
        <input
          type="submit"
          className="button-primary w-32 mt-[30px] h-[40px] md:mt-[20px] md:h-[30px]"
          value="Lưu"
        />
      </form>
    </div>
  );
};

export default BoxProfile;
