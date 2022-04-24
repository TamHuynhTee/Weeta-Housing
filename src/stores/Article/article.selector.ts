import { State } from './index';
export const selector = (state: State) => {
  return {
    articles: state.article,
    topArticles: state.topArticle,
    articleDetail: state.articleDetail,
  };
};
