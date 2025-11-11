import React from 'react';
import EmptyState from '../../components/common/EmptyState';

// PUBLIC_INTERFACE
export default function AdminDashboard() {
  return (
    <>
      <header className="page-header">
        <h1>Admin</h1>
      </header>
      <EmptyState title="Admin Console" description="Admin actions will be available here." />
    </>
  );
}
