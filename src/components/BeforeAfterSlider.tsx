import { useState, useRef, useEffect } from 'react';

export function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle auto-play animation on load to hint at interactivity
    let animationId: number;
    let startTimestamp: number | null = null;
    const duration = 1500; // 1.5 seconds
    
    const easeInOutQuad = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      
      if (progress < duration) {
        // Animate from 50 to 55 and back to 50
        const percentage = progress / duration;
        let p = 50;
        if (percentage < 0.5) {
            p = 50 + easeInOutQuad(percentage * 2) * 5;
        } else {
            p = 55 - easeInOutQuad((percentage - 0.5) * 2) * 5;
        }
        setSliderPosition(p);
        animationId = requestAnimationFrame(animate);
      } else {
        setSliderPosition(50);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="before-after-slider" 
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <img src={afterImage} alt="After" className="slider-image-base" draggable={false} loading="lazy" />
      <div 
        className="slider-image-overlay" 
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={beforeImage} alt="Before" draggable={false} loading="lazy" />
      </div>
      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
        <div className="slider-handle-line"></div>
        <div className="slider-handle-button">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
      <div className="slider-labels">
        <span className="slider-label slider-label-before">Avant</span>
        <span className="slider-label slider-label-after">Après</span>
      </div>
    </div>
  );
}
