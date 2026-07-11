import { useEffect } from 'react';

// Scroll-reveal animation for .reveal/.reveal-left/.reveal-right elements.
// Each page calls this on mount; pass deps (e.g. loaded data) so elements
// rendered after a fetch get observed too. Re-observing an element that is
// already .visible is harmless — the class is just re-added.
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right',
    );
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
