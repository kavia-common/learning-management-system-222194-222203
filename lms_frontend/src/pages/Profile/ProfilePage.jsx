import React from 'react';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../hooks/useAuth';

// PUBLIC_INTERFACE
export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <header className="page-header">
        <h1>Profile</h1>
        <Badge>Beta</Badge>
      </header>
      <p><strong>Name:</strong> {user?.name || 'Learner'}</p>
      <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
    </>
  );
}
