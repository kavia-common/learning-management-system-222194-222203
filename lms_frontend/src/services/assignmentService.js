import { apiFetch } from './apiClient';

export const assignmentService = {
  // PUBLIC_INTERFACE
  async list() {
    return apiFetch('/assignments');
  },
  // PUBLIC_INTERFACE
  async get(id) {
    return apiFetch(`/assignments/${id}`);
  },
  // PUBLIC_INTERFACE
  async submit(id, payload) {
    return apiFetch(`/assignments/${id}/submissions`, { method: 'POST', body: JSON.stringify(payload) });
  },
};
