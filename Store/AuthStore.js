import { create } from 'zustand';

const AuthStore = create(set => ({
  isAuthenticated: false,
  authUserInfo: null,
  setAuthUserInfo: data => set(state => ({ authUserInfo: data })),
  setAuthentication: data => set(state => ({ isAuthenticated: true })),
  setUnAuthentication: data =>
    set(state => ({ isAuthenticated: false, authUserInfo: null })),
}));
export default AuthStore;
