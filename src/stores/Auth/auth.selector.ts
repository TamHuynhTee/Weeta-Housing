import { State } from './index';
export const selector = (state: State) => {
  return {
    isLoggedIn: state.isLoggedIn,
    auth: state.auth,
    authId: state.auth?._id || '',
    role: state.role,
    loading: state.appLoading,
  };
};
