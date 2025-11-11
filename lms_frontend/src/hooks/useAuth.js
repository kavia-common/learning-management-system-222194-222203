import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export function useAuth() {
  const { state, dispatch } = useStore();

  async function login({ email, password, name }) {
    // Mock-safe login: accept any credentials and produce a token
    const token = btoa(`${email}:${Date.now()}`);
    const user = { email, name: name || email.split('@')[0] };
    dispatch({ type: 'auth/login', payload: { token, user } });
    return true;
  }

  function logout() {
    dispatch({ type: 'auth/logout' });
    window.location.hash = '#/login';
  }

  return {
    isAuthenticated: !!state?.auth?.token,
    token: state?.auth?.token,
    user: state?.auth?.user,
    login, logout,
  };
}
