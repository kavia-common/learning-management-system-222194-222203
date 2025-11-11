export function normalizeError(err) {
  if (!err) return { message: 'Unknown error' };
  if (typeof err === 'string') return { message: err };
  if (err.message) return err;
  if (err.error) return { message: err.error };
  try {
    return { message: JSON.stringify(err) };
  } catch {
    return { message: String(err) };
  }
}
