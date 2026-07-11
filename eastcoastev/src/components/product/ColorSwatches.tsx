import type { ProductColor } from '../../lib/types';

interface ColorSwatchesProps {
  colors: ProductColor[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ColorSwatches({
  colors,
  selectedId,
  onSelect,
}: ColorSwatchesProps) {
  if (colors.length === 0) return null;

  const selected = colors.find(c => c.id === selectedId);

  return (
    <div className="swatch-row">
      <span className="swatch-label">
        Color{selected ? <em> — {selected.name}</em> : ''}
      </span>
      <div className="swatches">
        {colors.map(color => (
          <button
            key={color.id}
            className={`swatch${color.id === selectedId ? ' active' : ''}`}
            style={{ background: color.hex ?? 'var(--slate)' }}
            onClick={() => onSelect(color.id)}
            title={color.name}
            aria-label={`Color: ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
}
