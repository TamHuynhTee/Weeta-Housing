import { IReqPaymentArticle, IReqPaymentMember } from './Payment.interface';
import API from '../_config/repositoryApi';
import { ReturnResponse } from '../_config/response.interface';
import { RouteApi } from '../../../constants/routeApi.constants';

const url = RouteApi.payment;

export const paymentService = (
  payload: IReqPaymentArticle | IReqPaymentMember
): Promise<ReturnResponse<string>> => {
  return API.post(`${url}/payment-package`, {
    body: { ...payload },
  }) as any;
};
