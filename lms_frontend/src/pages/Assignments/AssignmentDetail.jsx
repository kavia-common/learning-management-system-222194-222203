import React from 'react';
import Button from '../../components/common/Button';

// PUBLIC_INTERFACE
export default function AssignmentDetail({ params }) {
  const id = params?.id;

  return (
    <>
      <header className="page-header">
        <h1>Assignment {id}</h1>
        <div style={{ flex: 1 }} />
        <Button onClick={() => (window.location.hash = `#/assignments/${id}/submit`)}>Submit Work</Button>
      </header>
      <p className="text-muted">Assignment details placeholder.</p>
    </>
  );
}
