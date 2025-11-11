import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ kind = 'primary', type='button', onClick, children, disabled, ariaLabel }) {
  return (
    <button
      type={type}
      className={`btn ${kind}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
