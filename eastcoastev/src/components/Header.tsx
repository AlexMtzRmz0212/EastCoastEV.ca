import { useState, useEffect } from 'react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export default function Header({ isDark, onThemeToggle }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  function toggleNav() {
    setNavOpen(o => !o);
  }

  function closeNav() {
    setNavOpen(false);
  }

  const sunSVG = (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </>
  );

  const moonSVG = (
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  );

  return (
    <>
      {/* Mobile Nav */}
      <div className={`mobile-nav${navOpen ? ' open' : ''}`} id="mobileNav">
        <a className="nav-link" href="#shop" onClick={closeNav}>Shop</a>
        <a className="nav-link" href="#service" onClick={closeNav}>Service &amp; Repair</a>
        <a className="nav-link" href="#explore" onClick={closeNav}>Explore</a>
        <a className="nav-link" href="#story" onClick={closeNav}>Our Story</a>
        <a className="nav-link" href="#contact" onClick={closeNav}>Contact</a>
        <div className="mobile-nav-ctas">
          <a href="#service" className="btn btn-outline" onClick={closeNav}>Book Service</a>
          <a href="#shop" className="btn btn-primary" onClick={closeNav}>Shop Now</a>
        </div>
      </div>

      {/* Header */}
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="header-inner">
            <a href="#" className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" />
                </svg>
              </div>
              <span>EastCoast<span>EV</span></span>
            </a>

            <nav>
              <a href="#shop" className="nav-link">Shop</a>
              <a href="#service" className="nav-link">Service &amp; Repair</a>
              <a href="#explore" className="nav-link">Explore</a>
              <a href="#story" className="nav-link">Our Story</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>

            <div className="header-badge">Now Serving Fredericton &nbsp;·&nbsp; Future Expansion Planned</div>

            <div className="header-ctas">
              <button
                className="theme-toggle"
                onClick={onThemeToggle}
                aria-label="Toggle theme"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  {isDark ? sunSVG : moonSVG}
                </svg>
              </button>
              <a href="#service" className="btn btn-outline" style={{ fontSize: '0.68rem', padding: '10px 18px' }}>
                Book Service
              </a>
              <a href="#shop" className="btn btn-primary" style={{ fontSize: '0.68rem', padding: '10px 18px' }}>
                Shop Now
              </a>
              <button
                className="mobile-menu-btn"
                id="menuBtn"
                aria-label="Open menu"
                onClick={toggleNav}
              >
                <span style={navOpen ? { transform: 'rotate(45deg) translateY(9px)' } : {}} />
                <span style={navOpen ? { opacity: '0' } : {}} />
                <span style={navOpen ? { transform: 'rotate(-45deg) translateY(-9px)' } : {}} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
