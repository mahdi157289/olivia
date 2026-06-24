import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EASE, initGsap, prefersReducedMotion, scheduleScrollRefresh } from '../animations/gsapConfig';

export type ApplicationStep = {
  title: string;
  description: string;
};

export function ApplicationSteps({ steps }: { steps: ApplicationStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    initGsap();

    if (prefersReducedMotion()) {
      gsap.set([lineRef.current, ...containerRef.current.querySelectorAll('.step-card, .step-dot')], {
        autoAlpha: 1,
        scale: 1,
        scaleY: 1,
        x: 0,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 78%',
            end: 'bottom 75%',
            scrub: 0.65,
          },
        },
      );

      const stepCards = gsap.utils.toArray<HTMLElement>('.step-card');
      stepCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 40, x: i % 2 === 0 ? -24 : 24 },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            duration: 0.85,
            ease: EASE.out,
            scrollTrigger: {
              trigger: card,
              start: 'top 86%',
              toggleActions: 'play none none none',
            },
          },
        );
      });

      const dots = gsap.utils.toArray<HTMLElement>('.step-dot');
      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.55,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    }, containerRef);

    scheduleScrollRefresh(100);
    return () => ctx.revert();
  }, [steps]);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="application-steps-wrapper" ref={containerRef}>
      <h3 className="application-steps-title">Processus d'Application</h3>
      <div className="title-separator" />
      <div className="steps-timeline">
        <div className="step-timeline-line-bg"></div>
        <div className="step-timeline-line" ref={lineRef}></div>
        {steps.map((step, index) => (
          <div key={index} className={`step-item ${index % 2 === 0 ? 'step-left' : 'step-right'}`}>
            <div className="step-content">
              <div className="step-card premium-glassbox">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
            <div className="step-dot-container">
              <div className="step-dot"></div>
            </div>
            <div className="step-spacer"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
