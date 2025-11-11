import { apiFetch } from './apiClient';

export const courseService = {
  // PUBLIC_INTERFACE
  async list() {
    return apiFetch('/courses');
  },
  // PUBLIC_INTERFACE
  async get(id) {
    if (!id) return null;
    const list = await this.list();
    return Array.isArray(list) ? list.find(x => String(x.id) === String(id)) : list;
  },
  // PUBLIC_INTERFACE
  async create(payload) {
    return apiFetch('/courses', { method: 'POST', body: JSON.stringify(payload) });
  },
};
