import { Link } from 'react-router-dom';

interface LocalSectionProps {
  ctaTo?: string;
  ctaLabel?: string;
}

export default function LocalSection({
  ctaTo = '/contact',
  ctaLabel = 'Join Our Community',
}: LocalSectionProps) {
  return (
    <section className="local-section" id="story">
      <div className="container">
        <div className="local-grid">
          {/* Text + Region List */}
          <div className="local-text reveal-left">
            <div className="section-label">Our Roots</div>
            <h2>Born in the Bay.<br />Built for the <em className="accent">Maritimes.</em></h2>
            <p>We started in Fredericton because we love this place; its scenic routes, its packed commuter options, and communities that deserve better transport solutions. We're your local electric vehicle experts.</p>
            <div className="region-list">
              <a className="region-item" href="https://www.google.com/maps/place/East+Coast+EV/@45.9786595,-66.6542817,17z/data=!4m15!1m8!3m7!1s0x4ca4188b6b32f037:0xd58b8b8c87ca66e6!2s148+Main+St,+Fredericton,+NB+E3A+2B5!3b1!8m2!3d45.9782928!4d-66.654598!16s%2Fg%2F11b8vgb9zq!3m5!1s0x4ca41977adc4c7e7:0xc15110ae25b4c1af!8m2!3d45.9782928!4d-66.654598!16s%2Fg%2F11z68z8rqd?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <div className="region-dot active" />
                <div className="region-info">
                  <div className="region-name">Fredericton, NB</div>
                  <div className="region-status">Flagship Location — Open Now</div>
                </div>
              </a>
              <a className="region-item" href="https://www.google.com/maps/search/?api=1&query=Moncton,+NB,+Canada" target="_blank" rel="noopener noreferrer">
                <div className="region-dot soon" />
                <div className="region-info">
                  <div className="region-name">Moncton, NB</div>
                  <div className="region-status">Someday, maybe</div>
                </div>
              </a>
              <a className="region-item" href="https://www.google.com/maps/search/?api=1&query=Saint+John,+NB,+Canada" target="_blank" rel="noopener noreferrer">
                <div className="region-dot soon" />
                <div className="region-info">
                  <div className="region-name">Saint John, NB</div>
                  <div className="region-status">Someday, maybe</div>
                </div>
              </a>
              <a className="region-item" href="https://www.google.com/maps/search/?api=1&query=Charlottetown,+PEI,+Canada" target="_blank" rel="noopener noreferrer">
                <div className="region-dot soon" />
                <div className="region-info">
                  <div className="region-name">Charlottetown, PEI</div>
                  <div className="region-status">Someday, maybe</div>
                </div>
              </a>
              <a className="region-item" href="https://www.google.com/maps/search/?api=1&query=Halifax,+NS,+Canada" target="_blank" rel="noopener noreferrer">
                <div className="region-dot soon" />
                <div className="region-info">
                  <div className="region-name">Halifax, NS</div>
                  <div className="region-status">Someday, maybe</div>
                </div>
              </a>
            </div>
            <Link to={ctaTo} className="btn btn-outline">{ctaLabel}</Link>
          </div>

          {/* SVG Map */}
          <div className="map-container reveal-right">
            <svg className="map-svg" viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(30,111,224,0.08)" strokeWidth="0.5" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <rect width="400" height="420" fill="url(#grid)" />

              {/* NB Coastline */}
              <path
                d="M 80,60 L 110,50 L 150,55 L 185,45 L 210,55 L 240,48 L 270,60 L 290,85 L 295,110 L 280,135 L 260,150 L 240,175 L 220,200 L 200,225 L 185,245 L 170,260 L 145,255 L 120,270 L 100,260 L 90,240 L 95,210 L 85,185 L 70,165 L 60,140 L 65,110 L 75,85 Z"
                fill="rgba(30,111,224,0.12)"
                stroke="rgba(30,111,224,0.35)"
                strokeWidth="1.5"
              />
              <text x="175" y="155" fontFamily="'Orbitron',sans-serif" fontSize="11" className="map-nb-label" fontWeight="700" textAnchor="middle">NB</text>

              {/* PEI */}
              <path
                d="M 290,90 L 320,80 L 355,85 L 365,100 L 350,110 L 315,108 L 292,100 Z"
                fill="rgba(181,245,60,0.06)"
                stroke="rgba(181,245,60,0.2)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="328" y="98" fontFamily="'Orbitron',sans-serif" fontSize="9" fill="rgba(181,245,60,0.5)" textAnchor="middle">PEI</text>

              {/* Nova Scotia */}
              <path
                d="M 170,280 L 210,270 L 250,275 L 290,285 L 320,295 L 345,315 L 350,340 L 330,360 L 305,370 L 275,360 L 250,345 L 225,350 L 200,345 L 180,330 L 165,310 L 168,290 Z"
                fill="rgba(181,245,60,0.05)"
                stroke="rgba(181,245,60,0.15)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="257" y="325" fontFamily="'Orbitron',sans-serif" fontSize="9" fill="rgba(181,245,60,0.4)" textAnchor="middle">NS</text>

              {/* Bay of Fundy label */}
              <text x="130" y="310" fontFamily="'IBM Plex Serif',serif" fontSize="8" fill="rgba(30,111,224,0.4)" textAnchor="middle" fontStyle="italic">Bay of Fundy</text>

              {/* Pin: Fredericton (active) */}
              <g className="map-pin" transform="translate(145,140)" filter="url(#glow)">
                <circle className="pin-ring" cx="0" cy="0" r="14" fill="rgba(181,245,60,0.1)" stroke="rgba(181,245,60,0.4)" strokeWidth="1">
                  <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="6" fill="#b5f53c" />
                <text x="0" y="28" fontFamily="'Orbitron',sans-serif" fontSize="7.5" fill="#b5f53c" textAnchor="middle" fontWeight="700">FREDERICTON</text>
              </g>

              {/* Pin: Moncton */}
              <g className="map-pin" transform="translate(225,115)">
                <circle cx="0" cy="0" r="5" fill="rgba(125,154,181,0.5)" stroke="rgba(125,154,181,0.4)" strokeWidth="1" />
                <text x="0" y="24" fontFamily="'Orbitron',sans-serif" fontSize="7" fill="rgba(125,154,181,0.7)" textAnchor="middle">MONCTON</text>
              </g>

              {/* Pin: Saint John */}
              <g className="map-pin" transform="translate(110,210)">
                <circle cx="0" cy="0" r="5" fill="rgba(125,154,181,0.5)" stroke="rgba(125,154,181,0.4)" strokeWidth="1" />
                <text x="0" y="-12" fontFamily="'Orbitron',sans-serif" fontSize="6.5" fill="rgba(125,154,181,0.7)" textAnchor="middle">SAINT JOHN</text>
              </g>

              {/* Pin: PEI */}
              <g className="map-pin" transform="translate(328,95)">
                <circle cx="0" cy="0" r="4" fill="rgba(181,245,60,0.3)" stroke="rgba(181,245,60,0.3)" strokeWidth="1" strokeDasharray="2,2" />
                <text x="0" y="16" fontFamily="'Orbitron',sans-serif" fontSize="6" fill="rgba(181,245,60,0.5)" textAnchor="middle">SOMEDAY</text>
              </g>

              {/* Pin: Halifax */}
              <g className="map-pin" transform="translate(290,320)">
                <circle cx="0" cy="0" r="4" fill="rgba(181,245,60,0.3)" stroke="rgba(181,245,60,0.3)" strokeWidth="1" strokeDasharray="2,2" />
                <text x="0" y="-12" fontFamily="'Orbitron',sans-serif" fontSize="6.5" fill="rgba(181,245,60,0.5)" textAnchor="middle">HALIFAX</text>
              </g>

              {/* Compass rose */}
              <g transform="translate(360,380)">
                <circle cx="0" cy="0" r="14" fill="rgba(10,26,46,0.8)" stroke="rgba(30,111,224,0.3)" strokeWidth="1" />
                <text x="0" y="-5" fontFamily="'Orbitron',sans-serif" fontSize="7" fill="rgba(181,245,60,0.8)" textAnchor="middle" fontWeight="700">N</text>
                <path d="M0,-10 L-3,2 L0,0 L3,2 Z" fill="rgba(181,245,60,0.6)" />
                <path d="M0,10 L-2,-2 L0,0 L2,-2 Z" fill="rgba(125,154,181,0.4)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
