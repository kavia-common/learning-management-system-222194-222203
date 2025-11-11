import { getEnv } from '../utils/env';
import { normalizeError } from '../utils/errors';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export function apiFetch(path, options = {}) {
  const base = getEnv('REACT_APP_API_BASE') || getEnv('REACT_APP_BACKEND_URL') || '';
  const url = `${base}${path}`;
  const headers = options.headers ? { ...options.headers } : {};
  const token = localStorage.getItem('lms_token');

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';

  const logLevel = (getEnv('REACT_APP_LOG_LEVEL') || 'info').toLowerCase();

  const doLog = (level, ...args) => {
    const order = ['error','warn','info','debug','trace'];
    const current = order.indexOf(logLevel);
    const target = order.indexOf(level);
    if (target <= current) {
      // eslint-disable-next-line no-console
      console[level === 'trace' ? 'log' : level](...args);
    }
  };

  // If no base URL, return mock-safe response for known endpoints
  if (!base) {
    doLog('warn', '[api] No API base configured, using mock-safe placeholders for', path);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.startsWith('/courses')) {
          const items = [
            { id: '1', title: 'Intro to React', description: 'Learn components and hooks' },
            { id: '2', title: 'Oceanography 101', description: 'Explore our blue planet' },
          ];
          if (options.method === 'POST') {
            resolve({ id: Math.random().toString(36).slice(2), ...(options.body ? JSON.parse(options.body) : {}) });
          } else {
            resolve(items);
          }
        } else if (path.startsWith('/assignments')) {
          resolve([
            { id: 'a1', title: 'Essay on Waves', description: 'Write about wave dynamics' },
          ]);
        } else {
          resolve({});
        }
      }, 300);
    });
  }

  return fetch(url, { ...options, headers })
    .then(async (res) => {
      const text = await res.text();
      let data = null;
      try { data = text ? JSON.parse(text) : {}; } catch { data = text; }
      if (!res.ok) {
        throw normalizeError(data || { status: res.status, message: res.statusText });
      }
      doLog('debug', '[api]', options.method || 'GET', url, data);
      return data;
    })
    .catch((err) => {
      doLog('error', '[api] error', err);
      throw normalizeError(err);
    });
}

// PUBLIC_INTERFACE
export function useApi() {
  // Hook present for future extension; currently not using store directly.
  useStore();
  return { fetch: apiFetch };
}
