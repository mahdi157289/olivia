import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function initGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export const EASE = {
  out: 'power3.out',
  outStrong: 'power4.out',
  inOut: 'power2.inOut',
} as const;

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/** Debounced ScrollTrigger.refresh after layout/images change. */
export function scheduleScrollRefresh(delayMs = 120) {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    refreshTimer = null;
    ScrollTrigger.refresh();
  }, delayMs);
}

export function killScrollTriggers(scope?: Element | string) {
  ScrollTrigger.getAll().forEach((st) => {
    if (!scope) {
      st.kill();
      return;
    }
    const trigger = st.trigger;
    if (!trigger || !(trigger instanceof Element)) return;
    const root =
      typeof scope === 'string'
        ? document.querySelector(scope)
        : scope;
    if (root && (root === trigger || root.contains(trigger))) st.kill();
  });
}
