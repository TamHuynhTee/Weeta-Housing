import { State } from './index';
export const selector = (state: State) => {
  return {
    isLoggedIn: state.isLoggedIn,
    auth: state.auth,
    role: state.role,
  };
};