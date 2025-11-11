import React from 'react';
import Button from '../components/common/Button';

// PUBLIC_INTERFACE
export default function NotFound() {
  return (
    <>
      <header className="page-header">
        <h1>Not Found</h1>
      </header>
      <p className="text-muted">The page you requested does not exist.</p>
      <Button onClick={() => (window.location.hash = '#/dashboard')}>Go Home</Button>
    </>
  );
}
