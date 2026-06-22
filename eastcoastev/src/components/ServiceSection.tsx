export default function ServiceSection() {
  return (
    <section className="service-section" id="service">
      <div className="container">
        <div className="section-label reveal">Expert Service</div>
        <div className="service-grid reveal">
          {/* Workshop Image */}
          <div className="service-image">
            <div className="service-grid-lines" />
            <div className="workshop-illustration">
              <div className="wrench-glow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(181,245,60,0.7)', marginBottom: '8px' }}>
                WORKSHOP STATUS
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ background: 'rgba(181,245,60,0.1)', border: '1px solid rgba(181,245,60,0.3)', borderRadius: '4px', padding: '8px 14px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Turnaround</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.9rem', color: 'var(--accent)' }}>24–48h</div>
                </div>
                <div style={{ background: 'rgba(181,245,60,0.1)', border: '1px solid rgba(181,245,60,0.3)', borderRadius: '4px', padding: '8px 14px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Bays Open</div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: '0.9rem', color: 'var(--accent)' }}>Now</div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Content */}
          <div className="service-content">
            <div className="section-label">Service &amp; Repair Hub</div>
            <h2>Keep the Current <em className="accent">Flowing.</em></h2>
            <p className="lead">Certified technicians. We service all major brands. From a flat tire to a full battery diagnostic, we get you back on the road fast.</p>

            <div className="service-features">
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h4>All-Brand Certified</h4>
                  <p>Rad Power, Trek, Specialized, Juiced, and more. We fix it all.</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h4>Battery Diagnostics</h4>
                  <p>Full battery health checks, cell replacement, and charging system repairs.</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h4>Winter Storage &amp; Seasonal Tune-Ups</h4>
                  <p>Pre-season prep and end-of-season storage with peace of mind.</p>
                </div>
              </div>
              <div className="service-feature">
                <div className="service-feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 3h22M1 21h22M4 3v18M20 3v18M8 7h8M8 12h8M8 17h8" />
                  </svg>
                </div>
                <div className="service-feature-text">
                  <h4>Mobile Repair Unit</h4>
                  <p>Can't make it to us? We'll come to you. Ask about our mobile service zones.</p>
                </div>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book Your Service Appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
