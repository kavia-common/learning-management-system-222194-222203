import React from 'react';

// PUBLIC_INTERFACE
export function TextInput({ label, value, onChange, type='text', placeholder, required, name }) {
  const id = name || label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2);
  return (
    <label htmlFor={id} style={{ display: 'block', marginBottom: '.8rem' }}>
      {label && <span className="label">{label}</span>}
      <input id={id} name={id} className="input" type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required} />
    </label>
  );
}

// PUBLIC_INTERFACE
export function TextArea({ label, value, onChange, placeholder, name, rows=4 }) {
  const id = name || label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2);
  return (
    <label htmlFor={id} style={{ display: 'block', marginBottom: '.8rem' }}>
      {label && <span className="label">{label}</span>}
      <textarea id={id} name={id} className="input" rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}
