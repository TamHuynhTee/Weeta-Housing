import { ROLE } from '@/constants/base.constants';
import { createHook, createStore } from 'react-sweet-state';
import { authModel } from '../../models/Auth.model';
import { selector } from './auth.selector';
import { loginAsync, checkAuth } from './auth.action';

export type State = {
  isLoggedIn: boolean;
  auth: authModel | undefined;
  role: ROLE;
};

const initialState: State = {
  isLoggedIn: false,
  auth: undefined,
  role: ROLE.USER,
};

const actions = { loginAsync, checkAuth };

const Store = createStore({
  initialState,
  actions,
});

export const useAuth = createHook(Store, { selector: selector });
