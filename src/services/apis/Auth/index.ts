import { ACCOUNT_MODEL } from '@/models/Account.model';
import { RouteApi } from '../../../constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import {
  IReqChangePassword,
  IReqForgotPassword,
  IReqLogin,
  IReqRegisterAccount,
  IReqResetPassword,
  IReqUpdateAccount,
  IReqUpdateAvatar,
} from './Auth.interface';
import { resLogin } from './Auth.type';

const url = RouteApi.auth;

export const loginService = (
  payload: IReqLogin
): Promise<ReturnResponse<resLogin>> => {
  return API.post(`${url}/login`, {
    body: { ...payload },
  }) as any;
};

export const registerAccountService = (
  payload: IReqRegisterAccount
): Promise<ReturnResponse<any>> => {
  return API.post(`${`account`}/signup`, {
    body: { ...payload },
  }) as any;
};

export const forgotPasswordService = (
  payload: IReqForgotPassword
): Promise<ReturnResponse<any>> => {
  return API.get(`${url}/forgot-password/${payload.email}`) as any;
};

export const changePasswordService = (
  payload: IReqChangePassword
): Promise<ReturnResponse<any>> => {
  return API.put(`${url}/change-password`, { body: { ...payload } }) as any;
};

export const getInfoByTokenService = (): Promise<
  ReturnResponse<ACCOUNT_MODEL>
> => {
  return API.get(`${url}/get-profile`);
};

export const updateProfileService = (
  payload: Partial<IReqUpdateAccount>
): Promise<ReturnResponse<ACCOUNT_MODEL>> => {
  return API.put(`${url}/update-profile`, { body: { ...payload } });
};

export const updateAvatarService = (
  payload: IReqUpdateAvatar
): Promise<ReturnResponse<ACCOUNT_MODEL>> => {
  //   console.log(`payload`, payload);
  return API.postFormDataFile(`${url}/update-avatar`, { body: { ...payload } });
};

export const verifyEmailService = (params: {
  token: string;
}): Promise<ReturnResponse<any>> => {
  //   console.log(`payload`, payload);
  return API.get(`${url}/verify-email`, { ...params });
};

export const resetPasswordService = (
  payload: IReqResetPassword
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/reset-password`, { body: { ...payload } });
};

export const saveArticleService = (
  articleId: string
): Promise<ReturnResponse<ACCOUNT_MODEL>> => {
  return API.get(`${`account`}/save-article/${articleId}`) as any;
};
