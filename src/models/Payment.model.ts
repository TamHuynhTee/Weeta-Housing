import {
  ENUM_PAYMENT_METHOD,
  ENUM_PAYMENT_STATUS,
  ENUM_TYPE_ARTICLE,
  ENUM_TYPE_MEMBER,
} from '@/constants/base.constants';

export type TRANSACTION_MODEL = {
  readonly _id: string;
  lessorId: string;
  transactionAmount: number;
  status: ENUM_PAYMENT_STATUS;
  createdAt: string;
  updatedAt: string;
  paymentMethod: ENUM_PAYMENT_METHOD;
};

export interface MEMBER_TRANSACTION_MODEL extends TRANSACTION_MODEL {
  memberPackageName: ENUM_TYPE_MEMBER;
}

export interface SERVICE_TRANSACTION_MODEL extends TRANSACTION_MODEL {
  readonly articleId: string;
  servicePackageName: ENUM_TYPE_ARTICLE;
}
