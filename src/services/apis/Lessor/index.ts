import { RouteApi } from '@/constants/routeApi.constants';
import { ACCOUNT_MODEL } from '@/models/Account.model';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import {
  IParamsGetListTransaction,
  IReqGetLessorArticles,
  IReqSendOPT,
  IReqUploadIDCard,
  IReqVerifyOPT,
} from './Lessor.interface';
import { resGetLessorArticles, resGetLessorTransactions } from './Lessor.type';

const url = RouteApi.lessor;

export const registerLessorService = (
  payload: IReqSendOPT
): Promise<ReturnResponse<string>> => {
  return API.post(`${url}/identifyPhoneNumber`, {
    body: { ...payload },
  }) as any;
};

export const verifyOTPService = (
  payload: IReqVerifyOPT
): Promise<ReturnResponse<any>> => {
  return API.post(`${url}/verifyOtp`, {
    body: { ...payload },
  }) as any;
};

export const getLessorArticleService = (
  params: Partial<IReqGetLessorArticles>
): Promise<ReturnResponse<resGetLessorArticles>> => {
  return API.get(`${url}/articles`, { ...params }) as any;
};

export const uploadIDCardService = (
  payload: IReqUploadIDCard
): Promise<ReturnResponse<ACCOUNT_MODEL>> => {
  return API.postFormDataFile(`${url}/updoadIDCard`, {
    body: { ...payload },
  }) as any;
};

export const getListTransactionService = (
  params: Partial<IParamsGetListTransaction>
): Promise<ReturnResponse<resGetLessorTransactions>> => {
  return API.get(`${url}/list-transaction`, { ...params }) as any;
};
