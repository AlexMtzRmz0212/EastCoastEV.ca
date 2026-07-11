import { useSearchParams } from 'react-router-dom';
import type { Brand, Category } from '../../lib/types';

interface FilterBarProps {
  brands: Brand[];
  categories: Category[];
}

export default function FilterBar({ brands, categories }: FilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeBrand = searchParams.get('brand');
  const activeCategory = searchParams.get('category');

  function setFilter(key: 'brand' | 'category', value: string | null) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  }

  return (
    <div className="filter-bar reveal">
      <div className="filter-group">
        <span className="filter-label">Brand</span>
        <button
          className={`filter-chip${activeBrand === null ? ' active' : ''}`}
          onClick={() => setFilter('brand', null)}
        >
          All
        </button>
        {brands.map(brand => (
          <button
            key={brand.id}
            className={`filter-chip${activeBrand === brand.slug ? ' active' : ''}`}
            onClick={() => setFilter('brand', brand.slug)}
          >
            {brand.name}
          </button>
        ))}
      </div>
      <div className="filter-group">
        <span className="filter-label">Type</span>
        <button
          className={`filter-chip${activeCategory === null ? ' active' : ''}`}
          onClick={() => setFilter('category', null)}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-chip${activeCategory === category.slug ? ' active' : ''}`}
            onClick={() => setFilter('category', category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
