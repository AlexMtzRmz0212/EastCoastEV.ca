import nodemailer from 'nodemailer';

interface Req { method?: string; body?: { email?: string }; }
interface Res { status(code: number): Res; json(data: unknown): void; }

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = req.body?.email;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: 'info@eastcoastev.ca',
    subject: 'New subscriber lead',
    text: `user: ${email} has input their email, contact is advised`,
  });

  return res.status(200).json({ ok: true });
}
