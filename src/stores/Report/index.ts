import { REASON_MODEL } from '@/models/Reason.model';
import { createHook, createStore } from 'react-sweet-state';
import { getListReasonAsync } from './report.action';
import { selector } from './report.selector';

export type State = {
  reasonsArticle: {
    list: Array<REASON_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
  reasonsLessor: {
    list: Array<REASON_MODEL>;
    isOver: boolean;
    total: number;
    loading: boolean;
  };
};

const initialState: State = {
  reasonsArticle: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
  reasonsLessor: {
    list: [],
    isOver: false,
    total: 0,
    loading: false,
  },
};

const actions = {
  getListReasonAsync,
};

const Store = createStore({
  initialState,
  actions,
});

export const useReport = createHook(Store, { selector: selector });
