import { Link } from 'react-router-dom';
import { formatPrice, imageUrl } from '../../lib/catalog';
import type { ProductWithRelations } from '../../lib/types';

interface ProductCardProps {
  product: ProductWithRelations;
  delay?: number;
}

export default function ProductCard({ product, delay = 0 }: ProductCardProps) {
  const cover = product.images[0];

  return (
    <Link
      to={`/product/${product.slug}`}
      className="product-card reveal"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="product-card-media">
        {cover ? (
          <img
            src={imageUrl(cover.storage_path)}
            alt={cover.alt ?? product.name}
            loading="lazy"
          />
        ) : (
          <div className="product-card-noimg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="7" cy="18" r="3" />
              <circle cx="19" cy="18" r="3" />
              <path d="M7 18V8l5-4h4l2 4H12V8" />
            </svg>
          </div>
        )}
        {product.is_featured && <span className="product-flag">Featured</span>}
      </div>
      <div className="product-card-body">
        <div className="product-card-eyebrow">
          <span>{product.brand.name}</span>
          <span className="product-card-cat">{product.category.name}</span>
        </div>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-foot">
          <span className="product-price">{formatPrice(product.price_cents)}</span>
          {product.colors.length > 0 && (
            <span className="product-card-swatches">
              {product.colors.slice(0, 5).map(color => (
                <span
                  key={color.id}
                  className="mini-swatch"
                  style={{ background: color.hex ?? 'var(--slate)' }}
                  title={color.name}
                />
              ))}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
