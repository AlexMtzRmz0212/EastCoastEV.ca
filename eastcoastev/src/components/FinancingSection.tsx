import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Referenced from public/ via BASE_URL so it resolves on both the Vercel root
// deploy and the GitHub Pages subpath deploy (VITE_BASE_PATH).
const bannerUrl = import.meta.env.BASE_URL + 'canex-credit-plan.png';

const walletIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M16 12h3" />
  </svg>
);

const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const storeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9 4.5 4h15L21 9" />
    <path d="M4 9v11h16V9" />
    <path d="M3 9h18a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
  </svg>
);

const bikeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const shieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const boltIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2 3 14h8l-1 8 11-12h-8l0-8z" />
  </svg>
);

interface FeatureProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

function Feature({ icon, title, children }: FeatureProps) {
  return (
    <div className="service-feature">
      <div className="service-feature-icon">{icon}</div>
      <div className="service-feature-text">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}

export default function FinancingSection() {
  return (
    <section className="financing-section" id="financing">
      <div className="container">
        <div className="shop-header">
          <div>
            <div className="section-label reveal">Financing</div>
            <h2 className="reveal">
              Ride now. <em className="accent">Pay over time.</em>
            </h2>
          </div>
        </div>

        <div className="financing-grid">
          {/* Financeit: open to everyone */}
          <div className="financing-card reveal">
            <div className="financing-card-head">
              <div className="financing-badge">New</div>
              <h3>Financeit</h3>
              <p className="financing-lead">
                You no longer have to pay for your ride all at once. We can now
                arrange financing through Financeit, right here in the shop.
              </p>
            </div>

            <div className="service-features">
              <Feature icon={walletIcon} title="Pay in instalments">
                Spread the cost of your ride over a term that suits your budget.
              </Feature>
              <Feature icon={storeIcon} title="Apply in the shop">
                We walk you through the application in person, no paperwork to
                take home.
              </Feature>
              <Feature icon={checkIcon} title="Open to everyone">
                Available to any customer, on bikes, scooters, and accessories
                alike.
              </Feature>
            </div>

            <Link to="/contact" className="btn btn-primary">
              {bikeIcon}
              Ask About Financing
            </Link>
            <p className="financing-fineprint">
              Financing is provided by Financeit and subject to their credit
              approval. Talk to us in the shop for current rates and terms.
            </p>
          </div>

          {/* CANEX: for the Canadian Armed Forces community */}
          <div className="financing-card reveal">
            <div className="financing-banner">
              <img
                src={bannerUrl}
                alt="CANEX CF/FC No Interest Credit Plan available at EastCoastEV, proud supporter of the Canadian Armed Forces community"
                loading="lazy"
              />
            </div>

            <div className="financing-card-head">
              <div className="financing-badge alt">Proud Supporter</div>
              <h3>CANEX CF/FC Credit Plan</h3>
              <p className="financing-lead">
                We are proud to support the Canadian Armed Forces community.
                Eligible members can finance their ride through CANEX with no
                interest.
              </p>
            </div>

            <div className="service-features">
              <Feature icon={bikeIcon} title="No Interest Credit Plan">
                Spread the cost over time with no interest through CANEX.
              </Feature>
              <Feature icon={shieldIcon} title="For the CAF Community">
                Serving members, veterans, and their families qualify.
              </Feature>
              <Feature icon={boltIcon} title="On Any EastCoastEV Ride">
                Put it toward any e-bike, scooter, dirt bike, or trike.
              </Feature>
            </div>

            <Link to="/contact" className="btn btn-outline">
              Ask About CANEX
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
