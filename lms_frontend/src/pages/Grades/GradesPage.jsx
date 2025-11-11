import React from 'react';
import EmptyState from '../../components/common/EmptyState';

// PUBLIC_INTERFACE
export default function GradesPage() {
  return (
    <>
      <header className="page-header">
        <h1>Grades</h1>
      </header>
      <EmptyState title="No grades available" description="Grades will appear here once assignments are graded." />
    </>
  );
}
