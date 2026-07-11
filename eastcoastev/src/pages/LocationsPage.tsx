import { useEffect } from 'react';
import LocalSection from '../components/LocalSection';
import ExpansionSection from '../components/ExpansionSection';
import CtaBand from '../components/CtaBand';
import { useReveal } from '../hooks/useReveal';

const MAPS_URL =
  'https://www.google.com/maps/place/East+Coast+EV/@45.9786595,-66.6542817,17z/data=!4m6!3m5!1s0x4ca41977adc4c7e7:0xc15110ae25b4c1af!8m2!3d45.9782928!4d-66.654598!16s%2Fg%2F11z68z8rqd';

export default function LocationsPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Locations — EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Locations</div>
          <h1 className="page-title reveal">
            Serving the <em className="accent">Maritimes.</em>
          </h1>
          <p className="page-sub reveal">
            Our flagship storefront is open in Fredericton — the heart of
            everything we do. Anywhere beyond that is just a someday daydream.
          </p>
        </div>

        {/* Flagship storefront card */}
        <div className="storefront-card reveal">
          <div className="storefront-info">
            <div className="storefront-badge">
              <span className="region-dot active" />
              Open Now — Flagship
            </div>
            <h2>Fredericton, NB</h2>
            <div className="storefront-lines">
              <div className="storefront-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                148 Main St, Fredericton, NB E3A 2B5
              </div>
              <div className="storefront-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Mon–Sat: 10am – 6pm · Sun: Closed
              </div>
              <div className="storefront-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +1 (506) 239-1855
              </div>
            </div>
            <a
              href={MAPS_URL}
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
      </div>

      {/* Regions + interactive map */}
      <LocalSection ctaTo="/contact" ctaLabel="Get in Touch" />

      {/* Expansion signup */}
      <ExpansionSection />

      <div className="container">
        <CtaBand
          eyebrow="Just Dreaming"
          title="Wish we were in your city?"
          text="No promises — but we love hearing where riders wish we'd be someday. Drop us a line."
          primaryTo="/contact"
          primaryLabel="Say Hello"
        />
      </div>
    </main>
  );
}
