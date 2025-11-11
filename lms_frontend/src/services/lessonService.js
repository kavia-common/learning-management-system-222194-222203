import { apiFetch } from './apiClient';

export const lessonService = {
  // PUBLIC_INTERFACE
  async getByCourse(courseId) {
    return apiFetch(`/courses/${courseId}/lessons`);
  },
  // PUBLIC_INTERFACE
  async get(id) {
    return apiFetch(`/lessons/${id}`);
  },
};
