import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_BACKGROUND_IMAGES, PRODUCT_DETAIL_BACKGROUND } from './siteBackgrounds';

const INTERVAL_MS = 10_000;

const BackgroundSlideIndexContext = createContext<number>(0);

export function BackgroundSlideProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const n = SITE_BACKGROUND_IMAGES.length;

  useEffect(() => {
    if (n === 0) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % n);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [n]);

  useEffect(() => {
    document.documentElement.dataset.bgSlide = String(index);
  }, [index]);

  const location = useLocation();

  /** Keep html in sync with the same five photos — no flat black behind transparent UI. */
  useEffect(() => {
    const isProductPage = location.pathname.startsWith('/produit/');
    if (isProductPage) {
      document.documentElement.style.setProperty('--page-bg-fallback', `url("${PRODUCT_DETAIL_BACKGROUND}")`);
      return;
    }

    if (n === 0) return;
    const url = SITE_BACKGROUND_IMAGES[index];
    document.documentElement.style.setProperty('--page-bg-fallback', `url("${url}")`);
  }, [index, n, location.pathname]);

  useEffect(
    () => () => {
      document.documentElement.removeAttribute('data-bg-slide');
      document.documentElement.style.removeProperty('--page-bg-fallback');
    },
    [],
  );

  return <BackgroundSlideIndexContext.Provider value={index}>{children}</BackgroundSlideIndexContext.Provider>;
}

export function useBackgroundSlideIndex() {
  return useContext(BackgroundSlideIndexContext);
}
