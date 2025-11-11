import React, { createContext, useContext, useReducer } from 'react';
import { authReducer, initialAuthState } from './authSlice';
import { uiReducer, initialUiState } from './uiSlice';

const StoreContext = createContext(null);

function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
    ui: uiReducer(state.ui, action),
  };
}

const initialState = {
  auth: initialAuthState,
  ui: initialUiState,
};

// PUBLIC_INTERFACE
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  return useContext(StoreContext);
}
