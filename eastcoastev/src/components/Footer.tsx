import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendEmailNotification } from '../lib/sendNotification';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [btnText, setBtnText] = useState('Subscribe');
  const [inputError, setInputError] = useState(false);

  async function handleSubscribe() {
    if (email.includes('@')) {
      setBtnText('Sending…');
      try {
        await sendEmailNotification(email);
      } catch {
        // notification failure is silent — subscription UX still completes
      }
      setBtnText('✓ Subscribed!');
      setEmail('');
      setTimeout(() => setBtnText('Subscribe'), 3000);
    } else {
      setInputError(true);
      setTimeout(() => setInputError(false), 1500);
    }
  }

  return (
    <footer id="contact">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <div className="logo" style={{ fontSize: '1rem', marginBottom: '16px' }}>
              <div className="logo-icon" style={{ width: '30px', height: '30px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}>
                  <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5" />
                </svg>
              </div>
              EastCoast<span>EV</span>
            </div>
            <p className="footer-desc">
              New Brunswick's premier electric vehicles shop. E-bikes, scooters, trikes, sales, service, and community; built for the Maritimes.
            </p>
            <div className="footer-newsletter">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Newsletter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputError ? { borderColor: '#e05050' } : {}}
              />
              <button onClick={handleSubscribe}>{btnText}</button>
            </div>
          </div>

          {/* Shop column */}
          <div className="footer-col">
            <h4>Shop</h4>
            <div className="footer-links">
              <Link to="/shop?category=e-bikes" className="footer-link">E-Bikes</Link>
              <Link to="/shop?category=e-scooters" className="footer-link">E-Scooters</Link>
              <Link to="/shop?category=e-dirt-bikes" className="footer-link">E-Dirt Bikes</Link>
              <Link to="/shop?category=e-trikes" className="footer-link">E-Trikes &amp; Mobility</Link>
              <Link to="/shop" className="footer-link">All Products</Link>
            </div>
          </div>

          {/* Company column */}
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-links">
              <Link to="/service" className="footer-link">Service &amp; Repair</Link>
              <Link to="/locations" className="footer-link">Locations</Link>
              <Link to="/about" className="footer-link">Our Story</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/contact" className="footer-link">Book a Test Ride</Link>
            </div>
          </div>

          {/* Contact column */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                148 Main St, Fredericton, NB
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +1 (506) 239-1855
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                eastcoastev.ca@gmail.com
              </div>
              <div className="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                Mon–Sat: 10am – 6pm
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 EastCoastEV Ltd. All rights reserved.{' '}
            <span style={{ color: 'var(--text-dim)' }}>· Fredericton, NB</span>
          </div>

          <div className="dev-credit">
            <span className="dev-credit-mark">&lt;/&gt;</span>
            <span>Designed &amp; built by</span>
            <a href="https://alex.bittobyte.qzz.io" target="_blank" rel="noopener noreferrer">
              Alex Martínez
            </a>
            <span className="dev-credit-dot">·</span>
            <a href="https://bittobyte.qzz.io" target="_blank" rel="noopener noreferrer">
              BittoByte
            </a>
          </div>

          {/* <div className="social-links">

            <a href="#" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a href="#" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            <a href="#" className="social-link" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.53V6.77a4.85 4.85 0 01-1.01-.08z" />
              </svg>
            </a>

          </div> */}

        </div>
      </div>
    </footer>
  );
}
