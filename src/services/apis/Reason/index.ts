import { RouteApi } from '@/constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { IParamGetReason } from './Reason.interface';
import { resGetReasons } from './Reason.type';

const url = RouteApi.reportReason;

export const getReasonService = (
  params: Partial<IParamGetReason>
): Promise<ReturnResponse<resGetReasons>> => {
  return API.get(`${url}/`, { ...params }) as any;
};
