import { ARTICLE_MODEL } from '@/models/Article.model';
import {
  MEMBER_TRANSACTION_MODEL,
  SERVICE_TRANSACTION_MODEL,
} from '@/models/Payment.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  getLessorArticleAsync,
  getLessorTransactionAsync,
  loadMoreLessorTransactionAsync,
  setDetailTransaction,
} from './lessor.action';
import { selector } from './lessor.selector';

export type State = {
  articles: {
    list: Array<ARTICLE_MODEL>;
    isOver: boolean;
    loading: boolean;
    total: number;
  };
  transactions: {
    list: Array<MEMBER_TRANSACTION_MODEL & SERVICE_TRANSACTION_MODEL>;
    isOver: boolean;
    loading: boolean;
    total: number;
    page: number;
  };
  transactionDetail:
    | (MEMBER_TRANSACTION_MODEL & SERVICE_TRANSACTION_MODEL)
    | undefined;
};

const initialState: State = {
  articles: {
    list: [],
    loading: false,
    isOver: false,
    total: 0,
  },
  transactions: {
    list: [],
    loading: false,
    isOver: false,
    total: 0,
    page: 1,
  },
  transactionDetail: undefined,
};

const actions = {
  getLessorArticleAsync,
  getLessorTransactionAsync,
  loadMoreLessorTransactionAsync,
  setDetailTransaction,
};

const Store = createStore({
  initialState,
  actions,
});

export const useLessor = createHook(Store, { selector: selector });
