/*
  - NHẬN VÀO COMPONENT, XỬ LÍ LOGIC VÀ RETURN VỀ COMPONENT. MỤC ĐÍCH  AUTHENTICAION
*/

/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ROLE } from '../constants/base.constants';
import { useAuth } from '../stores/Auth';
const Authentication = (
  SpecificComponent: any,
  option: {
    requiredLogin: boolean;
  },
  adminRoute?: ROLE.OWNER | ROLE.USER
) => {
  function AuthenticationCheck(props: any) {
    const { requiredLogin } = option;
    const router = useRouter();
    const [stateAuth, actionAuth] = useAuth();

    const fetchAuth = async () => {
      const isLogin = await actionAuth.checkAuth();
      //   if (isLogin) actionAuth.getMyInfoAsync();
      if (!isLogin) {
        if (requiredLogin === true) {
          router.push('/dang-nhap');
        }
      } else {
        if (adminRoute) {
          //check admin here
          router.push('/');
        } else {
          //   if (requiredLogin === false) {
          //     router.push('/');
          //   }
        }
      }
    };
    useEffect(() => {
      fetchAuth();
      //To know my current status, send Auth request
    }, []);
    //Đã có login
    if (requiredLogin) {
      if (stateAuth.isLoggedIn) {
        return <SpecificComponent {...props} />;
      } else {
        return <div>Loading...</div>;
      }
    } else {
      return <SpecificComponent {...props} />;
    }
  }
  return AuthenticationCheck;
};
export default Authentication;
