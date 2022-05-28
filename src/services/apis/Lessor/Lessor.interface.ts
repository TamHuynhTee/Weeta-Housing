import { ENUM_PAYMENT_TYPE } from '@/constants/base.constants';
import { GET_LIST_PARAMS } from '@/services/interfaces';

export type IReqSendOPT = {
  phoneNumber: string;
};

export type IReqVerifyOPT = {
  otp: string;
  token: string;
};

export type IReqGetLessorArticles = GET_LIST_PARAMS & {
  isPublished: boolean;
  isApproved: boolean;
  keyword: string;
};

export type IReqUploadIDCard = {
  files: Array<File>;
};

export type IParamsGetListTransaction = GET_LIST_PARAMS & {
  type: ENUM_PAYMENT_TYPE;
};
