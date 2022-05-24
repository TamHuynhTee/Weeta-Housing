import {
  ENUM_PAYMENT_TYPE,
  ENUM_TYPE_ARTICLE,
  ENUM_TYPE_MEMBER,
} from '@/constants/base.constants';

export type IReqPayment = {
  type: ENUM_PAYMENT_TYPE;
  prices: number;
};

export interface IReqPaymentArticle extends IReqPayment {
  articleId: string;
  servicePackageName: ENUM_TYPE_ARTICLE;
  numOfDate: number;
}

export interface IReqPaymentMember extends IReqPayment {
  memberPackageName: ENUM_TYPE_MEMBER;
}
