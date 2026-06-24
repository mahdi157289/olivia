import {
  ABOUT_PILLARS,
  ABOUT_STATS,
  ABOUT_STORY,
  type AboutPillar,
} from '../data/aboutContent';

function PillarIcon({ icon }: { icon: AboutPillar['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    'aria-hidden': true as const,
  };

  switch (icon) {
    case 'palette':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="8.5" cy="10" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="14" cy="8" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'surface':
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M6 16l3-8 4 6 3-10 2 12" />
        </svg>
      );
    case 'finish':
      return (
        <svg {...common}>
          <path d="M12 3l7 4v6c0 4.5-3.5 8-7 8s-7-3.5-7-8V7l7-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'trust':
      return (
        <svg {...common}>
          <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );
    default:
      return null;
  }
}

export function AboutSection() {
  return (
    <section id="apropos" className="section section--about" aria-labelledby="about-heading">
      <div className="section-bg">
        <img src="/1.png" alt="" className="section-bg-image" />
      </div>
      <div className="container" style={{ paddingTop: '2rem' }}>
        <h2 id="about-heading">À propos d&apos;Olivia</h2>
        <div className="title-separator" />
      </div>

      <div className="container about-main">
        <div className="about-visual" data-reveal>
          <div className="about-visual__accent" aria-hidden="true">
            <img src="/olivia-logo.png" alt="" loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="about-story" data-reveal>
          <div className="about-story__panel">
            <h3 className="about-story__title">{ABOUT_STORY.title}</h3>
            {ABOUT_STORY.paragraphs.map((text) => (
              <p key={text.slice(0, 24)} className="about-story__text">
                {text}
              </p>
            ))}
            <ul className="about-highlights">
              {ABOUT_STORY.highlights.map((item) => (
                <li key={item}>
                  <span className="about-highlights__mark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container about-pillars-wrap">
        <p className="about-pillars-label" data-reveal>
          Notre <span className="highlight-green">méthode</span>
        </p>
        <div className="about-pillars">
          {ABOUT_PILLARS.map((pillar) => (
            <article key={pillar.id} className="about-pillar" data-reveal>
              <div className="about-pillar__icon">
                <PillarIcon icon={pillar.icon} />
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="container about-stats" data-reveal>
        {ABOUT_STATS.map((stat) => (
          <article key={stat.label} className="about-stat">
            <strong>{stat.value}</strong>
            <span className="about-stat__label">{stat.label}</span>
            <span className="about-stat__detail">{stat.detail}</span>
          </article>
        ))}
      </div>

      <div className="container about-cta" data-reveal>
        <div className="about-cta__panel">
          <div className="about-cta__copy">
            <h3>Un projet de peinture ou de rénovation ?</h3>
            <p>
              Décrivez votre surface, vos délais et le rendu souhaité — nous vous proposons une
              gamme Olivia adaptée et un devis gratuit.
            </p>
          </div>
          <div className="about-cta__actions">
            <a href="#devis" className="btn btn-primary">
              Demander un devis
            </a>
            <a href="#services" className="btn btn-ghost about-cta__secondary">
              Découvrir nos produits
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
