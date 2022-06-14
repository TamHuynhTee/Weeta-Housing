import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
  return (
    <div className="">
      <FacebookLogin
        appId={process.env.FACEBOOK_APP_ID as string}
        autoLoad={false}
        callback={(userInfo) => console.log('userInfo', userInfo)}
        fields="name,email,picture"
        icon="fa-facebook"
        textButton="Đăng nhập bằng Facebook"
        cssClass="h-[40px] p-[10px] text-white flex gap-2 items-center justify-center bg-[rgb(59_89_152)] font-bold rounded-[3px]"
      />
    </div>
  );
};

export default FacebookLoginButton;
