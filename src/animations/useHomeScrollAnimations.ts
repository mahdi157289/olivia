import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { EASE, initGsap, prefersReducedMotion, scheduleScrollRefresh } from './gsapConfig';

const SECTION_REVEAL_SELECTOR = [
  '.card[data-reveal]',
  '.ring-carousel-container',
  '.before-after-card',
  '.premium-panel > div',
  '.quote-form',
  '.stats article',
  '[data-reveal]',
].join(', ');

export function useHomeScrollAnimations(
  scopeRef: RefObject<HTMLElement | null>,
  appReady: boolean,
) {
  useEffect(() => {
    if (!appReady || !scopeRef.current) return;

    initGsap();

    if (prefersReducedMotion()) {
      gsap.set(scopeRef.current.querySelectorAll('section'), { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('section:not(.hero)', scopeRef.current);

      sections.forEach((section, index) => {
        const heading = section.querySelector('h2');
        const separator = section.querySelector('.title-separator');
        const revealTargets = section.querySelectorAll<HTMLElement>(SECTION_REVEAL_SELECTOR);
        const sectionBg = section.querySelector('.section-bg');

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            id: `section-${index}`,
          },
        });

        if (sectionBg) {
          sectionTl.fromTo(
            sectionBg,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: EASE.out },
            'bg',
          );
        }

        if (heading) {
          sectionTl.fromTo(
            heading,
            { y: 30, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.6, ease: EASE.outStrong },
            'heading',
          );
        }

        if (separator) {
          sectionTl.fromTo(
            separator,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left center',
              duration: 0.5,
              ease: EASE.inOut,
            },
            'heading',
          );
        }

        if (revealTargets.length > 0) {
          sectionTl.fromTo(
            revealTargets,
            { y: 20, autoAlpha: 0, scale: 1 },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: EASE.out,
            },
            'content',
          );
        }
      });

    }, scopeRef);

    const onLoad = () => scheduleScrollRefresh(50);
    window.addEventListener('load', onLoad);
    scheduleScrollRefresh(100);

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [appReady, scopeRef]);
}
