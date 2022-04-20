import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import { createArticleAsync, getListArticleAsync } from './article.action';
import { selector } from './article.selector';

export type State = {
  article: {
    list: Array<ARTICLE_MODEL>;
    total: number;
    isOver: boolean;
  };
  articleDetail: ARTICLE_MODEL | undefined;
};

const initialState: State = {
  article: {
    list: [],
    total: 0,
    isOver: false,
  },
  articleDetail: undefined,
};

const actions = {
  createArticleAsync,
  getListArticleAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useArticle = createHook(Store, { selector: selector });
