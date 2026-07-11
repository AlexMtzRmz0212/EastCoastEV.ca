import { Link } from 'react-router-dom';
import { getBrands } from '../lib/catalog';
import { useCatalog } from '../hooks/useCatalog';

const FALLBACK_BRANDS = ['NIU', 'E-Ride Pro', 'Yozma', 'Univelo', 'Strike', 'HeyBike'];

export default function TestimonialsSection() {
  const { data: brands } = useCatalog(getBrands);

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
              "It’s great to finally have a place in Fredericton where you can get your scooter serviced locally. They were knowledgeable, professional, and made the whole experience easy from start to finish. I can confidently say I’ll be back for future service and purchases.
              If you’re in the market for an e-bike or a high-quality electric scooter, look no further. Highly recommend!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'var(--accent)' }}>JS</div>
              <div>
                <div className="author-name">Jordan Stone</div>
                {/* <div className="author-role">Commuter · Fredericton</div> */}
              </div>
            </div>
          </div>

          <div className="testimonial reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "Very Professional, scooter charger had stopped working they honored warranty instantly and exchanged for a new one."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: 'var(--blue)' }}>SD</div>
              <div>
                <div className="author-name">Skylar Dutcher</div>
                {/* <div className="author-role">Family Buyer · Fredericton</div> */}
              </div>
            </div>
          </div>

          <div className="testimonial reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="stars">★★★★★</div>
            <p className="testimonial-text">
              "Looking forward to getting my first e scooter through Andrew and his Team! What an all around best experience I hope folks in the area come by to see. Thank you. All the best!"              
            </p>
            <div className="testimonial-author">
              <div className="author-avatar" style={{ background: '#2d5a3a' }}>JH</div>
              <div>
                <div className="author-name">Jordan Hunter</div>
                {/* <div className="author-role">Adventurer · Fredericton</div> */}
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
            {brands && brands.length > 0
              ? brands.map(brand => (
                  <Link
                    to={`/shop?brand=${brand.slug}`}
                    className="brand-tag"
                    key={brand.id}
                  >
                    {brand.name}
                  </Link>
                ))
              : FALLBACK_BRANDS.map(brand => (
                  <div className="brand-tag" key={brand}>{brand}</div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
