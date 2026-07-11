import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ProductWithRelations } from '../../lib/types';

interface ReserveFormProps {
  product: ProductWithRelations;
  selectedColorId: string | null;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

// GH Pages previews are static (no /api functions), so builds there set
// VITE_RESERVE_DEMO to simulate success instead of calling the backend.
const isDemo = import.meta.env.VITE_RESERVE_DEMO === 'true';

export default function ReserveForm({
  product,
  selectedColorId,
}: ReserveFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [fieldError, setFieldError] = useState(false);

  // The dropdown defaults to the swatch chosen above; picking one here sticks
  // until the swatch changes again (reset-on-prop, adjusted during render).
  const [pickedColorId, setPickedColorId] = useState<string | null>(null);
  const [prevSelected, setPrevSelected] = useState(selectedColorId);
  if (selectedColorId !== prevSelected) {
    setPrevSelected(selectedColorId);
    setPickedColorId(null);
  }
  const colorId = pickedColorId ?? selectedColorId;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) {
      setFieldError(true);
      setTimeout(() => setFieldError(false), 1500);
      return;
    }

    setStatus('sending');

    if (isDemo || import.meta.env.DEV) {
      console.info('[preview] Reservation skipped (no backend):', {
        product: product.name,
        name,
        email,
      });
      setTimeout(() => setStatus('success'), 600);
      return;
    }

    try {
      const color = product.colors.find(c => c.id === colorId);
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: `${product.brand.name} ${product.name}`,
          colorId: colorId ?? null,
          colorName: color?.name ?? null,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          message: message.trim() || null,
        }),
      });
      if (!res.ok) throw new Error(`Reserve failed: ${res.status}`);
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
          Reservation received
        </div>
        <h3>You're on the list!</h3>
        <p>
          Thanks {name.split(' ')[0] || 'for reserving'} — we'll reach out within
          one business day to confirm your {product.name}
          {isDemo || import.meta.env.DEV ? ' (preview mode — no email was sent)' : ''}.
        </p>
      </div>
    );
  }

  return (
    <form className="reserve-card" onSubmit={handleSubmit}>
      <div className="rental-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
        No payment required
      </div>
      <h3>Reserve this model</h3>
      <p>
        Put your name on it — we'll hold one at the shop and contact you to
        arrange a test ride or pickup.
      </p>

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
        {product.colors.length > 0 && (
          <select
            aria-label="Preferred color"
            value={colorId ?? ''}
            onChange={e => setPickedColorId(e.target.value || null)}
          >
            {product.colors.map(color => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
        )}
        <textarea
          placeholder="Anything we should know? (optional)"
          aria-label="Message"
          rows={3}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p className="reserve-error">
          Something went wrong — please try again, or call us at +1 (506) 239-1855.
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Reserve Now'}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
