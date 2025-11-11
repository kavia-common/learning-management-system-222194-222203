const TOKEN_KEY = 'lms_token';
const USER_KEY = 'lms_user';

export const initialAuthState = (() => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
})();

export function authReducer(state, action) {
  switch (action.type) {
    case 'auth/login': {
      const { token, user } = action.payload;
      if (token) localStorage.setItem(TOKEN_KEY, token);
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      return { ...state, token, user };
    }
    case 'auth/logout': {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return { token: null, user: null };
    }
    default:
      return state;
  }
}
