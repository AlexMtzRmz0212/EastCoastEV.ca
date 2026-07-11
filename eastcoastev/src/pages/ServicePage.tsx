import { useEffect } from 'react';
import ServiceSection from '../components/ServiceSection';
import CtaBand from '../components/CtaBand';
import { useReveal } from '../hooks/useReveal';

const SERVICES = [
  {
    title: 'Tune-Ups & Safety Checks',
    text: 'Brakes, gears, torque, and a full safety inspection to keep your ride dialed in.',
    icon: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  },
  {
    title: 'Battery Diagnostics',
    text: 'Full battery health checks, cell testing, charging system repair, and safe replacements.',
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
  {
    title: 'Tire & Brake Service',
    text: 'Flats, worn pads, hydraulic bleeds, and rotor truing — done same-day where possible.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: 'Motor & Controller Repair',
    text: 'Diagnostics and fixes for motors, controllers, displays, and wiring harnesses.',
    icon: (
      <>
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
  {
    title: 'Seasonal Storage & Tune-Ups',
    text: 'Pre-season prep and end-of-season storage so your ride is ready when you are.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </>
    ),
  },
  {
    title: 'Mobile Repair Unit',
    text: "Can't make it in? We'll come to you. Ask about our mobile service zones.",
    icon: (
      <path d="M1 3h22M1 21h22M4 3v18M20 3v18M8 7h8M8 12h8M8 17h8" />
    ),
  },
];

export default function ServicePage() {
  useReveal();

  useEffect(() => {
    document.title = 'Service & Repair — EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Service &amp; Repair</div>
          <h1 className="page-title reveal">
            Keep the current <em className="accent">flowing.</em>
          </h1>
          <p className="page-sub reveal">
            Certified technicians servicing every major brand — whether you bought
            it from us or not. Fast turnaround, fair pricing, no BS.
          </p>
        </div>
      </div>

      <ServiceSection />

      <div className="container">
        <div className="section-label reveal" style={{ marginBottom: '24px' }}>
          What We Handle
        </div>
        <div className="feature-grid">
          {SERVICES.map((s, i) => (
            <div
              className="feature-card reveal"
              key={s.title}
              style={{ transitionDelay: `${Math.min(i * 0.05, 0.3)}s` }}
            >
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {s.icon}
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>

        <CtaBand
          eyebrow="Ready When You Are"
          title="Book a service or diagnostic."
          text="Tell us what's going on and we'll get you booked in — most repairs turn around in 24–48 hours."
          primaryTo="/contact"
          primaryLabel="Book a Service"
          secondaryTo="/shop"
          secondaryLabel="Shop New Rides"
        />
      </div>
    </main>
  );
}
