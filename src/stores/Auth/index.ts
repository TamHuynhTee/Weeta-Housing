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
  verifyEmailAsync,
  registerLessorAsync,
  verifyOTPAsync,
  setAppLoading,
} from './auth.action';
import { selector } from './auth.selector';

export type State = {
  isLoggedIn: boolean;
  auth: ACCOUNT_MODEL | undefined;
  role: ROLE;
  appLoading: boolean;
};

const initialState: State = {
  isLoggedIn: false,
  auth: undefined,
  role: ROLE.USER,
  appLoading: false,
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
};

const Store = createStore({
  initialState,
  actions,
});

const useAuth = createHook(Store, { selector: selector });

export { useAuth, Store };
