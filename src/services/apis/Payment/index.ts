import { RouteApi } from '../../../constants/routeApi.constants';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';

const url = RouteApi.payment;

export const paymentService = (
  payload: any
): Promise<ReturnResponse<string>> => {
  return API.post(`${url}/payment-package`, {
    body: { ...payload },
  }) as any;
};
