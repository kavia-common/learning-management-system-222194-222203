import React, { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { courseService } from '../../services/courseService';

// PUBLIC_INTERFACE
export default function CourseList() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseService.list().then(setCourses).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="page-header">
        <h1>Courses</h1>
        <div style={{ flex: 1 }} />
        <Button onClick={() => (window.location.hash = '#/courses/new')}>New Course</Button>
      </header>
      {loading ? <Loader /> : courses.length === 0 ? (
        <EmptyState title="No courses found" description="Try creating a course." />
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {courses.map(c => (
            <li key={c.id} className="card" style={{ padding: '1rem', marginBottom: '.8rem' }}>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <h3 style={{ margin: 0, flex: 1 }}>{c.title}</h3>
                <Button kind="ghost" onClick={() => (window.location.hash = `#/courses/${c.id}`)}>Open</Button>
              </div>
              <p className="text-muted" style={{ marginTop: '.25rem' }}>{c.description || 'No description'}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
