import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaCreateOTP = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Chưa nhập số điện thoại')
    .matches(
      /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
      'Số điện thoại không hợp lệ'
    ),
});

const CreateOTPPage = () => {
  const [, actionAuth] = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaCreateOTP) });

  const handleSendPhoneNumber = async (data: any) => {
    const { phoneNumber } = data;
    const formatted = phoneNumber.replace(phoneNumber[0], '+84');
    const result = await actionAuth.registerLessorAsync({
      phoneNumber: formatted,
    });
    if (result.success) {
      router.push(
        `/xac-thuc-otp?phoneNumber=${formatted}&token=${result.token}`
      );
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Nhập số điện thoại</title>
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
                <h3 className="text-[24px] font-bold text-baseColor ml-[10px]">
                  Weeta Housing
                </h3>
              </div>
            </a>
          </Link>
          <div className="mt-[20px]">
            <h2 className="text-[36px] md:text-center font-bold lg:text-[28px]">
              Nhập số điện thoại
            </h2>
            <p className="mt-[10px] text-[18px] md:text-center font-semibold text-[rgb(119_119_119)]">
              Hãy nhập số điện thoại của bạn để chúng tôi gửi mã xác thực
            </p>
          </div>
          <form
            className="mt-[25px]"
            onSubmit={handleSubmit(handleSendPhoneNumber)}
          >
            <div>
              <InputField
                type="number"
                register={register('phoneNumber')}
                name="phoneNumber"
                label="Điền số điện thoại"
                errors={errors}
                placeholder="+84 ..."
              />
            </div>
            <button
              className="w-full bg-[rgb(0_132_137)] mt-[20px] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
              type="submit"
            >
              Gửi
            </button>
          </form>
        </div>
        <div className="relative flex-1 h-full md:bg-none bg-[url('/images/login_background.png')] bg-center"></div>
      </div>
    </React.Fragment>
  );
};

export default CreateOTPPage;
