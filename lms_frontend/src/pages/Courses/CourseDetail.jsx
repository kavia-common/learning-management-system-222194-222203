import React, { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { courseService } from '../../services/courseService';

// PUBLIC_INTERFACE
export default function CourseDetail({ params }) {
  const id = params?.id;
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    courseService.get(id).then(setCourse).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!course) return <div className="empty">Course not found</div>;

  return (
    <>
      <header className="page-header">
        <h1>{course.title}</h1>
        <div style={{ flex: 1 }} />
        <Button kind="ghost" onClick={() => (window.location.hash = '#/courses')}>Back</Button>
      </header>
      <p className="text-muted">{course.description || 'No description'}</p>
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
        <Button onClick={() => (window.location.hash = `#/assignments`)}>View Assignments</Button>
      </div>
    </>
  );
}
