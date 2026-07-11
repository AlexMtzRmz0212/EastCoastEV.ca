import { useEffect } from 'react';
import TestimonialsSection from '../components/TestimonialsSection';
import CtaBand from '../components/CtaBand';
import { useReveal } from '../hooks/useReveal';

const VALUES = [
  {
    title: 'Local, Not Corporate',
    text: 'We live and ride here. When you buy from us, you get a neighbour who actually knows the routes, the weather, and the trails.',
    icon: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
  },
  {
    title: 'We Service Everything',
    text: 'Bought it elsewhere? No problem. Our certified techs work on every major brand, so you always have a shop to call.',
    icon: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  },
  {
    title: 'Ride Before You Buy',
    text: 'No pressure, no hard sell. Come test ride at the shop and find the ride that actually fits your life.',
    icon: (
      <>
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6h-3l-3 6H5.5M15 6l3 11.5M9 6l3 6h6" />
      </>
    ),
  },
  {
    title: 'Built for the Maritimes',
    text: 'Salt air, hills, and real winters. We spec and service rides that can actually handle the East Coast.',
    icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />,
  },
];

export default function AboutPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Our Story — EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Our Story</div>
          <h1 className="page-title reveal">
            Born in the Bay. Built for the <em className="accent">Maritimes.</em>
          </h1>
        </div>

        <div className="prose reveal">
          <p>
            EastCoastEV started in Fredericton for a simple reason: we love this
            place. Its scenic river routes, its packed commuter corridors, and
            communities that deserve better, cleaner ways to get around. We saw
            riders driving hours to Toronto or Montreal just to get a bike
            serviced — and knew the Maritimes needed a real electric-vehicle home
            of its own.
          </p>
          <p>
            So we built one. A storefront where you can actually see, touch, and
            test the rides. A workshop with certified technicians who service
            every major brand. And a team that treats you like a neighbour,
            because you are one.
          </p>
          <p>
            We're just getting started — but the mission is the same as day one:
            get more people onto electric, and keep them rolling.
          </p>
        </div>

        <div className="section-label reveal" style={{ margin: '64px 0 24px' }}>
          What We Stand For
        </div>
        <div className="feature-grid">
          {VALUES.map((v, i) => (
            <div
              className="feature-card reveal"
              key={v.title}
              style={{ transitionDelay: `${Math.min(i * 0.05, 0.3)}s` }}
            >
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {v.icon}
                </svg>
              </div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      <TestimonialsSection />

      <div className="container">
        <CtaBand
          eyebrow="Come Say Hi"
          title="Got your back — and your future bike."
          text="Drop by the storefront in Fredericton, or reach out and we'll help you find your ride."
          primaryTo="/shop"
          primaryLabel="Browse the Lineup"
          secondaryTo="/contact"
          secondaryLabel="Contact Us"
        />
      </div>
    </main>
  );
}
