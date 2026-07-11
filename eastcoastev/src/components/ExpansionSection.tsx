import { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="section-label">A Someday Dream</div>
            <h2>Maybe one day, <em className="accent">beyond the Bay.</em></h2>
            <p>Growing past Fredericton is a someday dream — not a plan or a promise. But if enough riders in a city put their hand up, who knows where the road leads. Leave your email and we'll remember you.</p>
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
              Dream as big as we do? We'd love to hear from fellow riders.{' '}
              <Link to="/contact" style={{ color: 'var(--accent)' }}>Get in touch →</Link>
            </p>
          </div>

          <div className="expansion-locations reveal-right">
            <div className="exp-loc">
              <div className="exp-loc-icon">NB</div>
              <div className="exp-loc-text">
                <strong>Moncton &amp; Saint John, NB</strong>
                <span>Wouldn't it be nice, one day?</span>
              </div>
              <div className="exp-loc-badge">Someday</div>
            </div>
            <div className="exp-loc">
              <div className="exp-loc-icon">PEI</div>
              <div className="exp-loc-text">
                <strong>Charlottetown, PEI</strong>
                <span>Island rides — a lovely daydream</span>
              </div>
              <div className="exp-loc-badge">Someday</div>
            </div>
            <div className="exp-loc">
              <div className="exp-loc-icon">NS</div>
              <div className="exp-loc-text">
                <strong>Halifax, Nova Scotia</strong>
                <span>A big-city someday, if the stars align</span>
              </div>
              <div className="exp-loc-badge">Someday</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
