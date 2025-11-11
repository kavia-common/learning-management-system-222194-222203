# LMS Frontend (React) — OceanLMS

The LMS Frontend provides a modern, lightweight React-based UI for students, instructors, and administrators. It uses a clean hash-based router, simple state management via React Context/Reducers, and a minimal theme aligned to the “Ocean Professional” style.

## Overview

This application is a Create React App (CRA) project with a minimal dependency footprint:
- Routing is implemented in src/router/AppRouter.jsx using window.location.hash.
- State is provided by src/state/store.js, combining authSlice and uiSlice.
- Services in src/services/* communicate with a backend through apiClient.js. When no API base URL is configured, the client returns mock-safe placeholder data for core endpoints to enable offline local development.
- The theme lives under src/styles, applying the Ocean Professional palette and component styles.

Key capabilities:
- Course browsing and creation
- Assignment browsing and submission (mock-safe)
- Basic profile and authentication flow (mock-safe)
- Admin area behind a feature flag
- Optional WebSocket client gated by flags

## Process Flow

1. Application Boot
   - src/index.js renders App, which initializes environment variables via initEnv() (src/utils/env.js), sets up global StoreProvider, and mounts ErrorBoundary and AppRouter.

2. Routing and Layout
   - AppRouter parses the current window.location.hash and matches it against a route table.
   - Protected routes require authentication; unauthenticated users are redirected to #/login.
   - TopNav and SideNav create a stable shell; some routes (login/register) use a layoutless mode.

3. Authentication
   - useAuth() provides login and logout actions backed by authSlice, persisting token and user into localStorage.
   - The mock login accepts any credentials and generates a temporary token; logout clears storage.

4. Data Access
   - apiClient.js reads REACT_APP_API_BASE or REACT_APP_BACKEND_URL. If none are set, it returns mock placeholder data for courses and assignments for a smooth local experience.
   - Services (courseService, assignmentService, lessonService, gradeService, userService) call apiClient, which normalizes errors and attaches Authorization when a token exists.

5. Feature Flags and Experiments
   - src/utils/featureFlags.js parses REACT_APP_FEATURE_FLAGS into an in-memory map. Flags can gate routes (e.g., Admin) or features (e.g., WebSocket).
   - REACT_APP_EXPERIMENTS_ENABLED can enable wsClient even without an explicit flag.

6. WebSocket (Optional)
   - createWsClient() uses REACT_APP_WS_URL and either a “ws” feature flag or REACT_APP_EXPERIMENTS_ENABLED. If disabled or unset, it returns a no-op client for safe operation.

## Compliance

- Security and Coding Practices
  - Follows OWASP Secure Coding Practices for frontend (avoid exposing secrets, normalize errors, limit logs by level via REACT_APP_LOG_LEVEL).
  - CRA build chain enforces basic best practices; ESLint is configured (eslint.config.mjs) with React rules and unused vars constraints.
- Privacy and Data Handling
  - Authentication token and user are stored in localStorage. Consumers should use HTTPS, avoid storing sensitive data beyond what’s required, and rotate tokens server-side.
- Accessibility
  - Buttons, nav, modals, and loaders include ARIA attributes where applicable. Keyboard focus is trapped in Modal, and TopNav/SideNav expose navigation roles.
- Observability
  - Log levels are controlled by REACT_APP_LOG_LEVEL. Avoid logging sensitive data in production.
- Health
  - REACT_APP_HEALTHCHECK_PATH is available for consistency across deployments and can be surfaced by external health checks if integrated into hosting.

## Review Notes

- Routing strategy is intentionally hash-based to avoid server configuration for client-side routes.
- API client gracefully degrades to mock-safe mode with no backend configured, ensuring development continuity.
- Admin route is gated by a feature flag and is safe by default (hidden unless enabled).
- WebSocket client is a no-op unless explicitly enabled by flags or experiments.
- Theme is implemented with CSS variables to keep the footprint small and customizable.

## Environment Variables

The container supports the following variables. Variables not used in code today are listed for parity with the deployment environment and may be adopted by infrastructure:

- REACT_APP_API_BASE
  - Usage: Base URL for REST API calls.
  - Referenced in: src/services/apiClient.js via getEnv('REACT_APP_API_BASE').

- REACT_APP_BACKEND_URL
  - Usage: Fallback base URL if REACT_APP_API_BASE is not set.
  - Referenced in: src/services/apiClient.js.

- REACT_APP_FRONTEND_URL
  - Usage: Not directly used in this codebase; reserved for deployments or links.

- REACT_APP_WS_URL
  - Usage: WebSocket base URL.
  - Referenced in: src/services/wsClient.js.

- REACT_APP_NODE_ENV
  - Usage: Not directly read; CRA also uses NODE_ENV. Keep aligned with environment.

- REACT_APP_NEXT_TELEMETRY_DISABLED
  - Usage: Not applicable to CRA; present for platform parity.

- REACT_APP_ENABLE_SOURCE_MAPS
  - Usage: Not directly read; CRA can be configured at build time via env.

- REACT_APP_PORT
  - Usage: Not read in code; hosting layer controls bind port.

- REACT_APP_TRUST_PROXY
  - Usage: Not applicable in frontend code; server-side setting.

- REACT_APP_LOG_LEVEL
  - Usage: Controls client logging verbosity (error, warn, info, debug, trace).
  - Referenced in: src/services/apiClient.js.

- REACT_APP_HEALTHCHECK_PATH
  - Usage: Provides a conventional path string for health checks.
  - Referenced in: src/utils/env.js.

- REACT_APP_FEATURE_FLAGS
  - Usage: Comma-separated list like "admin=true,ws=true".
  - Referenced in: src/utils/featureFlags.js and used by SideNav/Admin route gating.

- REACT_APP_EXPERIMENTS_ENABLED
  - Usage: When "true", can enable wsClient without explicit flag.
  - Referenced in: src/services/wsClient.js and src/utils/env.js.

Example .env
REACT_APP_API_BASE=https://api.example.com
REACT_APP_BACKEND_URL=
REACT_APP_WS_URL=wss://ws.example.com
REACT_APP_LOG_LEVEL=info
REACT_APP_FEATURE_FLAGS=admin=true,ws=true
REACT_APP_HEALTHCHECK_PATH=/healthz
REACT_APP_EXPERIMENTS_ENABLED=false

## Pages and Routes

Hash-based routes are defined in src/router/AppRouter.jsx.

- Public (layoutless)
  - #/login → src/pages/Auth/Login.jsx
  - #/register → src/pages/Auth/Register.jsx

- Protected (requires auth)
  - #/dashboard → Dashboard
  - #/courses → CourseList
  - #/courses/new → CourseCreate
  - #/courses/:id → CourseDetail
  - #/lessons/:id → LessonDetail
  - #/assignments → AssignmentList
  - #/assignments/:id → AssignmentDetail
  - #/assignments/:id/submit → SubmissionPage
  - #/grades → GradesPage
  - #/profile → ProfilePage
  - #/admin → AdminDashboard (requires feature flag “admin”)

Navigation
- TopNav provides brand, auth actions, and quick links.
- SideNav lists core pages and conditionally shows Admin based on flags.

## Theme Summary

- Theme: “Ocean Professional”
- Colors: primary #2563EB, secondary #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827, muted #6B7280.
- Location: src/styles/theme.css, src/styles/layout.css, src/styles/components.css
- Components: Buttons, Badge, Modal, Loader, Inputs, Card styles.
- Layout: Top navigation bar, left side navigation, main page container with responsive adjustments for narrow screens.

## Development Tips

- Start
  - npm start and open http://localhost:3000. Default route is #/dashboard.
- Tests
  - npm test runs CRA tests. A smoke test ensures Dashboard, TopNav, and SideNav render.
- Mock-safe Data
  - Leave REACT_APP_API_BASE unset to use placeholder responses for /courses and /assignments.
- Feature Flags
  - Use REACT_APP_FEATURE_FLAGS=admin=true to display Admin.
  - Use REACT_APP_FEATURE_FLAGS=ws=true or REACT_APP_EXPERIMENTS_ENABLED=true to activate WebSocket client.
- Logging
  - Adjust REACT_APP_LOG_LEVEL to manage verbosity in apiClient (error/warn/info/debug/trace).
- Auth
  - Login accepts any email/password and persists a generated token to localStorage for development convenience.

Reviewed & Approved by Engineering.
