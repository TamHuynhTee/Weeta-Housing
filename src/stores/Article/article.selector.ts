import { State } from './index';
export const selector = (state: State) => {
  return {
    listArticle: state.article.list,
    totalArticle: state.article.total,
    articleDetail: state.articleDetail,
  };
};
