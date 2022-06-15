import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '@/helpers/base.helpers';
import { notifyError, notifySuccess } from '@/helpers/toast.helpers';
import {
  changePasswordService,
  forgotPasswordService,
  getInfoByTokenService,
  loginFacebookService,
  loginGoogleService,
  loginService,
  registerAccountService,
  resetPasswordService,
  saveArticleService,
  updateAvatarService,
  updateProfileService,
  verifyEmailService,
} from '@/services/apis/Auth';
import {
  IReqChangePassword,
  IReqLogin,
  IReqLoginSocial,
  IReqRegisterAccount,
  IReqResetPassword,
  IReqUpdateAccount,
  IReqUpdateAvatar,
} from '@/services/apis/Auth/Auth.interface';
import {
  registerLessorService,
  uploadIDCardService,
  verifyOTPService,
} from '@/services/apis/Lessor';
import {
  IReqSendOPT,
  IReqUploadIDCard,
  IReqVerifyOPT,
} from '@/services/apis/Lessor/Lessor.interface';
import { State } from '.';
import { DEFAULT_SERVER_ERROR_MESSAGE } from '..';
import socketService from '@/services/sockets/baseSocket';
import { getListSaveArticleService } from '@/services/apis/Article';
import { IParamGetArticle } from '@/services/apis/Article/Article.interface';

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
  notifyError(result.message);
  return false;
};

export const loginWithGoogleAsync = (payload: IReqLoginSocial) => async () => {
  const result = await loginGoogleService(payload);
  if (result.error !== undefined) {
    if (!result.error) {
      saveToLocalStorage('token', result.data.token);
      notifySuccess('Đăng nhập thành công');
      return true;
    }
    notifyError(result.message);
    return false;
  }
  notifyError(result.message);
  return false;
};

export const loginWithFacebookAsync =
  (payload: IReqLoginSocial) => async () => {
    const result = await loginFacebookService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        saveToLocalStorage('token', result.data.token);
        notifySuccess('Đăng nhập thành công');
        return true;
      }
      notifyError(result.message);
      return false;
    }
    notifyError(result.message);
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
        return;
      }
    }
    notifyError(result.message);
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
        return;
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
        const avatars = document.querySelectorAll('.user_avatar');
        avatars.forEach((e) => e.setAttribute('src', result.data.avatar));
        notifySuccess('Cập nhật ảnh đại diện thành công');
        return true;
      }
    }
    notifyError(DEFAULT_SERVER_ERROR_MESSAGE);
    return false;
  };

export const registerLessorAsync =
  (payload: IReqSendOPT) =>
  async ({}: Actions) => {
    const result = await registerLessorService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        return { success: true, token: result.data };
      }
      notifyError(result.message);
    }
    notifyError(DEFAULT_SERVER_ERROR_MESSAGE);
    return { success: false, token: undefined };
  };

export const verifyEmailAsync =
  (params: { token: string }) =>
  async ({}: Actions) => {
    const result = await verifyEmailService(params);
    if (result.error !== undefined) {
      if (!result.error) {
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const resetPasswordAsync =
  (payload: IReqResetPassword) =>
  async ({}: Actions) => {
    const result = await resetPasswordService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const saveArticleAsync =
  (articleId: string) =>
  async ({ setState, getState }: Actions) => {
    const result = await saveArticleService(articleId);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({ ...getState(), auth: result.data });
        notifySuccess(result.message);
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const uploadIDCardAsync =
  (payload: IReqUploadIDCard) =>
  async ({ setState, getState }: Actions) => {
    const result = await uploadIDCardService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        setState({ ...getState(), auth: result.data });
        notifySuccess('Đã gửi ảnh xác thực');
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const verifyOTPAsync =
  (payload: IReqVerifyOPT) =>
  async ({}: Actions) => {
    const result = await verifyOTPService(payload);
    if (result.error !== undefined) {
      if (!result.error) {
        notifySuccess(
          'Đăng ký thành công, giờ đây bạn có thể đăng bài cho thuê'
        );
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const logoutAsync =
  (): any =>
  async ({ setState, getState }: Actions) => {
    localStorage.removeItem('token');
    socketService.disconnect();
    setState({
      ...getState(),
      isLoggedIn: false,
      auth: undefined,
    });
    return true;
  };

export const setAppLoading =
  (loading: boolean) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      appLoading: loading,
    });
  };

export const getListSaveArticleAsync =
  (params: Partial<IParamGetArticle>) =>
  async ({ getState, setState, dispatch }: Actions) => {
    dispatch(setLoadingArticle(true));
    const result = await getListSaveArticleService(params);
    dispatch(setLoadingArticle(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          saveArticles: {
            ...getState().saveArticles,
            list: result.data.saveArticle,
            total: result.data.total,
            isOver: result.data.isOver,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

const setLoadingArticle =
  (loadingArticle: boolean) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      saveArticles: {
        ...getState().saveArticles,
        loading: loadingArticle,
      },
    });
  };
