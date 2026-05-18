import { useLocation } from 'react-router-dom';
import { SITE_BACKGROUND_IMAGES, PRODUCT_DETAIL_BACKGROUND } from './siteBackgrounds';
import { useBackgroundSlideIndex } from './BackgroundSlideContext';

export function PageBackgroundLayers() {
  const active = useBackgroundSlideIndex();
  const location = useLocation();

  const isProductPage = location.pathname.startsWith('/produit/');

  if (isProductPage) {
    return (
      <div className="page-bg-cycle" aria-hidden="true">
        <div
          className="page-bg-cycle__layer"
          style={{
            backgroundImage: `url("${PRODUCT_DETAIL_BACKGROUND}")`,
            opacity: 1,
          }}
        />
      </div>
    );
  }

  if (SITE_BACKGROUND_IMAGES.length === 0) return null;

  return (
    <div className="page-bg-cycle" aria-hidden="true">
      {SITE_BACKGROUND_IMAGES.map((src, i) => (
        <div
          key={src}
          className="page-bg-cycle__layer page-bg-cycle__layer--home"
          style={{
            backgroundImage: `url("${src}")`,
            opacity: active === i ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
