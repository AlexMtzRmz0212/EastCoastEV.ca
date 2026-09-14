import { useEffect } from 'react';
import LocalSection from '../components/LocalSection';
import ExpansionSection from '../components/ExpansionSection';
import CtaBand from '../components/CtaBand';
import { useReveal } from '../hooks/useReveal';
import { LOCATIONS, fullAddress, type Location } from '../lib/locations';

const pinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const clockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" />
  </svg>
);

const phoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function StorefrontCard({ location }: { location: Location }) {
  return (
    <div className="storefront-card reveal">
      <div className="storefront-info">
        <div className="storefront-badge">
          <span className="region-dot active" />
          {location.statusLabel}
        </div>
        <h2>{location.city}</h2>
        <div className="storefront-lines">
          <div className="storefront-line">
            {pinIcon}
            {fullAddress(location)}
          </div>
          <div className="storefront-line">
            {clockIcon}
            {location.hours} · {location.hoursSunday.replace('Sunday', 'Sun')}
          </div>
          <div className="storefront-line">
            {phoneIcon}
            <a href={location.phoneHref} className="contact-link">
              {location.phone}
            </a>
          </div>
        </div>
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          Get Directions
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function LocationsPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Locations | EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Locations</div>
          <h1 className="page-title reveal">
            Two shops. Same <em className="accent">crew.</em>
          </h1>
          <p className="page-sub reveal">
            Our flagship storefront is in Fredericton, where everything we do
            started, and we now have a second shop in Ottawa. Come by either one
            to buy a ride or book a repair.
          </p>
        </div>

        <div className="storefront-grid">
          {LOCATIONS.map(location => (
            <StorefrontCard key={location.slug} location={location} />
          ))}
        </div>
      </div>

      {/* Regions + interactive map */}
      <LocalSection ctaTo="/contact" ctaLabel="Get in Touch" />

      {/* Expansion signup */}
      <ExpansionSection />

      <div className="container">
        <CtaBand
          eyebrow="Just Dreaming"
          title="Wish we were in your city?"
          text="No promises, but we love hearing where riders wish we'd be someday. Drop us a line."
          primaryTo="/contact"
          primaryLabel="Say Hello"
        />
      </div>
    </main>
  );
}
