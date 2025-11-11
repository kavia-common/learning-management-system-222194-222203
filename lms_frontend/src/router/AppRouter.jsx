import React, { useEffect, useMemo, useState } from 'react';
import TopNav from '../components/layout/TopNav';
import SideNav from '../components/layout/SideNav';
import PageContainer from '../components/layout/PageContainer';
import Dashboard from '../pages/Dashboard';
import CourseList from '../pages/Courses/CourseList';
import CourseDetail from '../pages/Courses/CourseDetail';
import CourseCreate from '../pages/Courses/CourseCreate';
import LessonDetail from '../pages/Lessons/LessonDetail';
import AssignmentList from '../pages/Assignments/AssignmentList';
import AssignmentDetail from '../pages/Assignments/AssignmentDetail';
import SubmissionPage from '../pages/Assignments/SubmissionPage';
import GradesPage from '../pages/Grades/GradesPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound';
import { useStore } from '../state/store';
import { useAuth } from '../hooks/useAuth';
import { getFlag } from '../utils/featureFlags';

/**
 * Lightweight hash-based router.
 * Supports:
 * - route recognition based on window.location.hash
 * - protected routes by auth state
 * - simple params via path segments
 */

// Route table
const routes = [
  { path: '/dashboard', component: Dashboard, protected: true },
  { path: '/courses', component: CourseList, protected: true },
  { path: '/courses/new', component: CourseCreate, protected: true },
  { path: '/courses/:id', component: CourseDetail, protected: true },
  { path: '/lessons/:id', component: LessonDetail, protected: true },
  { path: '/assignments', component: AssignmentList, protected: true },
  { path: '/assignments/:id', component: AssignmentDetail, protected: true },
  { path: '/assignments/:id/submit', component: SubmissionPage, protected: true },
  { path: '/grades', component: GradesPage, protected: true },
  { path: '/profile', component: ProfilePage, protected: true },
  { path: '/admin', component: AdminDashboard, protected: true, flag: 'admin' },
  { path: '/login', component: Login, protected: false, layoutless: true },
  { path: '/register', component: Register, protected: false, layoutless: true },
];

function parseHash() {
  const raw = window.location.hash || '#/dashboard';
  const cleaned = raw.startsWith('#') ? raw.slice(1) : raw;
  return cleaned || '/dashboard';
}

function matchRoute(pathname) {
  const parts = pathname.split('?')[0];
  const segs = parts.split('/').filter(Boolean);

  for (const r of routes) {
    const rSegs = r.path.split('/').filter(Boolean);
    if (rSegs.length !== segs.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < rSegs.length; i++) {
      const rp = rSegs[i];
      const cp = segs[i];
      if (rp.startsWith(':')) {
        params[rp.slice(1)] = decodeURIComponent(cp);
      } else if (rp !== cp) {
        ok = false; break;
      }
    }
    if (ok) return { route: r, params };
  }
  return null;
}

// PUBLIC_INTERFACE
export default function AppRouter() {
  const [path, setPath] = useState(parseHash());
  const { state } = useStore();
  const { isAuthenticated } = useAuth();

  // sync on hash changes
  useEffect(() => {
    const onHashChange = () => setPath(parseHash());
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const match = useMemo(() => matchRoute(path), [path]);
  let content = null;

  if (!match) {
    content = <NotFound />;
  } else {
    const { route, params } = match;

    // feature flag gating
    if (route.flag && !getFlag(route.flag)) {
      content = <NotFound />;
    } else if (route.protected && !isAuthenticated) {
      // redirect to login
      if (window.location.hash !== '#/login') {
        window.location.hash = '#/login';
      }
      content = <Login />;
    } else {
      const Component = route.component;
      content = <Component params={params} />;
    }
  }

  const layoutless = match?.route?.layoutless;

  if (layoutless) {
    return (
      <main>
        {content}
      </main>
    );
  }

  return (
    <div className="app-shell">
      <TopNav />
      <div className="app-body">
        <SideNav />
        <PageContainer>
          {content}
        </PageContainer>
      </div>
    </div>
  );
}
