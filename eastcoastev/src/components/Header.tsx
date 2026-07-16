import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        <Link className="nav-link" to="/" onClick={closeNav}>Home</Link>
        <Link className="nav-link" to="/shop" onClick={closeNav}>Shop</Link>
        <Link className="nav-link" to="/service" onClick={closeNav}>Service &amp; Repair</Link>
        <Link className="nav-link" to="/locations" onClick={closeNav}>Locations</Link>
        <Link className="nav-link" to="/about" onClick={closeNav}>About</Link>
        <Link className="nav-link" to="/contact" onClick={closeNav}>Contact</Link>
        <div className="mobile-nav-ctas">
          <Link to="/service" className="btn btn-outline" onClick={closeNav}>Book Service</Link>
          <Link to="/shop" className="btn btn-primary" onClick={closeNav}>Shop Now</Link>
        </div>
      </div>

      {/* Header */}
      <header id="header" className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M13 2 3 14h8l-1 8 11-12h-8l0-8z" />
                </svg>
              </div>
              <span>EastCoast<span>EV</span></span>
            </Link>

            <nav>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/shop" className="nav-link">Shop</Link>
              <Link to="/service" className="nav-link">Service</Link>
              <Link to="/locations" className="nav-link">Locations</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            <div className="header-badge">Now Serving Fredericton, NB</div>

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
              <Link to="/service" className="btn btn-outline" style={{ fontSize: '0.68rem', padding: '10px 18px' }}>
                Book Service
              </Link>
              <Link to="/shop" className="btn btn-primary" style={{ fontSize: '0.68rem', padding: '10px 18px' }}>
                Shop Now
              </Link>
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
