import InputField from '@/components/common/InputField';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

enum Result_Type {
  LOADING = 0,
  SUCCESS = 1,
  FAILED = 2,
}

const schema = yup.object().shape({
  password: yup.string().required('Mật khẩu không được để trống'),
  confirmPassword: yup
    .string()
    .required('Chưa xác nhận mật khẩu')
    .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống nhau'),
});

const ResetPassword = () => {
  const router = useRouter();
  const [result, setResult] = React.useState<Result_Type>(Result_Type.FAILED);
  const [, actionAuth] = useAuth();
  const token = router.query.token as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    const result = await actionAuth.resetPasswordAsync({
      token: token,
      password: data.password,
    });
    if (result) setResult(Result_Type.SUCCESS);
    else setResult(Result_Type.FAILED);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Tạo mật khẩu mới</title>
      </Head>
      <div className="w-full min-h-[100vh] px-[50px] flex justify-center items-center">
        <div className="min-w-[40%] min-h-[300px]">
          <div className="p-[30px] w-full">
            {result === Result_Type.LOADING && (
              <form
                className="mt-[25px] max-w-[500px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <InputField
                    type="password"
                    register={register('password')}
                    name="password"
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu"
                    errors={errors}
                  />
                </div>
                <div className="my-[20px]">
                  <InputField
                    type="password"
                    register={register('confirmPassword')}
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    errors={errors}
                  />
                </div>
                <button
                  className="w-full bg-[rgb(0_132_137)] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
                  type="submit"
                >
                  Đổi mật khẩu
                </button>
              </form>
            )}
            {result === Result_Type.SUCCESS && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={'/icons/ic_success_check.png'}
                  className="w-[30px] h-[30px] object-cover"
                  alt="success"
                />
                {/* <Image
                  src={'/icons/ic_success_check.png'}
                  alt="success"
                  width={30}
                  height={30}
                /> */}
                <p className="my-[30px] text-[18px]">
                  Mật khẩu được cập nhật thành công.
                </p>
                <Link href={'/dang-nhap'}>
                  <a type="button" className="button-primary">
                    Đăng nhập
                  </a>
                </Link>
              </div>
            )}
            {result === Result_Type.FAILED && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src={'/icons/ic_failed_cross.png'}
                  className="w-[30px] h-[30px]"
                  alt="failed"
                />
                {/* <Image
                  src={'/icons/ic_failed_cross.png'}
                  alt="failed"
                  width={30}
                  height={30}
                /> */}
                <p className="my-[30px] text-[18px] text-center">
                  Đổi mật khẩu không thành công, có lỗi xảy ra.{' '}
                  <a
                    className="cursor-pointer"
                    onClick={() => setResult(Result_Type.LOADING)}
                  >
                    Thử lại
                  </a>
                </p>
                <Link href={'/'}>
                  <a type="button" className="button-outline-primary">
                    Trở về trang chủ
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
