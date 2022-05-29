import { ROLE } from '@/constants/base.constants';
import { ACCOUNT_MODEL } from '@/models/Account.model';
import { ARTICLE_MODEL } from '@/models/Article.model';
import { createHook, createStore } from 'react-sweet-state';
import {
  changePasswordAsync,
  forgotPasswordAsync,
  getInfoByTokenAsync,
  loginAsync,
  logoutAsync,
  registerAccountAsync,
  getInfoAsync,
  updateProfileAsync,
  updateAvatarAsync,
  verifyEmailAsync,
  registerLessorAsync,
  verifyOTPAsync,
  setAppLoading,
  saveArticleAsync,
  uploadIDCardAsync,
  getListSaveArticleAsync,
} from './auth.action';
import { selector } from './auth.selector';

export type State = {
  isLoggedIn: boolean;
  auth: ACCOUNT_MODEL | undefined;
  role: ROLE;
  appLoading: boolean;
  saveArticles: {
    list: Array<ARTICLE_MODEL>;
    isOver: boolean;
    loading: boolean;
    total: number;
  };
};

const initialState: State = {
  isLoggedIn: false,
  auth: undefined,
  role: ROLE.USER,
  appLoading: false,
  saveArticles: {
    list: [],
    loading: false,
    isOver: false,
    total: 0,
  },
};

const actions = {
  loginAsync,
  getInfoByTokenAsync,
  registerAccountAsync,
  forgotPasswordAsync,
  logoutAsync,
  changePasswordAsync,
  getInfoAsync,
  updateProfileAsync,
  updateAvatarAsync,
  verifyEmailAsync,
  registerLessorAsync,
  verifyOTPAsync,
  setAppLoading,
  saveArticleAsync,
  uploadIDCardAsync,
  getListSaveArticleAsync,
};

const Store = createStore({
  initialState,
  actions,
});

const useAuth = createHook(Store, { selector: selector });

export { useAuth, Store };
