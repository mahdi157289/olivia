import { useEffect, useMemo, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, FormEvent } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
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

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number | null;
  image: string;
  gallery: string[];
  details: string[];
};

const galleryReferences = [
  { title: 'Résidence El Mansour', location: 'Monastir', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Villa Horizon', location: 'Sousse', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Appartement Onyx', location: 'Tunis', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Boutique Le Loft', location: 'Hammamet', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Palais des Roses', location: 'Djerba', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Espace Emeraude', location: 'Sfax', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Villa Azur', location: 'Bizerte', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80&fm=avif' },
  { title: 'Showroom Olivia', location: 'Monastir', image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=80&fm=avif' },
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

const products: Product[] = [
  {
    id: '1',
    slug: 'peinture-interieure-premium',
    title: 'Peinture Intérieure Premium',
    description:
      'Une finition élégante et durable pour vos murs intérieurs. Notre formule exclusive offre une couvrance exceptionnelle et un rendu velouté haut de gamme.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0caaff4f5af?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Finition mate veloutée', 'Séchage rapide (2h)', 'Nettoyage facile', 'Senteur neutre'],
  },
  {
    id: '2',
    slug: 'peinture-exterieure-pro',
    title: 'Peinture Extérieure Pro',
    description:
      'Une protection maximale contre les intempéries et les rayons UV. Conçue pour durer, cette peinture préserve l\'éclat de votre façade pendant des années.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Barrière anti-humidité', 'Résistance UV renforcée', 'Elasticité supérieure', 'Garantie 10 ans'],
  },
  {
    id: '3',
    slug: 'renovation-cabinets',
    title: 'Rénovation Cabinets',
    description:
      'Transformez votre cuisine ou votre salle de bain sans tout changer. Notre service de rénovation de cabinets redonne vie à vos meubles avec une finition usine.',
    price: null,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1616594039964-3f3b2281f0af?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Rendu ultra-lisse', 'Haute résistance aux chocs', 'Large choix de teintes', 'Zéro trace de pinceau'],
  },
  {
    id: '4',
    slug: 'peinture-ecosolutions',
    title: 'Peinture Éco-Solutions',
    description:
      'Une peinture écologique à faible teneur en COV, idéale pour les chambres d\'enfants et les environnements sensibles. Respectueuse de la nature et de votre santé.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0caaff4f5af?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Zéro solvant nocif', 'Sans odeur', 'Certifié Écolabel', 'Nettoyage à l\'eau'],
  },
  {
    id: '5',
    slug: 'enduit-decoratif',
    title: 'Enduit Décoratif Effet Béton',
    description:
      'Apportez une touche industrielle et moderne à votre intérieur avec notre enduit décoratif effet béton ciré. Une texture unique et un caractère affirmé.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Finition texturée', 'Hautement durable', 'Look industriel', 'Résistant à l\'abrasion'],
  },
  {
    id: '6',
    slug: 'lasure-bois-expert',
    title: 'Lasure Bois Expert',
    description:
      'Protégez et embellissez vos boiseries intérieures et extérieures. Notre lasure laisse respirer le bois tout en le protégeant des agressions du quotidien.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1616594039964-3f3b2281f0af?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Protège des insectes', 'Filtre anti-UV', 'Finition satinée', 'Entretien facile'],
  },
];

function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHome = location.pathname === '/';
  const isProductPage = location.pathname.startsWith('/produit/');

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }

    // Default to apropos if at the top of home
    if (window.scrollY < 100) {
      setActiveSection('apropos');
    }

    const sectionIds = ['apropos', 'services', 'devis'];
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
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-20% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  const sectionHref = (id: string) => (location.pathname === '/' ? `#${id}` : `/#${id}`);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <nav className="nav-links nav-links-left">
          <a href={sectionHref('apropos')} className={isHome && activeSection === 'apropos' ? 'is-active' : ''}>
            A propos
          </a>
          <a href={sectionHref('services')} className={isHome && activeSection === 'services' ? 'is-active' : ''}>
            Produits
          </a>
        </nav>

        <Link to="/" className="logo logo-center">
          <img src="/olivia-logo.png" alt="Olivia Peinture et Decoration" className="logo-image" />
        </Link>

        <nav className="nav-links nav-links-right">
          <a href={sectionHref('devis')} className={isHome && activeSection === 'devis' ? 'is-active' : ''}>
            Devis
          </a>
          <NavLink to="/produit/peinture-interieure-premium" className={isProductPage ? 'is-active' : ''}>
            Produit
          </NavLink>
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
                <li><Link to="/produit/peinture-interieure-premium">Intérieur</Link></li>
                <li><Link to="/produit/peinture-exterieure-pro">Extérieur</Link></li>
                <li><Link to="/produit/enduit-decoratif">Enduits</Link></li>
                <li><Link to="/produit/peinture-ecosolutions">Éco</Link></li>
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
      setRadius(w < 768 ? 280 : w < 1200 ? 420 : 550);
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
      const focus = Math.max(0, 1 - Math.abs(norm) / 75);
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
          {products.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
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
  const [heroStyle, setHeroStyle] = useState<CSSProperties>({});
  const [showcaseStyle, setShowcaseStyle] = useState<CSSProperties>({
    transform: 'perspective(720px) translateY(-30px) rotateZ(-2.25deg) rotateX(0deg) rotateY(0deg)',
    transformStyle: 'preserve-3d',
  });
  const showcaseRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    // Ensure ScrollTrigger is refreshed on mount and when images might have loaded
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Animation (Immediate)
      // We animate children instead of the whole container to prevent total white screen if JS lags
      const heroTl = gsap.timeline({ 
        defaults: { ease: 'power4.out' },
        onComplete: () => ScrollTrigger.refresh()
      });

      heroTl
        .fromTo('.hero-background',
          { autoAlpha: 0, scale: 1.1 },
          { autoAlpha: 1, scale: 1, duration: 1.5 }
        )
        .fromTo('.hero-content h1', 
          { y: 60, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, duration: 1.2 }, 
          '-=1'
        )
        .fromTo('.hero-content .eyebrow', 
          { y: 20, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, duration: 0.8 }, 
          '-=0.8'
        )
        .fromTo('.hero-actions', 
          { y: 20, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, duration: 0.8 }, 
          '-=0.6'
        )
        .fromTo(
          '.hero-showcase__frame',
          { autoAlpha: 0, y: 40, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
          '-=1'
        );

      // 2. Scroll-based animations for other sections
      const sections = gsap.utils.toArray<HTMLElement>('section:not(.hero)');
      sections.forEach((section) => {
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });

        sectionTl.fromTo(section, 
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power4.out' }
        );

        const separator = section.querySelector('.title-separator');
        if (separator) {
          sectionTl.fromTo(separator, 
            { scaleX: 0 }, 
            { scaleX: 1, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut' }, 
            '-=0.8'
          );
        }

        // Unified reveal for children elements
        const children = section.querySelectorAll('.cards > article, .gallery-grid img, .before-after-card, .premium-panel > div, .quote-form, .service-card, .stats article');
        if (children.length > 0) {
          sectionTl.fromTo(children, 
            { autoAlpha: 0, y: 30, scale: 0.98 }, 
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power2.out' }, 
            '-=0.6'
          );
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <section className="hero">
        <div className="hero-background">
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

          {/* Stucco portfolio — full bleed, titled slides (no 3D clip issues). */}
          <aside
            ref={showcaseRef}
            className="hero-showcase"
            style={showcaseStyle}
            aria-label="Finitions stucco"
          >
            <div className="hero-showcase__frame">
              <div className="hero-showcase__rail" aria-hidden="true">
                {HERO_STUCCO_SLIDES.map((slide, i) => (
                  <span
                    key={slide.src}
                    className={`hero-showcase__rail-tick ${i === stuccoSlide ? 'is-active' : ''}`}
                  />
                ))}
              </div>
              <div className="hero-showcase__viewport">
                {HERO_STUCCO_SLIDES.map((slide, i) => (
                  <div
                    key={slide.src}
                    className={`hero-showcase__slide ${i === stuccoSlide ? 'is-active' : ''}`}
                    aria-hidden={i !== stuccoSlide}
                  >
                    <img src={slide.src} alt="" decoding="async" loading={i === 0 ? 'eager' : 'lazy'} />
                    <div className="hero-showcase__scrim" />
                    <div className="hero-showcase__legend">
                      <p className="hero-showcase__line">{slide.line}</p>
                      <h3 className="hero-showcase__title">{slide.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hero-showcase__nav">
                {HERO_STUCCO_SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    className={`hero-showcase__dot ${i === stuccoSlide ? 'is-active' : ''}`}
                    aria-label={`Voir ${slide.title}`}
                    aria-current={i === stuccoSlide || undefined}
                    onClick={() => setStuccoSlide(i)}
                  />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>



      <section id="services" className="section section--products">
        <div className="container">
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
                  <article key={`${product.id}-${index}`} className="card">
                    <img src={product.image} alt={product.title} loading="lazy" />
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
        <div className="container">
          <h2>Nos Références</h2>
          <div className="title-separator" />
        </div>
        <RingCarousel />
      </section>

      <section id="apropos" className="section container">
        <h2>À Propos d'Olivia</h2>
        <div className="title-separator" />
        <div className="premium-panel">
          <div>
            <p>
              Olivia accompagne chaque client de la conception des teintes jusqu a la finition finale avec une methode
              rigoureuse, des materiaux fiables et une attention au detail constante.
            </p>
          </div>
          <div className="stats">
            <article>
              <strong>250+</strong>
              <span>Projets finalises</span>
            </article>
            <article>
              <strong>98%</strong>
              <span>Clients satisfaits</span>
            </article>
            <article>
              <strong>48h</strong>
              <span>Delai de devis</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section container before-after">
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
      </section>

      <section id="devis" className="section container">
        <h2>Demande de devis</h2>
        <div className="title-separator" />
        <QuoteForm />
      </section>
    </div>
  );
}

function ProductPage() {
  const { slug } = useParams();
  const location = useLocation();
  const product = useMemo(() => products.find((item) => item.slug === slug), [slug]);
  const pageRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowForm(false); // Reset form visibility on product change
    setSelectedImage(null);
  }, [slug]);

  useEffect(() => {
    if (!pageRef.current || !product) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(pageRef.current, 
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6 }
      )
      .fromTo('.product-gallery',
        { autoAlpha: 0, x: -30 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo('.product-info > *', 
        { autoAlpha: 0, y: 20 }, 
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 
        '-=0.6'
      );
    }, pageRef);

    return () => ctx.revert();
  }, [product]);

  // Animation for showing form
  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(formRef.current,
        { autoAlpha: 0, height: 0, y: 20 },
        { autoAlpha: 1, height: 'auto', y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [showForm]);

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
        <Link to="/" className="back-link">← Retour aux produits</Link>
        <div className="product-detail">
          <div className="product-gallery">
            <div className="main-image-container">
              <img src={selectedImage || product.image} alt={product.title} className="detail-image" loading="eager" />
              <div className="image-overlay" />
              
              <div className="mini-gallery-overlay">
                {[product.image, ...product.gallery].map((image, idx) => (
                  <div 
                    key={image} 
                    className={`gallery-item ${((selectedImage === null && idx === 0) || selectedImage === image) ? 'is-active' : ''}`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`${product.title} detail ${idx + 1}`} loading="eager" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="product-info premium-glassbox">
            <div className="info-header">
              <p className="eyebrow">Olivia Collection</p>
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

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div 
        className="app-shell" 
        style={{ 
          opacity: loading ? 0 : 1, 
          transition: 'opacity 0.2s ease-out',
          height: loading ? '100vh' : 'auto',
          overflow: loading ? 'hidden' : 'visible'
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
    </>
  );
}
