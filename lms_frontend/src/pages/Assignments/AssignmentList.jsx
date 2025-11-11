import React, { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { assignmentService } from '../../services/assignmentService';

// PUBLIC_INTERFACE
export default function AssignmentList() {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    assignmentService.list().then(setAssignments).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="page-header">
        <h1>Assignments</h1>
      </header>
      {loading ? <Loader /> : assignments.length === 0 ? (
        <EmptyState title="No assignments" description="You have no assignments yet." />
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {assignments.map(a => (
            <li key={a.id} className="card" style={{ padding: '1rem', marginBottom: '.8rem' }}>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <h3 style={{ margin: 0, flex: 1 }}>{a.title}</h3>
                <Button kind="ghost" onClick={() => (window.location.hash = `#/assignments/${a.id}`)}>Open</Button>
              </div>
              <p className="text-muted" style={{ marginTop: '.25rem' }}>{a.description || 'No description'}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
