import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { EASE, initGsap, prefersReducedMotion, scheduleScrollRefresh } from './gsapConfig';

const HERO_ENTER_SELECTOR = [
  '.hero-background',
  '.hero-content .eyebrow',
  '.hero-content h1',
  '.hero-actions',
  '.hero-showcase__frame',
] as const;

export function useHeroEnterAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  appReady: boolean,
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    initGsap();

    const ctx = gsap.context(() => {
      const background = scope.querySelector('.hero-background');
      const eyebrow = scope.querySelector('.hero-content .eyebrow');
      const heading = scope.querySelector('.hero-content h1');
      const actions = scope.querySelector('.hero-actions');
      const showcase = scope.querySelector('.hero-showcase__frame');

      gsap.set([background, eyebrow, heading, actions, showcase].filter(Boolean), {
        autoAlpha: 0,
      });
      if (background) gsap.set(background, { scale: 1.08 });
      if (eyebrow) gsap.set(eyebrow, { y: 20 });
      if (heading) gsap.set(heading, { y: 56 });
      if (actions) gsap.set(actions, { y: 20 });
      if (showcase) gsap.set(showcase, { y: 40, scale: 0.96 });

      if (!appReady) return;

      if (prefersReducedMotion()) {
        gsap.set(scope.querySelectorAll(HERO_ENTER_SELECTOR.join(', ')), {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        });
        scheduleScrollRefresh(80);
        return;
      }

      const heroTl = gsap.timeline({
        defaults: { ease: EASE.outStrong },
        onComplete: () => scheduleScrollRefresh(100),
      });

      if (background) {
        heroTl.fromTo(
          background,
          { autoAlpha: 0, scale: 1.08 },
          { autoAlpha: 1, scale: 1, duration: 1.35 },
        );
      }
      if (heading) {
        heroTl.fromTo(
          heading,
          { y: 56, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1 },
          background ? '-=0.95' : 0,
        );
      }
      if (eyebrow) {
        heroTl.fromTo(
          eyebrow,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75 },
          '-=0.75',
        );
      }
      if (actions) {
        heroTl.fromTo(
          actions,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75 },
          '-=0.55',
        );
      }
      if (showcase) {
        heroTl.fromTo(
          showcase,
          { autoAlpha: 0, y: 40, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: EASE.out },
          '-=0.9',
        );
      }
    }, scope);

    return () => ctx.revert();
  }, [appReady, scopeRef]);
}
