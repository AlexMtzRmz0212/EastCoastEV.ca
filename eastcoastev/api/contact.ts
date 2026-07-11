import nodemailer from 'nodemailer';

// General contact-form intake — emails the owner. Mirrors api/notify.ts.

interface ContactBody {
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string;
}

interface Req { method?: string; body?: ContactBody }
interface Res { status(code: number): Res; json(data: unknown): void }

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = req.body ?? {};
  const name = b.name?.trim();
  const email = b.email?.trim();
  const message = b.message?.trim();

  if (!name || !email || !email.includes('@') || !message) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const lines = [
    `New contact message from ${name}`,
    `Email: ${email}`,
    b.phone ? `Phone: ${b.phone}` : null,
    '',
    'Message:',
    message,
  ].filter(Boolean);

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: 'eastcoastev.ca@gmail.com',
    replyTo: email,
    subject: `New contact message — ${name}`,
    text: lines.join('\n'),
  });

  return res.status(200).json({ ok: true });
}
