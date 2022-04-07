import { accountModel } from '@/models/Account.model';
import { RouteApi } from '../../../constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import {
  IReqForgotPassword,
  IReqLogin,
  IReqRegisterAccount,
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
  return API.post(`${url}/signup`, {
    body: { ...payload },
  }) as any;
};

export const forgotPasswordService = (
  payload: IReqForgotPassword
): Promise<ReturnResponse<any>> => {
  return API.get(`${url}/forgot-password/${payload.email}`) as any;
};

export const getInfoByTokenService = (): Promise<
  ReturnResponse<{ account: accountModel }>
> => {
  return API.get(`account/get-account`);
};
