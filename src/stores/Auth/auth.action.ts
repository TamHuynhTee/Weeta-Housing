import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/helpers/base.helpers';
import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import {
  changePasswordService,
  forgotPasswordService,
  getInfoByTokenService,
  loginService,
  registerAccountService,
  updateAvatarService,
  updateProfileService,
} from '@/services/apis/Auth';
import {
  IReqChangePassword,
  IReqLogin,
  IReqRegisterAccount,
  IReqUpdateAccount,
  IReqUpdateAvatar,
} from '@/services/apis/Auth/Auth.interface';
import { State } from '.';
import { DEFAULT_SERVER_ERROR_MESSAGE } from '..';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const loginAsync = (payload: IReqLogin) => async () => {
  const result = await loginService(payload);
  if (result.error !== undefined) {
    if (!result.error) {
      saveToLocalStorage('token', result.data.token);
      notifySuccess('Đăng nhập thành công');
      return true;
    }
    notifyError('Email hoặc mật khẩu không hợp lệ');
    return false;
  }
  notifyError(DEFAULT_SERVER_ERROR_MESSAGE);
  return false;
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

export const changePasswordAsync =
  (payload: IReqChangePassword) => async () => {
    const result = await changePasswordService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess('Đổi mật khẩu thành công');
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getInfoByTokenAsync =
  () =>
  async ({ setState, getState }: Actions) => {
    const token = getFromLocalStorage('token');
    if (token) {
      const result = await getInfoByTokenService();
      if (result.error !== undefined) {
        if (!result.error) {
          setState({
            ...getState(),
            auth: result.data,
            isLoggedIn: true,
            role: result.data.role,
          });
          return true;
        }
      }
      setState({ ...getState(), isLoggedIn: false, auth: undefined });
      return false;
    } else {
      setState({ ...getState(), isLoggedIn: false, auth: undefined });
      return false;
    }
  };

export const getInfoAsync =
  () =>
  async ({ setState, getState }: Actions) => {
    const result = await getInfoByTokenService();
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          auth: result.data,
          isLoggedIn: true,
          role: result.data.role,
        });
      }
    }
    setState({ ...getState(), isLoggedIn: false, auth: undefined });
  };

export const updateProfileAsync =
  (payload: Partial<IReqUpdateAccount>) =>
  async ({ setState, getState }: Actions) => {
    const result = await updateProfileService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          auth: result.data,
        });
        notifySuccess('Cập nhật thông tin thành công');
      }
    }
    notifyError(DEFAULT_SERVER_ERROR_MESSAGE);
  };

export const updateAvatarAsync =
  (payload: IReqUpdateAvatar) =>
  async ({ setState, getState }: Actions) => {
    const result = await updateAvatarService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          auth: result.data,
        });
        notifySuccess('Cập nhật ảnh đại diện thành công');
        return true;
      }
    }
    notifyError(DEFAULT_SERVER_ERROR_MESSAGE);
    return false;
  };

export const logoutAsync =
  (): any =>
  async ({ setState, getState }: Actions) => {
    localStorage.removeItem('token');
    setState({
      ...getState(),
      isLoggedIn: false,
      auth: undefined,
    });
    return true;
  };
