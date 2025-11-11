import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title='Nothing here yet', description='Get started by creating your first item.', action }) {
  return (
    <div className="empty">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p className="text-muted">{description}</p>
      {action && <div style={{ marginTop: '.5rem' }}>{action}</div>}
    </div>
  );
}
