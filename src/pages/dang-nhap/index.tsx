import ContainerModal from '@/components/common/ContainerModal';
import FacebookLoginButton from '@/components/common/FacebookLoginButton';
import InputField from '@/components/common/InputField';
import ToggleSwitch from '@/components/common/ToggleSwitch';
import { ENUM_SOCIAL_LOGIN } from '@/constants/base.constants';
import { useScript } from '@/hooks/useScript';
import { checkAccountExistService } from '@/services/apis/Auth';
import { useAuth } from '@/stores/Auth';
import { yupResolver } from '@hookform/resolvers/yup';
import jwtDecode from 'jwt-decode';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  //   phone: yup
  //     .string()
  //     .required('Chưa nhập số điện thoại')
  //     .matches(
  //       /(84|0[3|5|7|8|9|1|2|4|6])+([0-9]{8})\b/,
  //       'Số điện thoại không hợp lệ'
  //     ),
  password: yup.string().required('Mật khẩu không được để trống'),
});

const LoginPage = () => {
  const [, actionAuth] = useAuth();
  const [modalOverride, setModalOverride] = React.useState({
    visible: false,
    data: undefined,
    type: ENUM_SOCIAL_LOGIN.GOOGLE,
  });

  const openModal = (data: any, type: ENUM_SOCIAL_LOGIN) =>
    setModalOverride({ visible: true, data: data, type });
  const closeModal = () =>
    setModalOverride({ ...modalOverride, visible: false, data: undefined });

  const router = useRouter();

  const handleLoginWithGoogle = async (
    e: google.accounts.id.CredentialResponse
  ) => {
    const info = jwtDecode(e.credential) as any;
    if (info && info.email) {
      const result = await checkAccountExistService(info.email);
      if (result.data.isExist) {
        openModal(info, ENUM_SOCIAL_LOGIN.GOOGLE);
      } else {
        const result = await actionAuth.loginWithGoogleAsync({
          email: info.email,
          fullname: info.name,
          avatar: info.picture,
        });
        if (result) {
          router.push('/');
        }
      }
    }
  };

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      callback: handleLoginWithGoogle,
      auto_select: false,
    });

    window.google.accounts.id.renderButton(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById('google_sign_in_button')!,
      { theme: 'outline', type: 'standard', size: 'large' }
    );
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaLogin) });

  const handleSubmitLogin = async (data: any) => {
    const { email, password } = data;
    // console.log(`email`, email);
    const result = await actionAuth.loginAsync({ email, password });
    if (result) {
      router.push('/');
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Đăng nhập</title>
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
              Chào mừng trở lại
            </h2>
            <p className="mt-[10px] text-[18px] md:text-center font-semibold text-[rgb(119_119_119)]">
              Hãy đăng nhập để tiếp tục nhé
            </p>
          </div>
          <form
            className="mt-[25px]"
            onSubmit={handleSubmit(handleSubmitLogin)}
          >
            <div>
              <InputField
                type="email"
                register={register('email')}
                name="email"
                label="Email"
                errors={errors}
                placeholder="Cho xin cái email"
              />
            </div>
            {/* <div>
              <InputField
                type="text"
                register={register('phone')}
                name="phone"
                label="Số điện thoại"
                errors={errors}
                placeholder="Nhập số điện thoại để đăng nhập"
              />
            </div> */}
            <div className="mt-[20px]">
              <InputField
                type="password"
                register={register('password')}
                name="password"
                label="Mật khẩu"
                placeholder="Nhập cho đúng nha"
                errors={errors}
              />
            </div>
            <div className="my-[30px] flex justify-between items-center">
              <ToggleSwitch
                registerForm={register('rememberMe')}
                idToggleSw={'rememberMe'}
                labelText="Giữ đăng nhập"
                defaultChecked={false}
              />
              <Link href={`/quen-mat-khau`}>
                <a className="hover:no-underline hover:border-b-0">
                  <div>
                    <p className="text-[rgb(0_132_137)] text-[15px] font-bold">
                      Quên mật khẩu ?
                    </p>
                  </div>
                </a>
              </Link>
            </div>
            <button
              className="w-full bg-[rgb(0_132_137)] text-[17px] text-white items-center h-[57px] font-bold flex justify-center rounded-[3px]"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>
        <div className="relative flex-1 h-full md:bg-none bg-[url('/images/login_background.png')] bg-center">
          <div className="absolute top-[20%] w-full md:static mb-[20px]">
            <div className="px-[150px] w-full">
              <div className="mb-[20px] flex items-center px-[30px]">
                <div className="h-[1px] flex-1 bg-white md:bg-[rgb(119_119_119)]"></div>
                <span className="text-center font-bold text-white md:text-[rgb(119_119_119)] px-[30px]">
                  Hoặc
                </span>
                <div className="h-[1px] flex-1 bg-white md:bg-[rgb(119_119_119)]"></div>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <div id="google_sign_in_button"></div>
                <FacebookLoginButton openModal={openModal} />
              </div>
              <div className="mt-[30px] flex justify-center">
                Bạn chưa có tài khoản?{' '}
                <Link href={`/dang-ky`}>
                  <a className="text-white md:text-[rgb(0_132_137)] ml-[5px] hover:no-underline hover:border-b-0">
                    <div>
                      <span className="text-[15px] font-bold">Đăng ký</span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ContainerModal
          isVisible={modalOverride.visible}
          closeModal={closeModal}
        >
          <ModalOverrideAccount
            closeModal={closeModal}
            data={modalOverride.data}
            social_type={modalOverride.type}
          />
        </ContainerModal>
      </div>
    </React.Fragment>
  );
};

const ModalOverrideAccount = ({
  closeModal,
  data,
  social_type,
}: {
  closeModal: () => void;
  data: any;
  social_type: ENUM_SOCIAL_LOGIN;
}) => {
  const [, actionAuth] = useAuth();
  const router = useRouter();

  const handleConfirm = async () => {
    if (data) {
      const payload = {
        email: data.email,
        fullname: data.name,
        avatar: data.picture,
      };
      let result;
      if (social_type === ENUM_SOCIAL_LOGIN.GOOGLE) {
        result = await actionAuth.loginWithGoogleAsync(payload);
      }
      if (social_type === ENUM_SOCIAL_LOGIN.FACEBOOK) {
        result = await actionAuth.loginWithFacebookAsync(payload);
      }
      if (result) {
        router.push('/');
      }
    }
  };

  return (
    <div className="px-[18px] py-[25px] bg-white rounded-[5px] min-w-[300px]">
      <p className="text-[24px] font-bold text-center mb-[16px]">Thông báo</p>
      <p className="text-[18px] font-semibold text-black-100 text-center mb-[30px]">
        Hiện email của tài khoản này đã được tạo trên hệ thống, chọn đồng ý thì
        thông tin người dùng của{' '}
        <span className="uppercase font-bold text-baseColor">
          {social_type}
        </span>{' '}
        sẽ thay thế thông tin cá nhân tài khoản của bạn, bạn có muốn tiếp tục
        không?
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="button-outline-primary-grey w-full col-span-1"
          onClick={closeModal}
        >
          Hủy
        </button>
        <button
          className="button-primary w-full col-span-1"
          onClick={handleConfirm}
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
