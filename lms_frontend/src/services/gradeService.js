import { apiFetch } from './apiClient';

export const gradeService = {
  // PUBLIC_INTERFACE
  async list() {
    return apiFetch('/grades');
  }
};
