import { render, screen } from '@testing-library/react';
import App from './App';

// Smoke test: Dashboard renders with TopNav and SideNav through internal router
test('renders Dashboard with navigation', () => {
  // Ensure hash is set for default route
  window.location.hash = '#/dashboard';
  render(<App />);
  expect(screen.getByRole('navigation', { name: /top navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /side navigation/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
});
