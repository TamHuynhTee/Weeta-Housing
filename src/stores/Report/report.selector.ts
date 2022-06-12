import { State } from './index';
export const selector = (state: State) => {
  return {
    reasonsArticle: state.reasonsArticle,
    reasonsLessor: state.reasonsLessor,
  };
};
