import { Link } from 'react-router-dom';

// Referenced from public/ via BASE_URL so it resolves on both the Vercel root
// deploy and the GitHub Pages subpath deploy (VITE_BASE_PATH).
const bannerUrl = import.meta.env.BASE_URL + 'canex-credit-plan.png';

export default function FinancingSection() {
  return (
    <section className="financing-section" id="financing">
      <div className="container">
        <div className="section-label reveal">Proud Supporter</div>
        <div className="service-grid reveal">
          {/* CANEX banner */}
          <div className="financing-banner">
            <img
              src={bannerUrl}
              alt="CANEX CF/FC No Interest Credit Plan available at EastCoastEV, proud supporter of the Canadian Armed Forces community"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="service-content">
            <div className="section-label">CANEX Partnership</div>
            <h2>Finance with the <em className="accent">CF/FC Credit Plan.</em></h2>
            <p className="lead">
              We are proud to support the Canadian Armed Forces community.
              Eligible members can finance their ride through CANEX with no
              interest.
            </p>

            <div className="service-features">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="19" y1="5" x2="5" y2="19" />
                    <circle cx="6.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h3>No Interest Credit Plan</h3>
                  <p>Spread the cost over time with no interest through CANEX.</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h3>For the CAF Community</h3>
                  <p>Serving members, veterans, and their families qualify.</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2 3 14h8l-1 8 11-12h-8l0-8z" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h3>On Any EastCoastEV Ride</h3>
                  <p>Put it toward any e-bike, scooter, dirt bike, or trike.</p>
                </div>
              </div>
            </div>

            <Link to="/contact" className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              Ask About Financing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
