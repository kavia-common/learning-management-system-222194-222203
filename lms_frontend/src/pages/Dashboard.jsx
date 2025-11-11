import React, { useEffect, useState } from 'react';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { courseService } from '../services/courseService';

// PUBLIC_INTERFACE
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let mounted = true;
    courseService.list().then((data) => {
      if (!mounted) return;
      setCourses(data);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <header className="page-header">
        <h1>Dashboard</h1>
        <Badge>Student</Badge>
        <div style={{ flex: 1 }} />
        <Button onClick={() => (window.location.hash = '#/courses/new')}>New Course</Button>
      </header>
      {loading ? (
        <Loader />
      ) : courses.length === 0 ? (
        <EmptyState title="No courses yet" description="Create a course to get started." action={<Button onClick={() => (window.location.hash='#/courses/new')}>Create Course</Button>} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {courses.map(c => (
            <article key={c.id} className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>{c.title}</h3>
              <p className="text-muted" style={{ minHeight: '3rem' }}>{c.description || 'No description'}</p>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <Button kind="ghost" onClick={() => (window.location.hash = `#/courses/${c.id}`)}>Open</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
