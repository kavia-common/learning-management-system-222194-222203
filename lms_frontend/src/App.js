import React from 'react';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';
import AppRouter from './router/AppRouter.jsx';
import { StoreProvider } from './state/store';
import ErrorBoundary from './components/common/ErrorBoundary';
import { initEnv } from './utils/env';

// Initialize environment-driven config early
initEnv();

/**
 * Root App component wires up the store, error boundary, and router.
 */
function App() {
  return (
    <StoreProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </StoreProvider>
  );
}

export default App;
