import { useState } from 'react';
import type { FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

// Static previews (GitHub Pages) have no /api backend, so they simulate success.
const isDemo = import.meta.env.VITE_RESERVE_DEMO === 'true';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) {
      setFieldError(true);
      setTimeout(() => setFieldError(false), 1500);
      return;
    }

    setStatus('sending');

    if (isDemo || import.meta.env.DEV) {
      console.info('[preview] Contact message skipped (no backend):', { name, email });
      setTimeout(() => setStatus('success'), 600);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          message: message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`Contact failed: ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="reserve-card reserve-success">
        <div className="rental-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Message sent
        </div>
        <h3>Thanks, {name.split(' ')[0] || 'friend'}!</h3>
        <p>
          We got your message and will get back to you within one business day
          {isDemo || import.meta.env.DEV ? ' (preview mode — no email was sent)' : ''}.
        </p>
      </div>
    );
  }

  return (
    <form className="reserve-card" onSubmit={handleSubmit}>
      <h3>Send us a message</h3>
      <p>Questions, service bookings, test rides — we read every one.</p>

      <div className="reserve-fields">
        <input
          type="text"
          placeholder="Your name *"
          aria-label="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={fieldError && !name.trim() ? { borderColor: '#e05050' } : {}}
        />
        <input
          type="email"
          placeholder="Email *"
          aria-label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={fieldError && !email.includes('@') ? { borderColor: '#e05050' } : {}}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          aria-label="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <textarea
          placeholder="How can we help? *"
          aria-label="Message"
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={fieldError && !message.trim() ? { borderColor: '#e05050' } : {}}
        />
      </div>

      {status === 'error' && (
        <p className="reserve-error">
          Something went wrong — please try again, or call us at +1 (506) 239-1855.
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
