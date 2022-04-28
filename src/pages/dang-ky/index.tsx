import ErrorText from '@/components/common/ErrorText';
import InputField from '@/components/common/InputField';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaRegister = yup.object().shape({
  username: yup.string().required('Tên đăng nhập không được để trống'),
  fullname: yup.string().required('Tên của bạn đừng để trống'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  phoneNumber: yup
    .string()
    .required('Chưa nhập số điện thoại')
    .matches(
      /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    ),
  password: yup.string().required('Mật khẩu không được để trống'),
  confirmPassword: yup
    .string()
    .required('Chưa xác nhận mật khẩu')
    .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
  agreedTerms: yup.boolean().oneOf([true], 'Chưa chấp nhận điều khoản'),
  // .required('Chưa chấp nhận điều khoản'),
});

const RegisterPage = () => {
  const [, actionAuth] = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaRegister) });

  const handleSubmitRegister = async (data: any) => {
    // console.log(data);
    const { agreedTerms, confirmPassword, ...payload } = data;
    // console.log(payload);
    if (agreedTerms) {
      delete data.confirmPassword;
      const result = await actionAuth.registerAccountAsync(payload);
      if (result) {
        router.push('/');
      }
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="w-[100vw] h-[100vh] flex md:flex-col">
        <div className="w-[40%] md:w-full h-full px-[60px] md:px-[90px] py-[30px] overflow-y-auto">
          <Link href={'/'}>
            <a>
              <div className="flex items-center">
                <div className="h-[20px] w-[20px]">
                  <img
                    src="/favicon.ico"
                    className="w-full h-full object-fill"
                    alt=""
                  />
                </div>
                <h3 className="text-[24px] font-bold text-[#85b6ff] ml-[10px]">
                  Weeta Housing
                </h3>
              </div>
            </a>
          </Link>
          <div className="mt-[20px]">
            <h2 className="text-[24px] md:text-center font-bold lg:text-[22px]">
              Chào mừng đến với <span className="">Weeta Housing</span>
            </h2>
            <p className="mt-[10px] text-[18px] md:text-center font-semibold text-[rgb(119_119_119)]">
              Hãy tạo tài khoản cho bạn nhé
            </p>
          </div>
          <form
            className="mt-[25px]"
            onSubmit={handleSubmit(handleSubmitRegister)}
          >
            <div>
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
                placeholder="Xin tên bạn nha"
              />
            </div>
            <div className="mt-[20px]">
              <InputField
                type="email"
                register={register('email')}
                name="email"
                label="Email"
                errors={errors}
                placeholder="Email đăng nhập"
              />
            </div>
            <div className="mt-[20px]">
              <InputField
                type="text"
                register={register('phoneNumber')}
                name="phoneNumber"
                label="Số điện thoại"
                errors={errors}
                placeholder="Cho xin số đê"
              />
            </div>
            <div className="mt-[20px]">
              <InputField
                type="password"
                register={register('password')}
                name="password"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu nha"
                errors={errors}
              />
            </div>
            <div className="mt-[20px]">
              <InputField
                type="password"
                register={register('confirmPassword')}
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu nha"
                errors={errors}
              />
            </div>
            <div className="my-[30px]">
              <ToggleSwitch
                registerForm={register('agreedTerms')}
                idToggleSw={'agreedTerms'}
                labelText={
                  <span>
                    Tôi đồng ý với{' '}
                    <a className="cursor-pointer text-[rgb(0_132_137)]">
                      Điều khoản sử dụng
                    </a>
                  </span>
                }
                defaultChecked={false}
                allowLabelClick={false}
              />
              <div className="mt-[10px]">
                {errors.agreedTerms && (
                  <ErrorText>{errors.agreedTerms.message}</ErrorText>
                )}
              </div>
            </div>
            <button
              className="w-full bg-[rgb(0_132_137)] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
              type="submit"
            >
              Đăng ký
            </button>
          </form>
          <div className="mt-[30px] flex justify-center">
            Bạn có tài khoản rồi à?{' '}
            <Link href={`/dang-nhap`}>
              <a className="text-[rgb(0_132_137)] ml-[5px] hover:no-underline hover:border-b-0">
                <div>
                  <span className="text-[15px] font-bold">Đăng nhập</span>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="relative flex-1 h-full md:bg-none bg-[url('/images/login_background.png')] bg-center"></div>
      </div>
    </React.Fragment>
  );
};

export default RegisterPage;
