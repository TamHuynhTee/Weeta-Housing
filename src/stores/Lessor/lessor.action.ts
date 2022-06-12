import { notifyError } from '@/helpers/toast.helpers';
import {
  MEMBER_TRANSACTION_MODEL,
  SERVICE_TRANSACTION_MODEL,
} from '@/models/Payment.model';
import {
  getLessorArticleService,
  getListTransactionService,
} from '@/services/apis/Lessor';
import {
  IParamsGetListTransaction,
  IReqGetLessorArticles,
} from '@/services/apis/Lessor/Lessor.interface';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };
// const authInstance = defaultRegistry.getStore(Store);

export const getLessorArticleAsync =
  (params: Partial<IReqGetLessorArticles>) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingArticle(true));
    const result = await getLessorArticleService(params);
    dispatch(setLoadingArticle(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          articles: {
            list: result.data.articles,
            total: result.data.total,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const getLessorTransactionAsync =
  (params: Partial<IParamsGetListTransaction>) =>
  async ({ setState, getState, dispatch }: Actions) => {
    dispatch(setLoadingTransaction(true));
    const result = await getListTransactionService(params);
    dispatch(setLoadingTransaction(false));
    if (result.error !== undefined) {
      if (!result.error) {
        setState({
          ...getState(),
          transactions: {
            ...getState().transactions,
            list: result.data.transactions,
            total: result.data.total,
            isOver: result.data.isOver,
            page: 1,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

export const loadMoreLessorTransactionAsync =
  (params: Partial<IParamsGetListTransaction>) =>
  async ({ setState, getState }: Actions) => {
    const result = await getListTransactionService(params);
    if (result.error !== undefined) {
      if (!result.error) {
        const newList = [
          ...getState().transactions.list,
          ...result.data.transactions,
        ];

        setState({
          ...getState(),
          transactions: {
            ...getState().transactions,
            list: newList,
            total: result.data.total,
            isOver: result.data.isOver,
            page: params.page,
          },
        });
        return true;
      }
    }
    notifyError(result.message);
    return false;
  };

const setLoadingArticle =
  (loading: boolean) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      articles: {
        ...getState().articles,
        loading: loading,
      },
    });
  };

const setLoadingTransaction =
  (loading: boolean) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      transactions: {
        ...getState().transactions,
        loading: loading,
      },
    });
  };

export const setDetailTransaction =
  (
    transaction:
      | (MEMBER_TRANSACTION_MODEL & SERVICE_TRANSACTION_MODEL)
      | undefined
  ) =>
  ({ setState, getState }: Actions) => {
    setState({
      ...getState(),
      transactionDetail: transaction,
    });
  };
