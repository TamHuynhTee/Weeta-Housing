import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/helpers/base.helpers';
import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import { getInfoByTokenService, loginService } from '@/services/apis/Auth';
import { IReqLogin } from '@/services/apis/Auth/Auth.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const loginAsync = (payload: IReqLogin) => async () => {
  const result = await loginService(payload);
  console.log(result);
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
