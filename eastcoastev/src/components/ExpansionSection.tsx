import { useState } from 'react';
import { sendEmailNotification } from '../lib/sendNotification';

export default function ExpansionSection() {
  const [email, setEmail] = useState('');
  const [btnText, setBtnText] = useState('Notify Me');
  const [inputError, setInputError] = useState(false);

  async function handleSubmit() {
    if (email.includes('@')) {
      setBtnText('Sending…');
      try {
        await sendEmailNotification(email);
      } catch {
        // notification failure is silent — subscription UX still completes
      }
      setBtnText('✓ Subscribed!');
      setEmail('');
      setTimeout(() => setBtnText('Notify Me'), 3000);
    } else {
      setInputError(true);
      setTimeout(() => setInputError(false), 1500);
    }
  }

  return (
    <section className="expansion-section">
      <div className="container">
        <div className="expansion-grid">
          <div className="expansion-text reveal-left">
            <div className="section-label">Expansion</div>
            <h2>Headed your way. <em className="accent">We're growing.</em></h2>
            <p>We're planning to bring EastCoastEV to more cities across the Maritimes in the future. Sign up to be the first to know — and first to ride — when we launch in your area.</p>
            <div className="expansion-form">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputError ? { borderColor: '#e05050' } : {}}
              />
              <button
                className="btn btn-primary"
                style={{ fontSize: '0.7rem', padding: '14px 22px', flexShrink: 0 }}
                onClick={handleSubmit}
              >
                {btnText}
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '12px' }}>
              We're also looking for local brand ambassadors and commercial space leads.{' '}
              <a href="#contact" style={{ color: 'var(--accent)' }}>Get in touch →</a>
            </p>
          </div>

          <div className="expansion-locations reveal-right">
            <div className="exp-loc">
              <div className="exp-loc-icon">NB</div>
              <div className="exp-loc-text">
                <strong>Moncton &amp; Saint John, NB</strong>
                <span>Evaluating strategic hubs on the coast</span>
              </div>
              <div className="exp-loc-badge">TBD</div>
            </div>
            <div className="exp-loc">
              <div className="exp-loc-icon">PEI</div>
              <div className="exp-loc-text">
                <strong>Charlottetown, PEI</strong>
                <span>Perfect for future trail riders</span>
              </div>
              <div className="exp-loc-badge">TBD</div>
            </div>
            <div className="exp-loc">
              <div className="exp-loc-icon">NS</div>
              <div className="exp-loc-text">
                <strong>Halifax, Nova Scotia</strong>
                <span>Commuter demand is high — we're listening</span>
              </div>
              <div className="exp-loc-badge">TBD</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
