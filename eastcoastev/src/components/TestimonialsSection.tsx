export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-head-split">
          <div>
            <div className="section-label reveal">Community</div>
            <h2 className="reveal">Real riders. <em className="accent">Real stories.</em></h2>
          </div>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial reveal" style={{ transitionDelay: '0.05s' }}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "My Rad Power e-bike turns my commute to UNB into the best part of my day. EastCoastEV had me set up and riding in under an hour, with a full gear kit and a route suggestion. These people know what they're doing."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'var(--accent)' }}>SM</div>
              <div>
                <div className="author-name">Sarah M.</div>
                <div className="author-role">Commuter · Fredericton</div>
              </div>
            </div>
          </div>

          <div className="testimonial reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "I bought an e-trike for my dad who has mobility issues. The team here was patient, knowledgeable, and they even did a home delivery so he could try it on his street. He's out every morning now. Life-changing."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'var(--blue)' }}>RD</div>
              <div>
                <div className="author-name">Rachel D.</div>
                <div className="author-role">Family Buyer · Fredericton</div>
              </div>
            </div>
          </div>

          <div className="testimonial reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "Brought in my Specialized Turbo for a diagnostic and they had it sorted in one day. Fair pricing, no BS. I've had it serviced at dealers in Toronto and honestly EastCoastEV is better. Proud to support a local shop."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: '#2d5a3a' }}>TL</div>
              <div>
                <div className="author-name">Thomas L.</div>
                <div className="author-role">Adventurer · Fredericton</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="section-label reveal" style={{ marginBottom: '24px' }}>#EastCoastEV Community</div>
        <div className="instagram-grid reveal">
          {[
            'linear-gradient(135deg,#0a2040,#1e5090)',
            'linear-gradient(135deg,#0f2a10,#1a5020)',
            'linear-gradient(135deg,#1a0e08,#503010)',
            'linear-gradient(135deg,#0f0a1e,#302050)',
            'linear-gradient(135deg,#0a1e18,#104030)',
            'linear-gradient(135deg,#1e0a0a,#501515)',
          ].map((bg, i) => (
            <div className="insta-tile" key={i}>
              <div className="insta-placeholder" style={{ background: bg }}>
                <div className="insta-overlay">#EastCoastEV</div>
              </div>
            </div>
          ))}
        </div>
        <p className="hashtag reveal" style={{ marginTop: '16px' }}>
          Tag your rides with <span style={{ color: 'var(--accent)' }}>#EastCoastEV</span> to be featured
        </p>

        {/* Brands */}
        <div className="brands-section reveal">
          <div className="brands-label">Brands We Carry &amp; Service</div>
          <div className="brands-scroll">
            {[
              'NIU', 
              'E-Ride Pro',
              'Yozma', 
              'Strike', 
              'HeyBike', 
              // 'Biktrix', 
              // 'Priority', 
              // 'Aventon'
            ].map(brand => (
              <div className="brand-tag" key={brand}>{brand}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
