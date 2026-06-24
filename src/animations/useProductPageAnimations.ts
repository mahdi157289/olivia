import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { EASE, initGsap, prefersReducedMotion, scheduleScrollRefresh } from './gsapConfig';

export function useProductPageEnter(
  pageRef: RefObject<HTMLElement | null>,
  productId: string | undefined,
) {
  useEffect(() => {
    if (!pageRef.current || !productId) return;

    initGsap();

    if (prefersReducedMotion()) {
      gsap.set(pageRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });

      tl.fromTo(
        pageRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
      )
        .fromTo(
          '.product-gallery',
          { autoAlpha: 0, x: -28 },
          { autoAlpha: 1, x: 0, duration: 0.75 },
          '-=0.35',
        )
        .fromTo(
          '.product-info > *',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 },
          '-=0.5',
        );

      const stepsSection = pageRef.current?.querySelector('.product-application-steps');
      if (stepsSection) {
        gsap.fromTo(
          stepsSection,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: EASE.out,
            scrollTrigger: {
              trigger: stepsSection,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      }

      const beforeAfter = pageRef.current?.querySelector('.product-before-after');
      if (beforeAfter) {
        gsap.fromTo(
          beforeAfter,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: EASE.out,
            scrollTrigger: {
              trigger: beforeAfter,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      }
    }, pageRef);

    scheduleScrollRefresh(150);
    return () => ctx.revert();
  }, [pageRef, productId]);
}

export function useRevealPanel(
  panelRef: RefObject<HTMLElement | null>,
  visible: boolean,
) {
  useEffect(() => {
    if (!visible || !panelRef.current) return;

    initGsap();

    if (prefersReducedMotion()) {
      gsap.set(panelRef.current, { autoAlpha: 1, height: 'auto', y: 0 });
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, height: 0, y: 24 },
      {
        autoAlpha: 1,
        height: 'auto',
        y: 0,
        duration: 0.55,
        ease: EASE.out,
      },
    );
  }, [visible, panelRef]);
}
