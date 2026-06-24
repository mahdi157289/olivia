import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCT_CATEGORIES, type ProductCategoryId } from '../data/productCatalog';
import { CategoryProductList } from './CategoryProductList';

type MobileCategoryNavProps = {
  onNavigate?: () => void;
  linkClass: (active: boolean) => string;
};

export function MobileCategoryNav({ onNavigate, linkClass }: MobileCategoryNavProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<ProductCategoryId | null>(null);

  return (
    <div className="nav-drawer__categories">
      <p className="nav-drawer__categories-label">Nos gammes</p>
      {PRODUCT_CATEGORIES.map((category) => {
        const isExpanded = expanded === category.id;
        const totalProducts = category.subCategories.reduce((sum, sub) => sum + sub.products.length, 0);
        const categoryActive = category.subCategories.some((sub) =>
          sub.products.some((p) => location.pathname === `/produit/${p.slug}`),
        );

        return (
          <div key={category.id} className="nav-drawer__category">
            <button
              type="button"
              className={`nav-drawer__category-trigger${categoryActive ? ' is-active' : ''}`}
              aria-expanded={isExpanded}
              onClick={() => setExpanded(isExpanded ? null : category.id)}
            >
              <span>
                <span className="nav-drawer__category-name">{category.shortLabel}</span>
                <span className="nav-drawer__category-meta">{totalProducts} produits</span>
              </span>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <polyline
                  points={isExpanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </button>
            {isExpanded && (
              <div className="nav-drawer__category-panel">
                <CategoryProductList
                  category={category}
                  onNavigate={onNavigate}
                  variant="mobile"
                />
              </div>
            )}
          </div>
        );
      })}
      <a
        href={location.pathname === '/' ? '#services' : '/#services'}
        className={`nav-drawer__catalog-link ${linkClass(false)}`}
        onClick={onNavigate}
      >
        Tous les produits
      </a>
    </div>
  );
}
