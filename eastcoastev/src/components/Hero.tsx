import { useEffect, useRef } from 'react';

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.cssText = [
        `left:${Math.random() * 100}%`,
        'bottom:0',
        `width:${size}px`,
        `height:${size}px`,
        `animation-duration:${Math.random() * 12 + 8}s`,
        `animation-delay:${Math.random() * -15}s`,
        `opacity:${Math.random() * 0.5}`,
      ].join(';');
      container.appendChild(p);
    }

    return () => { container.innerHTML = ''; };
  }, []);

  useEffect(() => {
    const statsEl = document.querySelector('.hero-stats-inner');
    if (!statsEl) return;

    function animateCounter(el: Element, target: number, suffix: string) {
      let start = 0;
      const duration = 1800;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll('.stat-num');
          const targets = [500, 4];
          nums.forEach((el, i) => {
            if (i < targets.length) animateCounter(el, targets[i], '+');
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsEl);
    return () => statsObserver.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-waves">
        <div className="wave-line" />
        <div className="wave-line" />
        <div className="wave-line" />
        <div className="wave-line" />
      </div>
      <div className="hero-particles" ref={particlesRef} />

      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="dot" />
            Fredericton's Premier Electric Vehicles Shop
          </div>
          <h1 className="hero-title">
            <div className="line"><span>Ride </span></div>
            <div className="line"><span><em>Electric.</em></span></div>
            <div className="line"><span>Feel Free.</span></div>
          </h1>
          <p className="hero-sub">
            Your premier source for e-bikes, scooters, and mobility in Fredericton. Sales, expert service, and the gear to get you there.
          </p>
          <div className="hero-ctas">
            <a href="#shop" className="btn btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Find Your Ride
            </a>
            <a href="#service" className="btn btn-outline">Schedule a Test Ride</a>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        Scroll to explore
        <div className="scroll-line" />
      </div>

      <div className="hero-stats">
        <div className="container">
          <div className="hero-stats-inner">
            <div className="stat">
              <div className="stat-num">500<em>+</em></div>
              <div className="stat-label">Rides Sold</div>
            </div>
            <div className="stat">
              <div className="stat-num">4<em>+</em></div>
              <div className="stat-label">Service Bays</div>
            </div>
            <div className="stat">
              <div className="stat-num">1<em> City</em></div>
              <div className="stat-label">Physical Shop</div>
            </div>
            <div className="stat">
              <div className="stat-num">All<em> brands</em></div>
              <div className="stat-label">Service &amp; Repair</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
