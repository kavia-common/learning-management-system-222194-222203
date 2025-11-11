import React from 'react';

// PUBLIC_INTERFACE
export default function PageContainer({ children }) {
  return (
    <main className="page-container">
      <section className="page">
        {children}
      </section>
    </main>
  );
}
