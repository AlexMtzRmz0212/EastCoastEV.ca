import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DISMISS_KEY = 'ecev-fin-bar-v1';

// localStorage throws in private windows and when site data is blocked, so a
// failure to read it means "show the bar", never "crash the page".
function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Site-wide strip advertising Financeit. Sits above the fixed header, which
 * reads its height from the --annbar-h custom property, so the bar has to put
 * the .has-annbar class on <html> for the rest of the layout to make room.
 */
export default function AnnouncementBar() {
  const [visible, setVisible] = useState(() => !wasDismissed());

  // Layout effect, not a plain effect: the class shifts the header and hero, so
  // setting it after paint would show a visible jump on first load.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('has-annbar', visible);
    return () => root.classList.remove('has-annbar');
  }, [visible]);

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Can't persist it; dismissing for this session is still better than nothing.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="annbar">
      <div className="container annbar-inner">
        <Link to="/#financing" className="annbar-cta">
          <span className="annbar-tag">New</span>
          <span className="annbar-msg">
            Financing now available with <strong>Financeit</strong>
          </span>
          <span className="annbar-arrow" aria-hidden="true">
            &rarr;
          </span>
        </Link>
        <button
          type="button"
          className="annbar-close"
          onClick={dismiss}
          aria-label="Dismiss announcement"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
