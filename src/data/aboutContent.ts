export type AboutPillar = {
  id: string;
  title: string;
  description: string;
  icon: 'palette' | 'surface' | 'finish' | 'trust';
};

export type AboutStat = {
  value: string;
  label: string;
  detail: string;
};

export const ABOUT_STORY = {
  title: 'Une maison de peinture ancrée à Monastir',
  paragraphs: [
    "Olivia Peinture & Décoration accompagne les particuliers, architectes et entreprises de la région — et au-delà — sur l'ensemble du cycle projet : choix des teintes, préparation des supports, application et contrôle qualité final.",
    'Notre équipe maîtrise les gammes intérieures et extérieures (stucco, effets minéraux, lasures, revêtements techniques) pour des rendus durables face au soleil, à l\'humidité et au salin de la côte.',
  ],
  highlights: [
    'Devis détaillé sous 48 h',
    'Conseil couleur sur site ou en showroom',
    'Chantiers résidentiels, commerces & hôtellerie',
    'Finitions Olivia & partenaires certifiés',
  ],
};

export const ABOUT_PILLARS: AboutPillar[] = [
  {
    id: 'conseil',
    title: 'Conseil couleur',
    description:
      'Harmonisation des teintes avec la lumière naturelle, les matériaux et l\'architecture pour un rendu cohérent intérieur / extérieur.',
    icon: 'palette',
  },
  {
    id: 'preparation',
    title: 'Préparation des supports',
    description:
      'Diagnostic, réparations, traitements anti-humidité et primaires adaptés — la base d\'une peinture qui tient dans le temps.',
    icon: 'surface',
  },
  {
    id: 'finitions',
    title: 'Finitions premium',
    description:
      'Application des gammes Olivia : stucco, effets décoratifs, monocouches et systèmes façade haute performance.',
    icon: 'finish',
  },
  {
    id: 'suivi',
    title: 'Suivi de chantier',
    description:
      'Planning clair, protection des lieux, nettoyage et réception avec vous — transparence du premier coup de pinceau à la livraison.',
    icon: 'trust',
  },
];

export const ABOUT_STATS: AboutStat[] = [
  { value: '250+', label: 'Projets livrés', detail: 'Résidentiel & tertiaire' },
  { value: '15+', label: "Ans d'expérience", detail: 'Équipe terrain & bureau d\'études' },
  { value: '98%', label: 'Clients satisfaits', detail: 'Recommandations & chantiers répétés' },
  { value: '48h', label: 'Délai de devis', detail: 'Réponse structurée & chiffrée' },
];

export const ABOUT_IMAGES = {
  main: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
  accent: 'https://images.unsplash.com/photo-1562259949-e8e7689d7821?auto=format&fit=crop&w=800&q=80',
  badge: 'Monastir · Tunisie',
};
