import React from 'react';

// PUBLIC_INTERFACE
export default function Loader({ label = 'Loading...' }) {
  return (
    <span aria-live="polite" aria-busy="true" role="status" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
      <span className="loader" />
      <span className="text-muted">{label}</span>
    </span>
  );
}
