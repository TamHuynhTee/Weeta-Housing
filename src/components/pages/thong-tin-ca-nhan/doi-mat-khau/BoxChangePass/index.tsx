import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Chưa nhập mật khẩu cũ'),
  newPassword: yup.string().required('Chưa nhập mật khẩu mới'),
  confirmPassword: yup
    .string()
    .required('Chưa xác nhận mật khẩu')
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu phải giống nhau'),
});

const BoxChangePass = () => {
  const [, actionAuth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChangePass = async (data: any) => {
    delete data.confirmPassword;
    const result = await actionAuth.changePasswordAsync(data);
    if (result) {
    }
  };

  return (
    <div className="container_shadow">
      <form className="w-full" onSubmit={handleSubmit(handleChangePass)}>
        <p className="text-black-100 text-[24px] font-bold">Đổi mật khẩu</p>
        <div className="mt-[20px]">
          <InputField
            type="password"
            register={register('oldPassword')}
            name="oldPassword"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu nha"
            errors={errors}
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="password"
            register={register('newPassword')}
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Chọn mật khẩu mới đi nè"
            errors={errors}
          />
        </div>
        <div className="mt-[20px]">
          <InputField
            type="password"
            register={register('confirmPassword')}
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu nha"
            errors={errors}
          />
        </div>
        <input
          type="submit"
          className="button-primary w-32 mt-[30px] h-[40px] md:mt-[20px] md:h-[30px]"
          value="Xác nhận"
        />
      </form>
    </div>
  );
};

export default BoxChangePass;
