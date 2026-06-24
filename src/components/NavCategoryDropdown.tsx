import { useEffect, useRef, useState } from 'react';
import type { ProductCategory } from '../data/productCatalog';
import { CategoryProductList } from './CategoryProductList';

const CLOSE_DELAY_MS = 160;

type NavCategoryDropdownProps = {
  category: ProductCategory;
  isActive: boolean;
};

export function NavCategoryDropdown({ category, isActive }: NavCategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const close = () => setOpen(false);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => () => cancelClose(), []);

  const totalProducts = category.subCategories.reduce((sum, sub) => sum + sub.products.length, 0);

  return (
    <div
      className={`nav-dropdown nav-dropdown--${category.id}${open ? ' is-open' : ''}${isActive ? ' is-active' : ''}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openMenu}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleClose();
      }}
    >
      <button
        type="button"
        className="nav-dropdown__trigger"
        aria-expanded={open}
        aria-haspopup="true"
        title={category.label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-dropdown__trigger-text">{category.shortLabel}</span>
        <svg className="nav-dropdown__chevron" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </button>

      <div className="nav-dropdown__panel" role="menu" aria-label={category.label}>
        <div className="nav-mega__head">
          <div className="nav-mega__head-text">
            <span className="nav-mega__label">{category.label}</span>
            <span className="nav-mega__count">{totalProducts} finitions</span>
          </div>
          <div className="nav-mega__accent" aria-hidden="true" />
        </div>

        <CategoryProductList category={category} onNavigate={close} variant="desktop" />
      </div>
    </div>
  );
}
