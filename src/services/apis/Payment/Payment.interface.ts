import {
  ENUM_PAYMENT_TYPE,
  ENUM_PAYMENT_UNIT,
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

export interface IPayment extends IReqPayment {
  packageMember?: {
    memberPackageName: ENUM_TYPE_MEMBER;
  };
  packageArticle?: {
    articleId: string;
    servicePackageName: ENUM_TYPE_ARTICLE;
    numOfDate: number;
  };
  price: number;
  quantity: number;
  unit: ENUM_PAYMENT_UNIT;
}
