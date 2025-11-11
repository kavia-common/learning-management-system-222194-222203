let ENV_CACHE = {};

export function initEnv() {
  ENV_CACHE = {
    REACT_APP_API_BASE: process.env.REACT_APP_API_BASE,
    REACT_APP_BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL,
    REACT_APP_LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
    REACT_APP_FEATURE_FLAGS: process.env.REACT_APP_FEATURE_FLAGS || '',
    REACT_APP_HEALTHCHECK_PATH: process.env.REACT_APP_HEALTHCHECK_PATH || '/healthz',
    REACT_APP_EXPERIMENTS_ENABLED: process.env.REACT_APP_EXPERIMENTS_ENABLED || 'false',
  };
}

// PUBLIC_INTERFACE
export function getEnv(key) {
  if (!ENV_CACHE[key]) {
    // return undefined rather than empty string to allow fallback
    return process.env[key];
  }
  return ENV_CACHE[key];
}
