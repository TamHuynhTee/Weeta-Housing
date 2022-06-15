import { DEFAULT_AVATAR, ENUM_SOCIAL_LOGIN } from '@/constants/base.constants';
import { checkAccountExistService } from '@/services/apis/Auth';
import { useAuth } from '@/stores/Auth';
import { useRouter } from 'next/router';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

const FacebookLoginButton = ({
  openModal,
}: {
  openModal: (data: any, type: ENUM_SOCIAL_LOGIN) => void;
}) => {
  const [, actionAuth] = useAuth();
  const router = useRouter();

  const handleCallBack = async (userInfo: ReactFacebookLoginInfo) => {
    if (userInfo && userInfo.email) {
      const result = await checkAccountExistService(userInfo.email);
      if (result.data.isExist) {
        openModal(userInfo, ENUM_SOCIAL_LOGIN.FACEBOOK);
      } else {
        const result = await actionAuth.loginWithFacebookAsync({
          email: userInfo.email,
          fullname: userInfo.name || '',
          avatar: userInfo.picture?.data.url || DEFAULT_AVATAR,
        });
        if (result) {
          router.push('/');
        }
      }
    }
  };

  return (
    <div className="">
      <FacebookLogin
        appId={process.env.FACEBOOK_APP_ID as string}
        autoLoad={false}
        callback={handleCallBack}
        fields="name,email,picture"
        icon="fa-facebook"
        textButton="Đăng nhập bằng Facebook"
        cssClass="h-[40px] p-[10px] text-white flex gap-2 items-center justify-center bg-[rgb(59_89_152)] font-bold rounded-[3px]"
      />
    </div>
  );
};

export default FacebookLoginButton;
