import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaForgotPass = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Không nhập làm sao lấy lại mật khẩu nè'),
});

const ForgotPassPage = () => {
  const [, actionAuth] = useAuth();
  const [showForm, setShowForm] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaForgotPass) });

  const handleSubmitSendMail = async (data: any) => {
    const result = await actionAuth.forgotPasswordAsync(data);
    if (result) {
      setShowForm(false);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Quên mật khẩu</title>
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
          {showForm ? (
            <>
              <div className="mt-[20px]">
                <h2 className="text-[36px] md:text-center font-bold lg:text-[28px]">
                  Để chúng tôi giúp bạn
                </h2>
                <p className="mt-[10px] text-[18px] md:text-center font-semibold text-[rgb(119_119_119)]">
                  Nhập email của bạn để lấy lại mật khẩu nhé
                </p>
              </div>
              <form
                className="mt-[25px]"
                onSubmit={handleSubmit(handleSubmitSendMail)}
              >
                <div className="mb-[30px]">
                  <InputField
                    type="email"
                    register={register('email')}
                    name="email"
                    label="Email"
                    errors={errors}
                    placeholder="Email của bạn"
                  />
                </div>
                <button
                  className="w-full bg-[rgb(0_132_137)] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
                  type="submit"
                >
                  Gửi
                </button>
              </form>
              <div className="mt-[30px] flex justify-center">
                Bạn nhớ mật khẩu rồi à?{' '}
                <Link href={`/dang-nhap`}>
                  <a className="text-[rgb(0_132_137)] ml-[5px] hover:no-underline hover:border-b-0">
                    <div>
                      <p className="text-[15px] font-bold">Đăng nhập</p>
                    </div>
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <div className="mt-[20px]">
              <h2 className="text-[24px] md:text-center font-normal lg:text-[28px]">
                Chúng tôi đã gửi link đổi mật khẩu mới đến mail của bạn, hãy
                kiểm tra ngay nhé
              </h2>
              <Link href={`https://mail.google.com/mail/u/0/`}>
                <a
                  target={'_blank'}
                  className="w-full mt-[20px] bg-[rgb(0_132_137)] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
                  type="button"
                >
                  Mở mail
                </a>
              </Link>
            </div>
          )}
        </div>
        <div className="relative flex-1 h-full md:bg-none bg-[url('/images/login_background.png')] bg-center"></div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPassPage;
