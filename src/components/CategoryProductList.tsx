import { Link, useLocation } from 'react-router-dom';
import type { ProductCategory } from '../data/productCatalog';

type CategoryProductListProps = {
  category: ProductCategory;
  onNavigate?: () => void;
  variant?: 'desktop' | 'mobile';
};

export function CategoryProductList({
  category,
  onNavigate,
  variant = 'desktop',
}: CategoryProductListProps) {
  const location = useLocation();
  return (
    <div className={`nav-mega__content nav-mega__content--${variant}`}>
      {category.subCategories.map((subCategory) => (
        <div key={subCategory.id} className="nav-mega__subcategory">
          <h4 className="nav-mega__subcategory-title">{subCategory.label}</h4>
          <ul className="nav-mega__grid">
            {subCategory.products.map((product) => {
              const isCurrent = location.pathname === `/produit/${product.slug}`;
              return (
                <li key={product.slug}>
                  <Link
                    to={`/produit/${product.slug}`}
                    className={`nav-mega__link${isCurrent ? ' is-current' : ''}`}
                    onClick={onNavigate}
                  >
                    {product.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
