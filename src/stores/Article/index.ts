import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import { createArticleAsync } from './article.action';
import { selector } from './article.selector';

export type State = {
  article: {
    list: Array<ARTICLE_MODEL>;
    total: number;
  };
  articleDetail: ARTICLE_MODEL | undefined;
};

const initialState: State = {
  article: {
    list: [],
    total: 0,
  },
  articleDetail: undefined,
};

const actions = {
  createArticleAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useArticle = createHook(Store, { selector: selector });
