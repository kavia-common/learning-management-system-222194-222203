import React from 'react';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../state/store';

// PUBLIC_INTERFACE
export default function TopNav() {
  const { isAuthenticated, user, logout } = useAuth();
  const { state } = useStore();

  return (
    <header role="navigation" aria-label="Top Navigation" className="topnav">
      <div className="brand" aria-label="LMS brand">
        <span aria-hidden="true">🌊</span>
        <span>OceanLMS</span>
      </div>
      <div className="spacer" />
      {isAuthenticated ? (
        <>
          <span className="text-muted" aria-live="polite">Hello, {user?.name || 'Learner'}</span>
          <Button kind="ghost" onClick={() => (window.location.hash = '#/profile')}>Profile</Button>
          <Button kind="danger" onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Button onClick={() => (window.location.hash = '#/login')}>Login</Button>
          <Button kind="secondary" onClick={() => (window.location.hash = '#/register')}>Register</Button>
        </>
      )}
    </header>
  );
}
