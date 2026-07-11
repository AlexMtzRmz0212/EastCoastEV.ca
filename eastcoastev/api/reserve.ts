import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Reservation intake: store the lead in Supabase (service-role key bypasses
// RLS — there are no anon write policies), then email the owner. If the email
// fails we still return 200: the reservation is safely stored and the customer
// shouldn't see an error. Mirrors the transport setup in api/notify.ts.

interface ReserveBody {
  productId?: string;
  productName?: string;
  colorId?: string | null;
  colorName?: string | null;
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string | null;
}

interface Req { method?: string; body?: ReserveBody }
interface Res { status(code: number): Res; json(data: unknown): void }

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = req.body ?? {};
  const name = b.name?.trim();
  const email = b.email?.trim();

  if (!b.productId || !name || !email || !email.includes('@')) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const { error: insertError } = await db.from('reservations').insert({
    product_id: b.productId,
    color_id: b.colorId ?? null,
    customer_name: name,
    email,
    phone: b.phone ?? null,
    message: b.message ?? null,
  });

  if (insertError) {
    console.error('reservation insert failed:', insertError.message);
    return res.status(500).json({ error: 'Could not save reservation' });
  }

  // Email the owner — best effort.
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const lines = [
      `New reservation for: ${b.productName ?? b.productId}`,
      b.colorName ? `Color: ${b.colorName}` : null,
      '',
      `Name:  ${name}`,
      `Email: ${email}`,
      b.phone ? `Phone: ${b.phone}` : null,
      b.message ? `\nMessage:\n${b.message}` : null,
      '',
      'Follow up within one business day.',
    ].filter(Boolean);

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'eastcoastev.ca@gmail.com',
      replyTo: email,
      subject: `New reservation — ${b.productName ?? 'a model'}`,
      text: lines.join('\n'),
    });
  } catch (err) {
    console.error('reservation email failed (lead still saved):', err);
  }

  return res.status(200).json({ ok: true });
}
