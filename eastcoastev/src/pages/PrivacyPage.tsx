import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

/*
  NOTE: This policy is drafted from the site's actual data flows and is provided
  as a solid starting point. Have it reviewed by legal counsel before go-live.
*/
export default function PrivacyPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Privacy Policy | EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Legal</div>
          <h1 className="page-title reveal">Privacy Policy</h1>
          <p className="page-sub reveal">Last updated: July 2026</p>
        </div>

        <div className="legal reveal">
          <p className="legal-intro">
            EastCoastEV Ltd. ("EastCoastEV", "we", "us") operates this website and
            the electric-vehicle shop at 148 Main St, Fredericton, NB. This policy
            explains what personal information we collect, why we collect it, and
            how you can access or delete it. We handle personal information in line
            with Canada's Personal Information Protection and Electronic Documents
            Act (PIPEDA).
          </p>

          <h2>What we collect</h2>
          <p>We only collect the information you choose to give us through the forms on this site:</p>
          <ul>
            <li><strong>Contact form:</strong> your name, email address, optional phone number, and the message you write.</li>
            <li><strong>Reservation form:</strong> your name, email address, optional phone number, the product and colour you're interested in, and any notes you add.</li>
            <li><strong>Newsletter / "notify me" signup:</strong> your email address.</li>
          </ul>
          <p>
            We do not run advertising or analytics trackers, and we do not use
            tracking cookies. Fonts are loaded from Google Fonts, which may receive
            your IP address as part of delivering those files; this is standard web
            font delivery and is not used by us to identify you.
          </p>

          <h2>Why we collect it</h2>
          <p>We use your information only to:</p>
          <ul>
            <li>respond to your questions and service or test-ride requests;</li>
            <li>hold and confirm a reservation you asked us to place;</li>
            <li>send you the occasional update if you asked to be notified.</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to anyone.</p>

          <h2>How it's stored and who processes it</h2>
          <p>
            Form submissions are stored in our database, hosted by <strong>Supabase</strong>,
            and a notification is emailed to our shop inbox
            (<a href="mailto:info@eastcoastev.ca">info@eastcoastev.ca</a>) through our
            email delivery provider. These providers process the data on our behalf
            and are not permitted to use it for their own purposes. Data may be stored
            on servers outside your province or country.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep enquiry, reservation, and subscriber information only as long as
            needed to help you and to keep reasonable business records, then delete it.
            You can ask us to remove it sooner at any time.
          </p>

          <h2>How to access, correct, or delete your data</h2>
          <p>
            You can ask us what personal information we hold about you, correct it, or
            have it deleted. Email <a href="mailto:info@eastcoastev.ca">info@eastcoastev.ca</a>{' '}
            or call <a href="tel:+15062391855">+1 (506) 239-1855</a> and we'll take care
            of it, usually within a few business days. To unsubscribe from updates, just
            reply asking to be removed.
          </p>

          <h2>Children's privacy</h2>
          <p>
            This site is intended for adults. We don't knowingly collect personal
            information from children under 13; if you believe a child has contacted us,
            let us know and we'll delete it.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The "last updated" date above
            reflects the current version.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about your privacy? Email{' '}
            <a href="mailto:info@eastcoastev.ca">info@eastcoastev.ca</a>, call{' '}
            <a href="tel:+15062391855">+1 (506) 239-1855</a>, or visit us at 148 Main St,
            Fredericton, NB E3A 2B5. See also our{' '}
            <Link to="/terms">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
