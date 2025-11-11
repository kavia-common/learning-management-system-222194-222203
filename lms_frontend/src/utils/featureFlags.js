import { getEnv } from './env';

let FLAGS = null;

function parseFlags() {
  const raw = getEnv('REACT_APP_FEATURE_FLAGS') || '';
  const items = raw.split(',').map(s => s.trim()).filter(Boolean);
  const map = {};
  for (const item of items) {
    const [k, v] = item.split('=').map(s => s.trim());
    if (!k) continue;
    map[k] = v === undefined ? true : (v === 'true');
  }
  return map;
}

// PUBLIC_INTERFACE
export function getFlag(name) {
  if (!FLAGS) FLAGS = parseFlags();
  return !!FLAGS[name];
}

// PUBLIC_INTERFACE
export function allFlags() {
  if (!FLAGS) FLAGS = parseFlags();
  return { ...FLAGS };
}
