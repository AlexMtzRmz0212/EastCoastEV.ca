import { Link } from 'react-router-dom';

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  text?: string;
  primaryTo: string;
  primaryLabel: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}

// Closing call-to-action used at the bottom of the sub-pages to guide the
// visitor onward instead of dead-ending.
export default function CtaBand({
  eyebrow,
  title,
  text,
  primaryTo,
  primaryLabel,
  secondaryTo,
  secondaryLabel,
}: CtaBandProps) {
  return (
    <section className="cta-band reveal">
      <div className="cta-band-inner">
        {eyebrow && <div className="section-label">{eyebrow}</div>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        <div className="cta-band-actions">
          <Link to={primaryTo} className="btn btn-primary">
            {primaryLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          {secondaryTo && secondaryLabel && (
            <Link to={secondaryTo} className="btn btn-ghost">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
