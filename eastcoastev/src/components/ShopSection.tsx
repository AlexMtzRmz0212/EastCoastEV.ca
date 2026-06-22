export default function ShopSection() {
  return (
    <section className="shop-section" id="shop">
      <div className="container">
        <div className="shop-header">
          <div>
            <div className="section-label reveal">The Shop</div>
            <h2 className="reveal">Your next ride <em className="accent">awaits.</em></h2>
          </div>
          <a href="#" className="btn btn-ghost reveal" style={{ flexShrink: 0 }}>
            View All Products
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="categories-grid">
          {/* E-Bikes */}
          <div className="cat-card reveal" style={{ transitionDelay: '0.05s' }}>
            <div className="cat-placeholder cat-bg-1">
              <div className="cat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M15 6h-3l-3 6H5.5M15 6l3 11.5M9 6l3 6h6" />
                </svg>
              </div>
              <div className="cat-overlay">
                <div className="cat-eyebrow">Category</div>
                <div className="cat-title">E-Bikes</div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '2px 8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Commuter</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '2px 8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Mountain</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '2px 8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '100px' }}>Cargo</span>
                </div>
                <div className="cat-btn">
                  Shop E-Bikes
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* E-Scooters */}
          <div className="cat-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="cat-placeholder cat-bg-2">
              <div className="cat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="7" cy="18" r="3" />
                  <circle cx="19" cy="18" r="3" />
                  <path d="M7 18V8l5-4h4l2 4H12V8" />
                </svg>
              </div>
              <div className="cat-overlay">
                <div className="cat-eyebrow">Category</div>
                <div className="cat-title">E-Scooters</div>
                <div className="cat-btn">
                  Shop Scooters
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* E-Trikes / Mobility */}
          <div className="cat-card reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="cat-placeholder cat-bg-3">
              <div className="cat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="5" cy="18" r="3" />
                  <circle cx="19" cy="18" r="3" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="M12 6v12M8 10l4-4 4 4" />
                </svg>
              </div>
              <div className="cat-overlay">
                <div className="cat-eyebrow">Category</div>
                <div className="cat-title">E-Trikes &amp; Mobility</div>
                <div className="cat-btn">
                  Shop Mobility
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Accessories */}
          <div className="cat-card reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="cat-placeholder cat-bg-4">
              <div className="cat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className="cat-overlay">
                <div className="cat-eyebrow">Category</div>
                <div className="cat-title">Accessories &amp; Gear</div>
                <div className="cat-btn">
                  Shop Gear
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rentals Teaser */}
        <div className="rentals-teaser" id="explore">
          <div className="rental-card reveal">
            <div className="rental-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Available
            </div>
            <h3>Try Before You Buy</h3>
            <p>Not sure which ride is right for you? Book a test ride at our storefront location. No pressure, just pure electric fun.</p>
            <a href="#contact" className="btn btn-outline">Book a Test Ride</a>
          </div>
          <div className="rental-card reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="rental-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              Rentals
            </div>
            <h3>Rent for a Day or a Week</h3>
            <p>Exploring local paths or heading out on an urban adventure? We've got short and long-term rental options to fuel your journey.</p>
            <a href="#contact" className="btn btn-outline">View Rental Options</a>
          </div>
        </div>
      </div>
    </section>
  );
}
