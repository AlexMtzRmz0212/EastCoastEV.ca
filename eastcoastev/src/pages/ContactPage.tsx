import { useEffect } from 'react';
import ContactForm from '../components/contact/ContactForm';
import { useReveal } from '../hooks/useReveal';
import {
  LOCATIONS,
  PRIMARY,
  EMAIL,
  EMAIL_HREF,
  fullAddress,
} from '../lib/locations';

export default function ContactPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Contact | EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Contact</div>
          <h1 className="page-title reveal">
            Come say <em className="accent">hi.</em>
          </h1>
          <p className="page-sub reveal">
            Visit the shop, book a service, or send us a note. We're happy to
            help you find the right ride.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-details reveal-left">
            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h2>Visit a Shop</h2>
                {LOCATIONS.map(loc => (
                  <p key={loc.slug} className="contact-address">
                    <span className="contact-address-city">{loc.city}</span>
                    {fullAddress(loc)}
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      Get directions →
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h2>Call or Text</h2>
                <p><a href={PRIMARY.phoneHref} className="contact-link">{PRIMARY.phone}</a></p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h2>Email</h2>
                <p><a href={EMAIL_HREF} className="contact-link">{EMAIL}</a></p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div>
                <h2>Hours</h2>
                <p>{PRIMARY.hours}<br />{PRIMARY.hoursSunday}</p>
                <p className="contact-hours-note">Same hours at both shops, local time.</p>
              </div>
            </div>
          </div>

          <div className="reveal-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
