import { RouteApi } from '@/constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { IReqVerifyOPT } from './Lessor.interface';
import { resVerifyOTP } from './Lessor.type';

const url = RouteApi.lessor;

export const registerLessorService = (
  payload: IReqVerifyOPT
): Promise<ReturnResponse<resVerifyOTP>> => {
  return API.post(`${url}/identifyPhoneNumber`, {
    body: { ...payload },
  }) as any;
};
