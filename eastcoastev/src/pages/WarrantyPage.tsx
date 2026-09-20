import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

interface BrandWarranty {
  name: string;
  url: string;
}

// Manufacturer warranty pages for every brand we currently sell. Keep this in
// sync with BRANDS in scripts/seed-data.ts when a brand is added or dropped.
const BRAND_WARRANTIES: BrandWarranty[] = [
  // { name: 'NIU', url: 'https://shopca.niu.com/pages/warranty' },
  { name: 'NIU', url: 'https://niucanada.com/en-ca/pages/warranty?_pos=1&_psq=Warra&_psid=4d6d998c8&_ss=e' },
  { name: 'E-Ride Pro', url: 'https://www.eridepro.com/pages/warranty' },
  { name: 'Yozma', url: 'https://yozmasport.com/pages/warranty' },
  // { name: 'Univelo (AIMA)', url: 'https://www.univelo.ca/pages/warranty' },
  { name: 'Univelo (AIMA)', url: 'https://www.aimamobility.ca/pages/warranty' },
  { name: 'Throne', url: 'https://thronecycles.com/pages/warranty' },
  { name: 'Sur-Ron', url: 'https://epiccycles.ca/warranty' },
];

export default function WarrantyPage() {
  useReveal();

  useEffect(() => {
    document.title = 'Warranty | EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">Legal</div>
          <h1 className="page-title reveal">Warranty</h1>
          <p className="page-sub reveal">Manufacturer warranties, by brand</p>
        </div>

        <div className="legal reveal">
          <p className="legal-intro">
            Every bike, scooter, and trike we sell is covered by its manufacturer's
            own warranty, not one written by EastCoastEV. Coverage length, what's
            included, and how to file a claim vary by brand, so use the links below
            to go straight to the manufacturer's official warranty page.
          </p>

          <h2>Brands we carry</h2>
          <ul>
            {BRAND_WARRANTIES.map(brand => (
              <li key={brand.name}>
                <strong>{brand.name}</strong> &mdash;{' '}
                <a href={brand.url} target="_blank" rel="noopener noreferrer">
                  {brand.name} warranty policy
                </a>
              </li>
            ))}
          </ul>

          <h2>Filing a claim</h2>
          <p>
            Start with the manufacturer's warranty page above for coverage details and
            claim requirements, and keep your proof of purchase handy. If you'd rather
            not deal with the manufacturer directly, our{' '}
            <Link to="/service">service team</Link> can help you sort out a claim on a
            bike you bought from us.
          </p>

          <h2>Questions</h2>
          <p>
            If you have any questions about this warranty page, contact your dedicated line{' '}
            <strong>613-915-7339</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
