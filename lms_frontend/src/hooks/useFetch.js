import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export function useFetch(asyncFn, deps = []) {
  const [state, setState] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    let active = true;
    setState(s => ({ ...s, loading: true, error: null }));
    asyncFn()
      .then((data) => active && setState({ loading: false, data, error: null }))
      .catch((error) => active && setState({ loading: false, data: null, error }));
    return () => { active = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
