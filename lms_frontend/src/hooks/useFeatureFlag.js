import { getFlag } from '../utils/featureFlags';

// PUBLIC_INTERFACE
export function useFeatureFlag(name) {
  return getFlag(name);
}
