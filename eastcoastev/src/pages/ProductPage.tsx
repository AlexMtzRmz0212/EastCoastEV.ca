import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from '../components/product/ImageGallery';
import ColorSwatches from '../components/product/ColorSwatches';
import SpecsTable from '../components/product/SpecsTable';
import ReserveForm from '../components/product/ReserveForm';
import { formatPrice, getProductBySlug } from '../lib/catalog';
import { useCatalog } from '../hooks/useCatalog';
import { useReveal } from '../hooks/useReveal';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: product,
    loading,
    error,
  } = useCatalog(() => getProductBySlug(slug ?? ''), [slug]);

  // The chosen swatch defaults to the product's first color; reset when we
  // navigate to a different product (adjust-state-during-render pattern).
  const [pickedColorId, setPickedColorId] = useState<string | null>(null);
  const [prevSlug, setPrevSlug] = useState(slug);
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setPickedColorId(null);
  }
  const selectedColorId = pickedColorId ?? product?.colors[0]?.id ?? null;

  useReveal([product]);

  useEffect(() => {
    document.title = product
      ? `${product.brand.name} ${product.name} — EastCoastEV`
      : 'Shop — EastCoastEV';
  }, [product]);

  if (loading) {
    return (
      <main className="subpage">
        <div className="container">
          <div className="product-detail">
            <div className="gallery-main skeleton" />
            <div>
              <div className="skeleton skeleton-line" style={{ width: '30%' }} />
              <div className="skeleton skeleton-line" style={{ width: '70%', height: '32px' }} />
              <div className="skeleton skeleton-line" style={{ width: '50%' }} />
              <div className="skeleton skeleton-line" style={{ width: '90%', height: '120px' }} />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="subpage">
        <div className="container">
          <div className="empty-state">
            <h3>{error ? "Couldn't load this product" : 'Product not found'}</h3>
            <p>
              {error
                ? 'Please refresh the page, or check back in a moment.'
                : 'It may have been removed or the link is out of date.'}
            </p>
            <Link to="/shop" className="btn btn-outline">
              Back to the Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="subpage">
      <div className="container">
        <nav className="breadcrumbs reveal" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/shop?brand=${product.brand.slug}`}>{product.brand.name}</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="reveal-left">
            <ImageGallery
              images={product.images}
              selectedColorId={selectedColorId}
              productName={product.name}
            />
          </div>

          <div className="product-info reveal-right">
            <div className="product-info-eyebrow">
              <span className="accent">{product.brand.name}</span>
              <span className="product-info-cat">{product.category.name}</span>
            </div>
            <h1 className="product-info-name">{product.name}</h1>
            {product.tagline && <p className="product-info-tagline">{product.tagline}</p>}
            <div className="product-info-price">{formatPrice(product.price_cents)}</div>

            <ColorSwatches
              colors={product.colors}
              selectedId={selectedColorId}
              onSelect={setPickedColorId}
            />

            {product.description && (
              <p className="product-info-desc">{product.description}</p>
            )}

            <ReserveForm product={product} selectedColorId={selectedColorId} />
          </div>
        </div>

        <SpecsTable specs={product.specs} />
      </div>
    </main>
  );
}
