import { useMemo, useState } from 'react';
import { imageUrl } from '../../lib/catalog';
import type { ProductImage } from '../../lib/types';

interface ImageGalleryProps {
  images: ProductImage[];
  selectedColorId: string | null;
  productName: string;
}

export default function ImageGallery({
  images,
  selectedColorId,
  productName,
}: ImageGalleryProps) {
  // Show the selected color's shots; fall back to generic (colorless) shots,
  // then to everything, so a color without photos still shows the product.
  const shown = useMemo(() => {
    if (selectedColorId) {
      const forColor = images.filter(img => img.color_id === selectedColorId);
      if (forColor.length > 0) return forColor;
    }
    const generic = images.filter(img => img.color_id === null);
    return generic.length > 0 ? generic : images;
  }, [images, selectedColorId]);

  // Reset to the first photo when the selected color changes (reset-on-prop
  // pattern, adjusted during render rather than in an effect).
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevColorId, setPrevColorId] = useState(selectedColorId);
  if (selectedColorId !== prevColorId) {
    setPrevColorId(selectedColorId);
    setActiveIndex(0);
  }

  const active = shown[activeIndex] ?? shown[0];

  if (!active) {
    return (
      <div className="gallery">
        <div className="gallery-main gallery-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="7" cy="18" r="3" />
            <circle cx="19" cy="18" r="3" />
            <path d="M7 18V8l5-4h4l2 4H12V8" />
          </svg>
          <span>Photos coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={imageUrl(active.storage_path)} alt={active.alt ?? productName} />
      </div>
      {shown.length > 1 && (
        <div className="gallery-thumbs">
          {shown.map((img, i) => (
            <button
              key={img.id}
              className={`gallery-thumb${i === activeIndex ? ' active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
            >
              <img src={imageUrl(img.storage_path)} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
