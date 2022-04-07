import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/helpers/base.helpers';
import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import {
  forgotPasswordService,
  getInfoByTokenService,
  loginService,
  registerAccountService,
} from '@/services/apis/Auth';
import {
  IReqLogin,
  IReqRegisterAccount,
} from '@/services/apis/Auth/Auth.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const loginAsync = (payload: IReqLogin) => async () => {
  const result = await loginService(payload);
  if (result.code !== 200) {
    notifyError('Email hoặc mật khẩu không hợp lệ');
    return false;
  } else {
    saveToLocalStorage('token', result.data.token);
    notifySuccess('Đăng nhập thành công');
    // localStorage.setItem('token', result.data.token);
    return true;
  }
};

export const registerAccountAsync =
  (payload: IReqRegisterAccount) => async () => {
    const result = await registerAccountService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess('Đăng ký tài khoản thành công');
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const forgotPasswordAsync =
  (payload: IReqRegisterAccount) => async () => {
    const result = await forgotPasswordService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess('Gửi thành công, vui lòng kiểm tra email.');
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const checkAuth =
  () =>
  async ({ setState, getState }: Actions) => {
    const token = getFromLocalStorage('token');
    if (token) {
      const result = await getInfoByTokenService();
      if (result.error) {
        setState({ ...getState(), isLoggedIn: false });
        return false;
      }
      setState({
        ...getState(),
        auth: result.data.account,
        isLoggedIn: true,
      });
      return true;
    } else {
      setState({ ...getState(), isLoggedIn: false });
      return false;
    }
  };
