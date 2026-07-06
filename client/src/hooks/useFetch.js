import { useEffect, useRef, useState } from 'react';

/**
 * Generic data-fetching hook for GET requests.
 *   const { data, loading, error } = useFetch(() => apiClient.get('/services'), []);
 *
 * `fetcher` must be a stable callback (wrap inline functions with the deps
 * array, same rules as useEffect) — it re-runs whenever `deps` changes.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetcherRef
      .current()
      .then((res) => {
        if (!cancelled) setData(res?.data ?? res);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
