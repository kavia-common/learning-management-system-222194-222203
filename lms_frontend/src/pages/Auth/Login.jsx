import React, { useState } from 'react';
import { TextInput } from '../../components/forms/inputs';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    await login({ email, password: pwd });
    const next = sessionStorage.getItem('next') || '#/dashboard';
    sessionStorage.removeItem('next');
    window.location.hash = next;
  }

  return (
    <div style={{ maxWidth: 420, margin: '3rem auto' }} className="card">
      <div style={{ padding: '1rem' }}>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <TextInput label="Email" value={email} onChange={setEmail} type="email" required placeholder="you@example.com" />
          <TextInput label="Password" value={pwd} onChange={setPwd} type="password" required placeholder="••••••••" />
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            <Button type="submit">Sign in</Button>
            <Button kind="ghost" onClick={() => (window.location.hash = '#/register')}>Create account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
