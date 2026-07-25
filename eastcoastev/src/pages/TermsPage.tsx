import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

/*
  NOTE: These terms are a general starting point drafted from how the site works.
  Have them reviewed by legal counsel before go-live.
*/
export default function TermsPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Terms of Service | EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Legal</div>
          <h1 className="page-title reveal">Terms of Service</h1>
          <p className="page-sub reveal">Last updated: July 2026</p>
        </div>

        <div className="legal reveal">
          <p className="legal-intro">
            These terms govern your use of the EastCoastEV website, operated by
            EastCoastEV Ltd. of 148 Main St, Fredericton, NB. By using this site,
            you agree to them. If you don't agree, please don't use the site.
          </p>

          <h2>About this site</h2>
          <p>
            This website is an informational catalogue for our Fredericton storefront.
            It lets you browse products, request service, and place a reservation.
            <strong> It does not process payments online.</strong> Reservations and
            enquiries are requests, not confirmed sales.
          </p>

          <h2>Product information, pricing, and availability</h2>
          <p>
            We work to keep product details, specifications, and prices accurate, but
            errors can happen and stock changes. Listings are not binding offers, and we
            may correct information, update pricing, or change availability at any time
            without notice. Final pricing and availability are confirmed at the shop.
          </p>

          <h2>Reservations and service bookings</h2>
          <p>
            When you reserve a model, you're asking us to hold one for you; no payment is
            taken and no purchase is finalized until you complete it in person and we
            confirm it. Reservations depend on stock and may not always be fulfilled.
            Service bookings are subject to scheduling, inspection, and our confirmation.
          </p>

          <h2>Acceptable use</h2>
          <p>
            Please use the site lawfully. Don't attempt to disrupt it, access it in
            unauthorized ways, or misuse the contact and reservation forms (for example,
            with spam or false information).
          </p>

          <h2>Intellectual property</h2>
          <p>
            The site's content, branding, and design are owned by EastCoastEV Ltd. or its
            licensors and may not be copied or reused without permission. Product names and
            brand logos belong to their respective owners.
          </p>

          <h2>Third-party links</h2>
          <p>
            The site may link to other websites (such as map or brand pages). We're not
            responsible for the content or practices of those sites.
          </p>

          <h2>Disclaimers and limitation of liability</h2>
          <p>
            The site is provided "as is" without warranties of any kind. To the fullest
            extent permitted by law, EastCoastEV Ltd. is not liable for any indirect or
            consequential loss arising from your use of the site. Nothing here limits
            rights you may have under applicable consumer-protection law.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the Province of New Brunswick and the
            federal laws of Canada that apply there, and any disputes are subject to the
            courts of New Brunswick.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The "last updated" date above
            reflects the current version.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these terms? Email{' '}
            <a href="mailto:info@eastcoastev.ca">info@eastcoastev.ca</a>, call{' '}
            <a href="tel:+15062391855">+1 (506) 239-1855</a>, or visit us at 148 Main St,
            Fredericton, NB E3A 2B5. See also our{' '}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
