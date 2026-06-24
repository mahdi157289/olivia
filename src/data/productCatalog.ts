export type ProductCategoryId = 'exterieure' | 'interieure';
export type SubCategoryId = 'peinture-a-eaux' | 'eaux-decorative';

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number | null;
  image: string;
  gallery: string[];
  details: string[];
  beforeImage?: string;
  afterImage?: string;
  applicationSteps?: { title: string; description: string }[];
  category: ProductCategoryId;
  subCategory: SubCategoryId;
};

export type CatalogEntry = {
  name: string;
  slug: string;
};

export type ProductSubCategory = {
  id: SubCategoryId;
  label: string;
  products: CatalogEntry[];
};

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  shortLabel: string;
  subCategories: ProductSubCategory[];
};

const slugify = (name: string, category: ProductCategoryId, subCategory: SubCategoryId) => {
  const base = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `peinture-${category}-${subCategory}-${base}`;
};

// Interior Products
const interiorPeintureAEauxNames = [
  'Silver',
  'Super',
  'HPC',
  'Prima Olivia',
  'PAT 1',
  'PAT 2',
] as const;

const interiorEauxDecorativeNames = [
  'Anticato',
  'Craquelé',
  'Fior',
  "Sable d'or",
  'Saniflex',
  'Travertinose',
  'Vinisia',
] as const;

// Exterior Products
const exteriorPeintureAEauxNames = [
  'Silver',
  'Super',
  'HPC',
  'Prima Olivia',
  'PAT 1',
  'PAT 2',
] as const;

const exteriorEauxDecorativeNames = [
  'Graffiato',
  'Marmostella',
  'Monolivia',
] as const;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'interieure',
    label: 'Peinture Intérieure',
    shortLabel: 'Intérieure',
    subCategories: [
      {
        id: 'peinture-a-eaux',
        label: 'Peinture à eaux',
        products: interiorPeintureAEauxNames.map((name) => ({
          name,
          slug: slugify(name, 'interieure', 'peinture-a-eaux'),
        })),
      },
      {
        id: 'eaux-decorative',
        label: 'Eaux decorative',
        products: interiorEauxDecorativeNames.map((name) => ({
          name,
          slug: slugify(name, 'interieure', 'eaux-decorative'),
        })),
      },
    ],
  },
  {
    id: 'exterieure',
    label: 'Peinture Extérieure',
    shortLabel: 'Extérieure',
    subCategories: [
      {
        id: 'peinture-a-eaux',
        label: 'Peinture à eaux',
        products: exteriorPeintureAEauxNames.map((name) => ({
          name,
          slug: slugify(name, 'exterieure', 'peinture-a-eaux'),
        })),
      },
      {
        id: 'eaux-decorative',
        label: 'Eaux decorative',
        products: exteriorEauxDecorativeNames.map((name) => ({
          name,
          slug: slugify(name, 'exterieure', 'eaux-decorative'),
        })),
      },
    ],
  },
];

const EXTERIOR_IMAGE =
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80';
const INTERIOR_IMAGE =
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80';

const productImages: Record<string, { image: string; gallery: string[] }> = {
  // Interior - Peinture à eaux
  'Silver': {
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'Super': {
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'HPC': {
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'Prima Olivia': {
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'PAT 1': {
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'PAT 2': {
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  // Interior - Eaux decorative
  'Anticato': {
    image: '/pics/antico1/texture.jpg',
    gallery: [
      '/pics/antico1/3.JPG',
      '/pics/antico1/4.JPG',
      '/pics/antico1/5.JPG',
      '/pics/antico1/6.JPG',
    ],
  },
  'Craquelé': {
    image: '/pics/craqueé1/1.JPG',
    gallery: [
      '/pics/craqueé1/4.JPG',
      '/pics/craqueé1/5.JPG',
      '/pics/craqueé1/7.JPG',
    ],
  },
  'Fior': {
    image: '/pics/fior1/texture.JPG',
    gallery: [
      '/pics/fior1/2.JPG',
      '/pics/fior1/3.JPG',
      '/pics/fior1/4.JPG',
      '/pics/fior1/6.JPG',
      '/pics/fior1/7.JPG',
    ],
  },
  "Sable d'or": {
    image: '/pics/sable d\'or1/texture.JPG',
    gallery: [
      '/pics/sable d\'or1/1.JPG',
      '/pics/sable d\'or1/3.JPG',
      '/pics/sable d\'or1/6.JPG',
      '/pics/sable d\'or1/8.JPG',
    ],
  },
  'Saniflex': {
    image: '/pics/saniflex1/texture.jpg',
    gallery: [
      '/pics/saniflex1/1.JPG',
      '/pics/saniflex1/4.JPG',
      '/pics/saniflex1/5.JPG',
    ],
  },
  'Travertinose': {
    image: '/pics/traventino1/texture.JPG',
    gallery: [
      '/pics/traventino1/6.JPG',
      '/pics/traventino1/7.JPG',
      '/pics/traventino1/9.JPG',
      '/pics/traventino1/10.JPG',
    ],
  },
  'Vinisia': {
    image: '/pics/vinicia1/texture.jpg',
    gallery: [
      '/pics/vinicia1/4.JPG',
      '/pics/vinicia1/5.JPG',
    ],
  },
  // Exterior - Eaux decorative
  'Graffiato': {
    image: EXTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'Marmostella': {
    image: EXTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
  'Monolivia': {
    image: EXTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    ],
  },
};

const categoryDefaults: Record<
  SubCategoryId,
  Pick<Product, 'description' | 'price' | 'image' | 'gallery' | 'details' | 'applicationSteps'> & {
    beforeImage?: string;
    afterImage?: string;
  }
> = {
  'peinture-a-eaux': {
    description:
      'Peinture à base d\'eau Olivia : rendu soigné, faible odeur et excellente couvrance pour murs et pièces de vie.',
    price: 145,
    image: INTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1534349762230-e0caaff4f5af?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Finition mate ou satinée', 'Séchage rapide', 'Lessivabilité', 'Application facile'],
    beforeImage: '/avant.webp',
    afterImage: INTERIOR_IMAGE,
    applicationSteps: [
      { title: '01 Préparation', description: 'Rebouchage, ponçage et dépoussiérage des supports.' },
      { title: '02 Sous-couche', description: 'Impression ou primaire selon la porosité du mur.' },
      { title: '03 Finition', description: 'Application de deux couches de finition Olivia.' },
    ],
  },
  'eaux-decorative': {
    description:
      'Finition décorative Olivia : effets uniques et personnalisés pour des espaces à caractère.',
    price: 210,
    image: EXTERIOR_IMAGE,
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    ],
    details: ['Effet unique', 'Haute résistance', 'Finition premium', 'Application professionnelle'],
    beforeImage: '/avant.webp',
    afterImage: '/pics/antico1/texture.jpg',
    applicationSteps: [
      { title: '01 Traitement', description: 'Nettoyage et préparation du support.' },
      { title: '02 Impression', description: 'Application du primaire d\'accrochage adapté.' },
      { title: '03 Finition', description: 'Mise en œuvre de la finition décorative Olivia.' },
    ],
  },
};

const finishDescriptions: Partial<Record<string, string>> = {
  // Interior - Peinture à eaux
  'Silver': 'Peinture argentée élégante pour intérieurs modernes.',
  'Super': 'Peinture super opaque pour une couverture parfaite.',
  'HPC': 'Haute performance contre les taches et l\'usure.',
  'Prima Olivia': 'Primaire d\'accrochage de qualité professionnelle.',
  'PAT 1': 'Protection anti-taches pour surfaces délicates.',
  'PAT 2': 'Protection renforcée pour zones à fort passage.',
  // Interior - Eaux decorative
  'Anticato': 'Aspect pierre vieillie et patinée pour murs élégants.',
  'Craquelé': 'Effet craquelé authentique pour murs à caractère.',
  'Fior': 'Texture florale légère et lumineuse.',
  "Sable d'or": 'Grain fin doré, idéal pour accents décoratifs.',
  'Saniflex': 'Souplesse et étanchéité pour supports sensibles.',
  'Travertinose': 'Reproduction fidèle du travertin.',
  'Vinisia': 'Finition vénitienne raffinée pour surfaces nobles.',
  // Exterior - Eaux decorative
  'Graffiato': 'Effet texturé moderne pour façades contemporaines.',
  'Marmostella': 'Aspect marbre Stellaire pour des espaces exceptionnels.',
  'Monolivia': 'Finition monocouche premium Olivia.',
};

export function buildCatalogProducts(): Product[] {
  let id = 1;
  const list: Product[] = [];

  for (const category of PRODUCT_CATEGORIES) {
    for (const subCategory of category.subCategories) {
      const defaults = categoryDefaults[subCategory.id];
      for (const entry of subCategory.products) {
        const custom = finishDescriptions[entry.name];
        const productData = productImages[entry.name] || { image: defaults.image, gallery: defaults.gallery };
        list.push({
          id: String(id++),
          slug: entry.slug,
          title: entry.name,
          description: custom
            ? `${custom} ${defaults.description}`
            : `${entry.name} — ${defaults.description}`,
          price: defaults.price,
          image: productData.image,
          gallery: productData.gallery,
          details: [...defaults.details, subCategory.label],
          beforeImage: defaults.beforeImage,
          afterImage: productData.image,
          applicationSteps: defaults.applicationSteps,
          category: category.id,
          subCategory: subCategory.id,
        });
      }
    }
  }

  return list;
}

export function getCategoryBySlug(slug: string): ProductCategoryId | undefined {
  for (const cat of PRODUCT_CATEGORIES) {
    for (const subCat of cat.subCategories) {
      if (subCat.products.some((p) => p.slug === slug)) return cat.id;
    }
  }
  return undefined;
}

export function getSubCategoryBySlug(slug: string): SubCategoryId | undefined {
  for (const cat of PRODUCT_CATEGORIES) {
    for (const subCat of cat.subCategories) {
      if (subCat.products.some((p) => p.slug === slug)) return subCat.id;
    }
  }
  return undefined;
}

/** Old product URLs from before the catalog navigation update. */
export const LEGACY_PRODUCT_SLUGS: Record<string, string> = {};

export function getCatalogEntry(slug: string): CatalogEntry | undefined {
  for (const cat of PRODUCT_CATEGORIES) {
    for (const subCat of cat.subCategories) {
      const found = subCat.products.find((p) => p.slug === slug);
      if (found) return found;
    }
  }
  return undefined;
}
