import React from 'react';

// PUBLIC_INTERFACE
export default function LessonDetail({ params }) {
  return (
    <>
      <header className="page-header">
        <h1>Lesson {params?.id}</h1>
      </header>
      <p className="text-muted">This is a placeholder for lesson content.</p>
    </>
  );
}
