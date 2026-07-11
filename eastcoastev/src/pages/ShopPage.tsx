import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FilterBar from '../components/shop/FilterBar';
import ProductCard from '../components/shop/ProductCard';
import { getBrands, getCategories, getProducts } from '../lib/catalog';
import { useCatalog } from '../hooks/useCatalog';
import { useReveal } from '../hooks/useReveal';

export default function ShopPage() {
  const { data: products, loading, error } = useCatalog(getProducts);
  const { data: brands } = useCatalog(getBrands);
  const { data: categories } = useCatalog(getCategories);
  const [searchParams] = useSearchParams();

  const brandFilter = searchParams.get('brand');
  const categoryFilter = searchParams.get('category');

  const filtered = (products ?? []).filter(
    p =>
      (!brandFilter || p.brand.slug === brandFilter) &&
      (!categoryFilter || p.category.slug === categoryFilter),
  );

  useReveal([products, brands, categories, brandFilter, categoryFilter]);

  useEffect(() => {
    document.title = 'Shop — EastCoastEV';
  }, []);

  return (
    <main className="subpage">
      <div className="container">
        <div className="page-head">
          <div className="section-label reveal">The Shop</div>
          <h1 className="page-title reveal">
            Find your <em className="accent">ride.</em>
          </h1>
          <p className="page-sub reveal">
            Every model below is available at our Fredericton storefront —
            reserve online and come try it in person.
          </p>
        </div>

        {(brands ?? []).length > 0 && (
          <FilterBar brands={brands ?? []} categories={categories ?? []} />
        )}

        {loading && (
          <div className="product-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div className="product-card skeleton-card" key={i}>
                <div className="product-card-media skeleton" />
                <div className="product-card-body">
                  <div className="skeleton skeleton-line" style={{ width: '40%' }} />
                  <div className="skeleton skeleton-line" style={{ width: '70%' }} />
                  <div className="skeleton skeleton-line" style={{ width: '30%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <h3>Couldn't load the catalog</h3>
            <p>Please refresh the page, or check back in a moment.</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="7" cy="18" r="3" />
              <circle cx="19" cy="18" r="3" />
              <path d="M7 18V8l5-4h4l2 4H12V8" />
            </svg>
            <h3>
              {(products ?? []).length === 0
                ? 'The catalog is being stocked'
                : 'No rides match those filters'}
            </h3>
            <p>
              {(products ?? []).length === 0 ? (
                <>
                  New rides are on their way — drop by the shop at 148 Main St,
                  Fredericton, or <Link to="/#contact">get in touch</Link>.
                </>
              ) : (
                'Try a different brand or type combination.'
              )}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="product-grid">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                delay={Math.min(i * 0.05, 0.3)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
