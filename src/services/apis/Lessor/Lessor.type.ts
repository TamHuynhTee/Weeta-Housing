import { ARTICLE_MODEL } from '@/models/Article.model';
import {
  MEMBER_TRANSACTION_MODEL,
  SERVICE_TRANSACTION_MODEL,
} from '@/models/Payment.model';

export type resVerifyOTP = {
  identify: {
    message: string;
    otp: number;
  };
};

export type resGetLessorArticles = {
  articles: Array<ARTICLE_MODEL>;
  total: number;
};

export type resGetLessorTransactions = {
  transactions: Array<MEMBER_TRANSACTION_MODEL & SERVICE_TRANSACTION_MODEL>;
  isOver: boolean;
  total: number;
};
