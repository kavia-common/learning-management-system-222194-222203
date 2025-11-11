import React, { useEffect, useRef } from 'react';
import Button from './Button';

// PUBLIC_INTERFACE
export default function Modal({ open, onClose, title = 'Dialog', children, primaryAction, secondaryAction }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const focusable = ref.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    function trap(e) {
      if (e.key === 'Escape') onClose?.();
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    }

    document.addEventListener('keydown', trap);
    first?.focus();
    return () => document.removeEventListener('keydown', trap);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="modal" ref={ref}>
        <header className="page-header">
          <h3 style={{ margin: 0 }}>{title}</h3>
        </header>
        <div>{children}</div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
          {secondaryAction}
          {primaryAction ?? <Button onClick={onClose}>Close</Button>}
        </div>
      </div>
    </div>
  );
}
