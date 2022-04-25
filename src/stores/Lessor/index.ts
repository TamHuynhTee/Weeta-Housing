import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import { getLessorArticleAsync } from './lessor.action';
import { selector } from './lessor.selector';

export type State = {
  articles: {
    list: Array<ARTICLE_MODEL>;
    isOver: boolean;
    total: number;
  };
};

const initialState: State = {
  articles: {
    list: [],
    isOver: false,
    total: 0,
  },
};

const actions = {
  getLessorArticleAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useLessor = createHook(Store, { selector: selector });
