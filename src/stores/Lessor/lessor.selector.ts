import { State } from './index';
export const selector = (state: State) => {
  return {
    articles: state.articles,
    transactions: state.transactions,
    transactionDetail: state.transactionDetail,
  };
};
