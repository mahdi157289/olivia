import { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, FormEvent } from 'react';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundSlideProvider } from './BackgroundSlideContext';
import { PageBackgroundLayers } from './PageBackgroundLayers';
import { HERO_STUCCO_SLIDES } from './heroStuccoImages';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardOverview } from './admin/DashboardOverview';
import { ProductsInventory } from './admin/ProductsInventory';
import { QuotesManagement } from './admin/QuotesManagement';
import { EditProduct } from './admin/EditProduct';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ApplicationSteps } from './components/ApplicationSteps';
import { NavCategoryDropdown } from './components/NavCategoryDropdown';
import {
  useProductPageEnter,
  useRevealPanel,
} from './animations/useProductPageAnimations';
import { useHeroEnterAnimation } from './animations/useHeroEnterAnimation';
import { useHeroShowcaseSlides } from './animations/useHeroShowcaseSlides';
import { useHomeScrollAnimations } from './animations/useHomeScrollAnimations';
import { AppReadyProvider, useAppReady } from './AppReadyContext';
import { AboutSection } from './components/AboutSection';
import { MobileCategoryNav } from './components/MobileCategoryNav';
import { MOBILE_MQ, useMediaQuery } from './hooks/useMediaQuery';
import {
  buildCatalogProducts,
  getCategoryBySlug,
  LEGACY_PRODUCT_SLUGS,
  PRODUCT_CATEGORIES,
  type Product,
} from './data/productCatalog';

export type { Product };
export const products = buildCatalogProducts();

gsap.registerPlugin(ScrollTrigger);

function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    // Near-instant fade out when video ends
    gsap.to(loaderRef.current, {
      autoAlpha: 0,
      duration: 0.1,
      onComplete: onComplete
    });
  };

  return (
    <div ref={loaderRef} className="global-loader">
      <video
        ref={videoRef}
        src="/0516.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="loader-video"
      />
    </div>
  );
}

const galleryReferences = [
  { title: 'Anticato', location: 'Monastir', image: '/reference/antico.png' },
  { title: 'Craquelé', location: 'Sousse', image: '/reference/craquée.png' },
  { title: 'Craquelé 2', location: 'Tunis', image: '/reference/craquée (2).png' },
  { title: 'Fior', location: 'Hammamet', image: '/reference/fior.png' },
  { title: 'Saniflex', location: 'Djerba', image: '/reference/saniflex.png' },
  { title: 'Travertinose', location: 'Sfax', image: '/reference/traventinose.png' },
  { title: 'Travertino', location: 'Bizerte', image: '/reference/traventino.png' },
  { title: 'Travertino 2', location: 'Monastir', image: '/reference/traventino (2).png' },
  { title: 'Travertino 3', location: 'Nabeul', image: '/reference/traventino3.png' },
  { title: 'Vinizia', location: 'Mahdia', image: '/reference/vinicia.png' },
  { title: 'Vinizia 2', location: 'Sousse', image: '/reference/vinicia2.png' },
];

const beforeAfterProjects = [
  {
    title: 'Salon Contemporain',
    before:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80&fm=avif',
    after:
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=80&fm=avif',
  },
  {
    title: 'Facade Exterieure',
    before:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80&fm=avif',
    after:
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80&fm=avif',
  },
];

function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_MQ);

  const isHome = location.pathname === '/';
  const activeProductCategory = useMemo(() => {
    const match = location.pathname.match(/^\/produit\/([^/]+)/);
    if (!match) return null;
    return getCategoryBySlug(match[1]) ?? null;
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    if (window.scrollY < 100) {
      setActiveSection(null);
    }

    const sectionIds = ['services', 'references', 'apropos', 'devis'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.35, 0.55],
        rootMargin: isMobile ? '-12% 0px -58% 0px' : '-20% 0px -55% 0px',
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname, isMobile]);

  const sectionHref = (id: string) => (location.pathname === '/' ? `#${id}` : `/#${id}`);
  const closeMenu = () => setMenuOpen(false);
  const navLinkClass = (active: boolean) => (active ? 'is-active' : '');

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/olivia-logo.png" alt="Olivia Peinture et Decoration" className="logo-image" />
        </Link>

        <nav className="nav-links nav-links--desktop" aria-label="Navigation principale">
          <div className="nav-product-group">
            {PRODUCT_CATEGORIES.map((category) => (
              <NavCategoryDropdown
                key={category.id}
                category={category}
                isActive={activeProductCategory === category.id}
              />
            ))}
          </div>
          <a href={sectionHref('references')} className={navLinkClass(isHome && activeSection === 'references')}>
            References
          </a>
          <a href={sectionHref('devis')} className={navLinkClass(isHome && activeSection === 'devis')}>
            Devis
          </a>
        </nav>

        <button
          type="button"
          className="nav-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-menu-toggle__bar" />
          <span className="nav-menu-toggle__bar" />
          <span className="nav-menu-toggle__bar" />
          <span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
        </button>
      </div>

      <div
        id="mobile-nav-drawer"
        className={`nav-drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      >
        <nav className="nav-drawer__panel" onClick={(e) => e.stopPropagation()} aria-label="Menu mobile">
          <MobileCategoryNav onNavigate={closeMenu} linkClass={navLinkClass} />
          <a href={sectionHref('references')} className={navLinkClass(isHome && activeSection === 'references')} onClick={closeMenu}>
            References
          </a>
          <a href={sectionHref('devis')} className={navLinkClass(isHome && activeSection === 'devis')} onClick={closeMenu}>
            Devis
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="footer">
      <div className="footer-bg-text">OLIVIA</div>
      <div className="container footer-content">
        <div className="footer-main-grid">
          <div className="footer-brand-section">
            <Link to="/" className="footer-logo-wrap">
              <img src="/olivia-logo.png" alt="Olivia" className="footer-logo-img" />
            </Link>
            <p className="footer-motto">L'excellence architecturale par la couleur. Spécialiste en finitions premium et décoration d'exception.</p>
            <div className="footer-social-cluster">
              <a href="#" className="social-icon-btn" aria-label="Instagram"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a href="#" className="social-icon-btn" aria-label="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            </div>
          </div>
          <div className="footer-nav-grid">
            <div className="footer-col">
              <span className="col-label">Navigation</span>
              <ul className="footer-nav-list">
                <li><a href="#apropos">À Propos</a></li>
                <li><a href="#services">Produits</a></li>
                <li><a href="#references">Références</a></li>
                <li><a href="#devis">Devis</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <span className="col-label">Solutions</span>
              <ul className="footer-nav-list">
                <li>
                  <Link to={`/produit/${PRODUCT_CATEGORIES[0].subCategories[0].products[0].slug}`}>
                    {PRODUCT_CATEGORIES[0].label}
                  </Link>
                </li>
                <li>
                  <Link to={`/produit/${PRODUCT_CATEGORIES[1].subCategories[0].products[0].slug}`}>
                    {PRODUCT_CATEGORIES[1].label}
                  </Link>
                </li>
                <li><a href="#services">Catalogue complet</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-contact-block">
            <span className="col-label">Contact Direct</span>
            <address className="footer-address">
              <p>Av. 23 Janvier Teboulba</p>
              <p>Monastir, Tunisie</p>
              <a href="tel:+21673000000" className="contact-link">+216 73 000 000</a>
              <a href="mailto:contact@olivia.tn" className="contact-link">contact@olivia.tn</a>
            </address>
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-info-row">
          <p className="copyright">© {new Date().getFullYear()} OLIVIA PEINTURE. ARCHITECTURAL FINISHES.</p>
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Retour en haut">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            <span>TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

function RingCarousel() {
  const ringRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [radius, setRadius] = useState(550);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const autoRotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      setRadius(w < 768 ? 350 : w < 1200 ? 550 : 750);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const applyRotation = (rot: number) => {
    if (!ringRef.current) return;
    const items = ringRef.current.children;
    const count = items.length;
    const angleStep = 360 / count;
    const rawIndex = Math.round(-rot / angleStep) % count;
    const front = rawIndex < 0 ? rawIndex + count : rawIndex;
    setActiveIndex(front);
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep + rot;
      let norm = angle % 360;
      if (norm > 180) norm -= 360;
      if (norm < -180) norm += 360;
      const focus = Math.max(0, 1 - Math.abs(norm) / 120);
      gsap.set(items[i], {
        rotateY: angle,
        transformOrigin: `50% 50% ${-radius}px`,
        scale: 0.75 + focus * 0.4,
        opacity: 0.2 + focus * 0.8,
        filter: `brightness(${0.35 + focus * 0.65}) blur(${Math.max(0, (1 - focus) * 5)}px)`,
        zIndex: Math.round(focus * 100),
      });
    }
  };

  useEffect(() => { applyRotation(rotationRef.current); }, [radius]);

  const startAutoRotate = () => {
    if (autoRotateTimer.current) return;
    autoRotateTimer.current = setInterval(() => {
      rotationRef.current -= 0.12;
      applyRotation(rotationRef.current);
    }, 16);
  };

  const stopAutoRotate = () => {
    if (autoRotateTimer.current) { clearInterval(autoRotateTimer.current); autoRotateTimer.current = null; }
  };

  useEffect(() => { startAutoRotate(); return () => stopAutoRotate(); }, [radius]);

  const snapToIndex = (idx: number) => {
    stopAutoRotate();
    const angleStep = 360 / galleryReferences.length;
    const target = -idx * angleStep;
    let diff = (target - rotationRef.current) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const endRot = rotationRef.current + diff;
    gsap.to(rotationRef, {
      current: endRot, duration: 1.0, ease: 'power3.inOut',
      onUpdate: () => applyRotation(rotationRef.current),
      onComplete: () => startAutoRotate(),
    });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    stopAutoRotate();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotationRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = (e.clientX - dragStartX.current) * 0.25;
    rotationRef.current = dragStartRotation.current + delta;
    applyRotation(rotationRef.current);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const angleStep = 360 / galleryReferences.length;
    const snapped = Math.round(rotationRef.current / angleStep) * angleStep;
    const idx = ((-snapped / angleStep) % galleryReferences.length + galleryReferences.length) % galleryReferences.length;
    snapToIndex(Math.round(idx));
  };

  return (
    <div className="ring-carousel-container" ref={containerRef}>
      <div className="ring-carousel-perspective">
        <div
          ref={ringRef}
          className={`ring-carousel-spinner${isDragging ? ' is-dragging' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {galleryReferences.map((ref, i) => (
            <div key={i} className={`ring-item${activeIndex === i ? ' active' : ''}`} onClick={() => !isDragging && snapToIndex(i)}>
              <img src={ref.image} alt={ref.title} loading="lazy" draggable={false} />
              <div className="ring-item-overlay">
                <div className="ring-item-info">
                  <span className="ring-item-location">{ref.location}</span>
                  <h4 className="ring-item-title">{ref.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="active-reference-display">
          <p className="active-location">{galleryReferences[activeIndex].location}</p>
          <h3 className="active-title" key={activeIndex}>{galleryReferences[activeIndex].title}</h3>
        </div>
      </div>
      <div className="ring-controls">
        <button className="ring-control-btn" onClick={() => snapToIndex((activeIndex - 1 + galleryReferences.length) % galleryReferences.length)} aria-label="Précédent">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div className="ring-indicator">
          {galleryReferences.map((_, i) => (
            <div key={i} className={`indicator-dot${activeIndex === i ? ' active' : ''}`} onClick={() => snapToIndex(i)} />
          ))}
        </div>
        <button className="ring-control-btn" onClick={() => snapToIndex((activeIndex + 1) % galleryReferences.length)} aria-label="Suivant">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}

function PriceBlock({ price }: { price: number | null }) {
  if (price === null) {
    return <p className="price-tag">Prix sur demande</p>;
  }

  return <p className="price-tag">A partir de {price} TND</p>;
}

function QuoteForm({ initialProduct, hideHeader }: { initialProduct?: string; hideHeader?: boolean }) {
  const [status, setStatus] = useState<string>('');
  const [product, setProduct] = useState(initialProduct ?? 'General');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Merci! Votre demande a été envoyée.');
    (event.currentTarget as HTMLFormElement).reset();
    setProduct('General');
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <form className="quote-form" onSubmit={onSubmit}>
      {!hideHeader && (
        <div className="form-header">
          <h3>Demander un devis</h3>
          <p>Recevez une estimation gratuite sous 48h</p>
        </div>
      )}
      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="name">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Nom Complet
          </label>
          <input id="name" name="name" placeholder="Ex: Jean Dupont" required />
        </div>
        <div className="input-group">
          <label htmlFor="email">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </label>
          <input id="email" type="email" name="email" placeholder="jean@exemple.com" required />
        </div>
      </div>
      
      <div className="input-group">
        <label htmlFor="telephone">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Téléphone
        </label>
        <input id="telephone" name="telephone" placeholder="+216 -- --- ---" required />
      </div>

      <div className="input-group">
        <label htmlFor="produit">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Produit souhaité
        </label>
        <select id="produit" name="produit" value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="General">General / Autre</option>
          {PRODUCT_CATEGORIES.map((category) => (
            <optgroup key={category.id} label={category.label}>
              {products
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="message">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Votre Message
        </label>
        <textarea id="message" name="message" rows={4} placeholder="Décrivez votre projet..." required />
      </div>

      <button type="submit" className="submit-btn">
        <span>Demander un devis gratuit</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>

      {status && (
        <div className="status-message fadeInUp">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1d6b3e" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          {status}
        </div>
      )}
    </form>
  );
}

const STUCCO_SLIDE_MS = 8500;

function HomePage() {
  const navigate = useNavigate();
  const appReady = useAppReady();
  const [heroStyle, setHeroStyle] = useState<CSSProperties>({});
  const [showcaseStyle, setShowcaseStyle] = useState<CSSProperties>({
    transform: 'perspective(720px) translateY(-30px) rotateZ(-2.25deg) rotateX(0deg) rotateY(0deg)',
    transformStyle: 'preserve-3d',
  });
  const showcaseRef = useRef<HTMLElement>(null);
  const showcaseViewportRef = useRef<HTMLDivElement>(null);
  const [stuccoSlide, setStuccoSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const n = HERO_STUCCO_SLIDES.length;
    if (n <= 1) return;
    const id = window.setInterval(() => {
      setStuccoSlide((prev) => (prev + 1) % n);
    }, STUCCO_SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollContainerRef.current && !isHovered) {
        scrollContainerRef.current.scrollLeft += 1;
        // Reset scroll position to create an infinite scroll illusion
        // Using 1/3 since we will duplicate the array 3 times
        if (scrollContainerRef.current.scrollLeft >= scrollContainerRef.current.scrollWidth / 3) {
          scrollContainerRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // 320px width + 24px gap
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const mainRef = useRef<HTMLDivElement>(null);

  useHeroEnterAnimation(mainRef, appReady);
  useHomeScrollAnimations(mainRef, appReady);
  useHeroShowcaseSlides(showcaseViewportRef, stuccoSlide, appReady);

  return (
    <div ref={mainRef}>
      <section className="hero">
        <div className="hero-background">
          <img src="/1.png" alt="" className="hero-bg-image" />
          <div className="hero-overlay" />
        </div>
        <div
          className="container hero-content"
          style={heroStyle}
          onMouseMove={(event) => {
            const { currentTarget, clientX, clientY } = event;
            const rect = currentTarget.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 10;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 10;
            setHeroStyle({
              transform: `perspective(900px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`,
            });

            const sc = showcaseRef.current;
            if (sc) {
              const sr = sc.getBoundingClientRect();
              const rawMx = (clientX - sr.left) / Math.max(sr.width, 1) - 0.5;
              const rawMy = (clientY - sr.top) / Math.max(sr.height, 1) - 0.5;
              const mx = Math.max(-0.5, Math.min(0.5, rawMx));
              const my = Math.max(-0.5, Math.min(0.5, rawMy));
              setShowcaseStyle({
                transform: `perspective(720px) translateY(-30px) rotateZ(-2.25deg) rotateX(${-my * 12}deg) rotateY(${mx * 14}deg)`,
                transformStyle: 'preserve-3d',
              });
            }
          }}
          onMouseLeave={() => {
            setHeroStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)' });
            setShowcaseStyle({
              transform: 'perspective(720px) translateY(-30px) rotateZ(-2.25deg) rotateX(0deg) rotateY(0deg)',
              transformStyle: 'preserve-3d',
            });
          }}
        >
          {/* Left: text */}
          <div className="hero-text">
            <p className="eyebrow">Olivia Peinture — Monastir, Tunisie</p>
            <h1>
              <span className="hero-title-sync">Bonjour.</span>{' '}
              <span className="highlight-green">Nous</span>{' '}
              <span className="hero-title-sync">sommes</span>{' '}
              <span className="highlight-green">Olivia</span>.
            </h1>
            <div className="hero-actions">
              <a href="#devis" className="btn btn-primary">
                Demander un devis
              </a>
              <a href="#services" className="btn btn-ghost">
                Voir nos produits
              </a>
            </div>
          </div>

          {/* Stucco portfolio — full bleed, video */}
          <aside
            ref={showcaseRef}
            className="hero-showcase"
            style={showcaseStyle}
            aria-label="Finitions stucco"
          >
            <div className="hero-showcase__frame">
              <div className="hero-showcase__viewport" ref={showcaseViewportRef}>
                <video
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="hero-showcase__video"
                />
                <div className="hero-showcase__scrim" />
              </div>
            </div>
          </aside>
        </div>
      </section>



      <section id="services" className="section section--products">
        <div className="section-bg">
          <img src="/1.png" alt="" className="section-bg-image" />
        </div>
        <div className="container" style={{ paddingTop: '2rem' }}>
          <h2>Nos Produits</h2>
          <div className="title-separator" />
        </div>
        <div
          className="carousel-strip-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="carousel-wrapper carousel-wrapper--edge">
            <button className="carousel-arrow left" onClick={scrollLeft} aria-label="Défiler à gauche">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>

            <div className="cards-container" ref={scrollContainerRef}>
              <div className="cards cards--full-bleed">
                {[...products, ...products, ...products].map((product, index) => (
                  <article key={`${product.id}-${index}`} className="card" data-reveal>
                    <img src={product.image} alt={product.title} loading={index < 10 ? "eager" : "lazy"} />
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className="card-price-row">
                      <PriceBlock price={product.price} />
                      <span className="card-rating-stars" aria-label="5 sur 5">
                        ★★★★★
                      </span>
                    </div>
                    <div className="card-actions">
                      <button onClick={() => navigate(`/produit/${product.slug}`)}>Voir details</button>
                      <button onClick={() => document.getElementById('devis')?.scrollIntoView({ behavior: 'smooth' })}>
                        Demander un devis
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button className="carousel-arrow right" onClick={scrollRight} aria-label="Défiler à droite">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>
      </section>

      <section id="references" className="section">
        <div className="section-bg">
          <img src="/1.png" alt="" className="section-bg-image" />
        </div>
        <div className="container">
          <h2>Nos Références</h2>
          <div className="title-separator" />
        </div>
        <RingCarousel />
      </section>

      <AboutSection />

      <section className="section before-after">
        <div className="section-bg">
          <img src="/1.png" alt="" className="section-bg-image" />
        </div>
        <div className="container" style={{ paddingTop: '2rem' }}>
          <h2>Transformation</h2>
          <div className="title-separator" />
          <div className="before-after-grid">
            {beforeAfterProjects.map((project) => (
              <article key={project.title} className="before-after-card">
                <h3>{project.title}</h3>
                <div className="comparison">
                  <figure>
                    <img src={project.before} alt={`${project.title} avant`} loading="eager" />
                    <figcaption>Avant</figcaption>
                  </figure>
                  <figure>
                    <img src={project.after} alt={`${project.title} apres`} loading="eager" />
                    <figcaption>Apres</figcaption>
                  </figure>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="devis" className="section">
        <div className="section-bg">
          <img src="/1.png" alt="" className="section-bg-image" />
        </div>
        <div className="container" style={{ paddingTop: '2rem' }}>
          <h2>Demande de devis</h2>
          <div className="title-separator" />
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}

function ProductPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = useMemo(() => products.find((item) => item.slug === slug), [slug]);
  const pageRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowForm(false);
    setSelectedImage(null);
    setImageIndex(0);
    setIsScrolledDown(false);
    setIsAtBottom(false);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const isBottom = scrollY + windowHeight >= documentHeight - 100;
      setIsAtBottom(isBottom);
      setIsScrolledDown(scrollY > windowHeight / 2);
      
      if (btnRef.current) {
        const baseTop = 24; // in rem
        const extra = Math.min(scrollY * 0.02, 10); // up to 10rem extra
        btnRef.current.style.top = `${baseTop + extra}rem`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (product || !slug) return;
    const redirect = LEGACY_PRODUCT_SLUGS[slug];
    if (redirect) navigate(`/produit/${redirect}`, { replace: true });
  }, [product, slug, navigate]);

  useEffect(() => {
    if (!product || isPaused) return;
    const allImages = [product.image, ...product.gallery];
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [product, isPaused]);

  useEffect(() => {
    if (!product) return;
    const allImages = [product.image, ...product.gallery];
    setSelectedImage(allImages[imageIndex]);
  }, [imageIndex, product]);

  useProductPageEnter(pageRef, product?.id);
  useRevealPanel(formRef, showForm);

  // Body scroll lock for modal
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showForm]);

  if (!product) {
    return (
      <section className="section container">
        <h2>Produit introuvable</h2>
        <p>Ce produit n existe pas ou n est plus disponible.</p>
        <Link to="/" className="btn btn-primary">Retour a l accueil</Link>
      </section>
    );
  }

  const fromQuery = new URLSearchParams(location.search).get('produit');
  const selected = fromQuery ?? product.title;

  return (
    <div ref={pageRef} className="product-page-wrapper">
      <section className="section container">
        <button
          ref={btnRef}
          className="sticky-scroll-btn"
          onClick={() => {
            if (isAtBottom || isScrolledDown) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: (isAtBottom || isScrolledDown) ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <Link to="/" className="back-link">← Retour aux produits</Link>
        <div className="product-detail">
          <div className="product-gallery">
            <div 
              className="main-image-container"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <img src={selectedImage || product.image} alt={product.title} className="detail-image" loading="eager" />
              <div className="image-overlay" />
              
              <div className="mini-gallery-overlay">
                {[product.image, ...product.gallery].map((image, idx) => (
                  <div 
                    key={image} 
                    className={`gallery-item ${((selectedImage === null && idx === 0) || selectedImage === image) ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedImage(image);
                      setImageIndex(idx);
                    }}
                  >
                    <img src={image} alt={`${product.title} detail ${idx + 1}`} loading="eager" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="product-info premium-glassbox">
            <div className="info-header">
              <p className="eyebrow">
                {PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label ?? 'Olivia Collection'}
              </p>
              <h2>{product.title}</h2>
              <div className="title-separator" />
              <PriceBlock price={product.price} />
            </div>
            
            <div className="info-body">
              <p className="description">{product.description}</p>
              <ul className="details-list">
                {product.details.map((item) => (
                  <li key={item}>
                    <span className="dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-actions">
              <button 
                className="btn btn-primary contact-toggle-btn" 
                onClick={() => setShowForm(true)}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Obtenir un devis personnalisé
              </button>
            </div>
          </div>
        </div>

        {product.applicationSteps && product.applicationSteps.length > 0 && (
          <section className="product-application-steps">
            <ApplicationSteps steps={product.applicationSteps} />
          </section>
        )}

        {product.beforeImage && product.afterImage && (
          <section className="product-before-after">
            <div className="product-before-after-header">
              <h3 className="section-subtitle">Résultat Garanti</h3>
              <div className="title-separator" />
            </div>
            <BeforeAfterSlider beforeImage={product.beforeImage} afterImage={product.afterImage} />
          </section>
        )}

        {showForm && createPortal(
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div ref={formRef} className="product-page-form-container" onClick={(e) => e.stopPropagation()}>
              <div className="form-card-premium">
                <button className="modal-close-btn" onClick={() => setShowForm(false)}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div className="form-header-premium">
                  <h3>Projet : {product.title}</h3>
                  <p>Complétez les informations ci-dessous pour recevoir votre devis gratuit.</p>
                </div>
                <QuoteForm initialProduct={selected} hideHeader />
              </div>
            </div>
          </div>,
          document.body
        )}
      </section>
    </div>
  );
}

export function App() {
  return (
    <BackgroundSlideProvider>
      <AppShell />
    </BackgroundSlideProvider>
  );
}

function AppShell() {
  const [loading, setLoading] = useState(true);
  const appReady = !loading;

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <AppReadyProvider ready={appReady}>
        <div
          className="app-shell"
          style={{
            visibility: loading ? 'hidden' : 'visible',
            height: loading ? '100vh' : 'auto',
            overflow: loading ? 'hidden' : 'visible',
          }}
        >
          <PageBackgroundLayers />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produit/:slug" element={<ProductPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="products" element={<ProductsInventory />} />
                <Route path="products/:id/edit" element={<EditProduct />} />
                <Route path="quotes" element={<QuotesManagement />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </AppReadyProvider>
    </>
  );
}
