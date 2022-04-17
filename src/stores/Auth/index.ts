import { ROLE } from '@/constants/base.constants';
import { ACCOUNT_MODEL } from '@/models/Account.model';
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
} from './auth.action';
import { selector } from './auth.selector';

export type State = {
  isLoggedIn: boolean;
  auth: ACCOUNT_MODEL | undefined;
  role: ROLE;
};

const initialState: State = {
  isLoggedIn: false,
  auth: undefined,
  role: ROLE.USER,
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
};

const Store = createStore({
  initialState,
  actions,
});

export const useAuth = createHook(Store, { selector: selector });
