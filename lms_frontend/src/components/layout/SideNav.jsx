import React from 'react';
import { getFlag } from '../../utils/featureFlags';

const links = [
  { to: '#/dashboard', label: 'Dashboard' },
  { to: '#/courses', label: 'Courses' },
  { to: '#/assignments', label: 'Assignments' },
  { to: '#/grades', label: 'Grades' },
  { to: '#/profile', label: 'Profile' },
];

function isActive(href) {
  return (window.location.hash || '').startsWith(href.replace('#',''));
}

// PUBLIC_INTERFACE
export default function SideNav() {
  const showAdmin = getFlag('admin');

  return (
    <nav role="navigation" aria-label="Side Navigation" className="sidenav">
      {links.map(l => (
        <a key={l.to} href={l.to} className={`navlink ${isActive(l.to) ? 'active' : ''}`}>{l.label}</a>
      ))}
      {showAdmin && (
        <a href="#/admin" className={`navlink ${isActive('#/admin') ? 'active' : ''}`}>Admin</a>
      )}
    </nav>
  );
}
