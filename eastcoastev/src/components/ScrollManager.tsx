import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Restores sensible scroll behavior for a routed SPA: hash links (e.g.
// /#service from the shop page) scroll to their section, plain navigations
// start at the top.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
