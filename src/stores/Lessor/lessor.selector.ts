import { State } from './index';
export const selector = (state: State) => {
  return {
    articles: state.articles,
  };
};
