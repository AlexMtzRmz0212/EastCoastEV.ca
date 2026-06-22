export async function sendEmailNotification(userEmail: string): Promise<void> {
  if (import.meta.env.DEV) {
    console.info('[dev] Email notification skipped in local dev:', userEmail);
    return;
  }

  const res = await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail }),
  });

  if (!res.ok) throw new Error(`Notification failed: ${res.status}`);
}
