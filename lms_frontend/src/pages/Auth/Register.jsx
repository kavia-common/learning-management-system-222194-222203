import React, { useState } from 'react';
import { TextInput } from '../../components/forms/inputs';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

// PUBLIC_INTERFACE
export default function Register() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    // mock-safe registration; immediately login
    await login({ email, password: pwd, name });
    window.location.hash = '#/dashboard';
  }

  return (
    <div style={{ maxWidth: 460, margin: '3rem auto' }} className="card">
      <div style={{ padding: '1rem' }}>
        <h1>Create account</h1>
        <form onSubmit={onSubmit}>
          <TextInput label="Name" value={name} onChange={setName} required placeholder="Your name" />
          <TextInput label="Email" value={email} onChange={setEmail} type="email" required placeholder="you@example.com" />
          <TextInput label="Password" value={pwd} onChange={setPwd} type="password" required placeholder="••••••••" />
          <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            <Button type="submit">Register</Button>
            <Button kind="ghost" onClick={() => (window.location.hash = '#/login')}>Have an account? Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
