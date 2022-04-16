import InputField from '@/components/common/InputField';
import LimitedTextArea from '@/components/common/LimitedTextArea';
import { useForm } from 'react-hook-form';

const BoxProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEditProfile = async (data: any) => {
    console.log(data);
  };

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
