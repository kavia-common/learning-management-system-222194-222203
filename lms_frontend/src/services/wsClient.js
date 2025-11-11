import { getEnv } from '../utils/env';
import { getFlag } from '../utils/featureFlags';

// PUBLIC_INTERFACE
export function createWsClient(path = '/ws') {
  const enabled = getFlag('ws') || (getEnv('REACT_APP_EXPERIMENTS_ENABLED') === 'true');
  if (!enabled) {
    return { on() {}, send() {}, close() {} };
  }
  const base = getEnv('REACT_APP_WS_URL');
  if (!base) {
    return { on() {}, send() {}, close() {} };
  }
  const url = `${base}${path}`;
  const ws = new WebSocket(url);
  const handlers = {};
  ws.onmessage = (e) => handlers['message']?.forEach(h => h(e));
  ws.onopen = (e) => handlers['open']?.forEach(h => h(e));
  ws.onerror = (e) => handlers['error']?.forEach(h => h(e));
  ws.onclose = (e) => handlers['close']?.forEach(h => h(e));

  return {
    on(ev, cb) { handlers[ev] = handlers[ev] || []; handlers[ev].push(cb); },
    send(data) { ws.send(typeof data === 'string' ? data : JSON.stringify(data)); },
    close() { ws.close(); }
  };
}
