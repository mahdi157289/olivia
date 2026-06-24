import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { initGsap, prefersReducedMotion } from './gsapConfig';

/** GSAP crossfade between hero stucco slides (replaces CSS-only opacity). */
export function useHeroShowcaseSlides(
  viewportRef: RefObject<HTMLElement | null>,
  activeIndex: number,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const root = viewportRef.current;
    if (!root) return;

    initGsap();
    const slides = root.querySelectorAll<HTMLElement>('.hero-showcase__slide');
    if (slides.length === 0) return;

    if (prefersReducedMotion()) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === activeIndex);
        gsap.set(slide, { autoAlpha: i === activeIndex ? 1 : 0 });
      });
      return;
    }

    slides.forEach((slide, i) => {
      const isActive = i === activeIndex;
      slide.classList.toggle('is-active', isActive);
      if (isActive) {
        gsap.to(slide, {
          autoAlpha: 1,
          duration: 0.85,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      } else {
        gsap.to(slide, {
          autoAlpha: 0,
          duration: 0.65,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }
    });
  }, [activeIndex, viewportRef, enabled]);
}
