import { useEffect, useState } from 'react';

interface CatalogState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const LOADING = { data: null, loading: true, error: null } as const;

// Thin async→state bridge; caching lives in src/lib/catalog.ts, so passing a
// fresh fetcher closure on every render is fine. `deps` re-runs the fetch
// (e.g. [slug] on the product page). We reset to the loading state during
// render (not in an effect) when deps change, per React's guidance on
// adjusting state while rendering.
export function useCatalog<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = [],
): CatalogState<T> {
  const depsKey = JSON.stringify(deps);
  const [state, setState] = useState<CatalogState<T>>(LOADING);
  const [prevKey, setPrevKey] = useState(depsKey);

  if (depsKey !== prevKey) {
    setPrevKey(depsKey);
    setState(LOADING);
  }

  useEffect(() => {
    let cancelled = false;
    fetcher().then(
      data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      },
      (err: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load',
          });
        }
      },
    );
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsKey]);

  return state;
}
