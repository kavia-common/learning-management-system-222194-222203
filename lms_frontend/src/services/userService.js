import { apiFetch } from './apiClient';

export const userService = {
  // PUBLIC_INTERFACE
  async me() {
    return apiFetch('/me');
  }
};
