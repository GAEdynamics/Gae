import {
  Warehouse,
  PaintRoller,
  Waves,
  Building2,
  Umbrella,
  PanelTop,
  Home,
  Grid3x3,
  DoorOpen,
  Store,
  AirVent,
  Frame,
  Layers,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export type ServiceSlug =
  | 'estruturas-metalicas'
  | 'pintura-termica'
  | 'tubulacao-ppr'
  | 'fachadas'
  | 'toldos'
  | 'cortinas-rolo'
  | 'coberturas'
  | 'pergolados'
  | 'portoes'
  | 'moveis-industriais'
  | 'refrigeracao'
  | 'esquadrias-aluminio'
  | 'mezanino'
  | 'outros';

export type ProjectCategory = ServiceSlug;

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  heroImage: string;
  features: { title: string; detail: string }[];
  hasPage: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  featured?: boolean;
}

const GH_BASE =
  'https://raw.githubusercontent.com/GAEdynamics/porfolio-gaedynamics/main/portfolio/';

const gh = (filename: string): string => GH_BASE + encodeURIComponent(filename);

const ghRange = (prefix: string, count: number, suffix = '.webp'): string[] =>
  Array.from({ length: count }, (_, i) =>
    gh(`${prefix}-${String(i + 1).padStart(2, '0')}${suffix}`),
  );

export const services: Service[] = [
  {
    slug: 'estruturas-metalicas',
    name: 'Estruturas Metálicas',
    shortName: 'Estruturas',
    tagline: 'Galpões, colunas e treliças com precisão industrial.',
    description:
      'Projetamos, fabricamos e montamos estruturas metálicas para galpões industriais, logísticos e comerciais. Vãos livres, montagem rápida e acabamento de alto padrão.',
    icon: Warehouse,
    heroImage: gh('estrutura-galpo-de-estrutura-metalica-galvanizada.webp'),
    hasPage: true,
    features: [
      { title: 'Vãos livres', detail: 'Colunas afastadas sem apoios intermediários, maximizando a área útil.' },
      { title: 'Montagem express', detail: 'Estrutura pré-fabricada em oficina, montagem em obra em dias.' },
      { title: 'Galvanização', detail: 'Tratamento anticorrosivo para maior vida útil da estrutura.' },
      { title: 'Modularidade', detail: 'Expansão lateral e longitudinal prevista no projeto, sem retrabalho.' },
    ],
  },
  {
    slug: 'pintura-termica',
    name: 'Pintura Térmica',
    shortName: 'Pintura Térmica',
    tagline: 'Conforto térmico e proteção para telhados e estruturas.',
    description:
      'Aplicação de pintura térmica em telhados e estruturas metálicas, reduzindo a temperatura interna e protegendo contra corrosão. Equipe especializada com EPI completo.',
    icon: PaintRoller,
    heroImage: gh('pintura-telhado-epi-completo.webp'),
    hasPage: true,
    features: [
      { title: 'Redução térmica', detail: 'Diminui a temperatura interna em até 12°C, melhorando o conforto.' },
      { title: 'Proteção anticorrosiva', detail: 'Barreira contra oxidação e umidade, ampliando a vida útil.' },
      { title: 'Equipe EPI completo', detail: 'Profissionais certificados para trabalho em altura com segurança.' },
      { title: 'Durabilidade', detail: 'Pintura industrial de longa duração, com mínimo de manutenção.' },
    ],
  },
  {
    slug: 'tubulacao-ppr',
    name: 'Tubulação PPR',
    shortName: 'Tubulação PPR',
    tagline: 'Sistemas hidráulicos em PPR com segurança e durabilidade.',
    description:
      'Instalação de tubulações em PPR (polipropileno copolímero random) para sistemas de água quente e fria. Material de alta resistência térmica, com solda por termofusão.',
    icon: Waves,
    heroImage: gh('PPR.webp'),
    hasPage: true,
    features: [
      { title: 'Termofusão', detail: 'Juntas soldadas por calor, eliminando vazamentos e conexões metálicas.' },
      { title: 'Alta resistência térmica', detail: 'Suporta temperaturas de até 95°C sem deformação.' },
      { title: 'Vida útil longa', detail: 'Material não corrosivo com mais de 50 anos de durabilidade.' },
      { title: 'Higienicamente seguro', detail: 'Material atóxico que não contamina a água, ideal para consumo.' },
    ],
  },
  {
    slug: 'fachadas',
    name: 'Fachadas',
    shortName: 'Fachadas',
    tagline: 'Fachadas comerciais e residenciais que valorizam seu imóvel.',
    description:
      'Execução de fachadas comerciais e residenciais em estrutura metálica, lona, vidro e elementos arquitetônicos. Soluções que unem estética, durabilidade e identidade visual.',
    icon: Building2,
    heroImage: gh('fachada-magrass.webp'),
    hasPage: true,
    features: [
      { title: 'Identidade visual', detail: 'Fachadas que destacam sua marca e valorizam o imóvel.' },
      { title: 'Materiais variados', detail: 'Lona, vidro, alumínio e aço combinados para cada projeto.' },
      { title: 'Resistência ao clima', detail: 'Materiais selecionados para suportar sol, chuva e vento.' },
      { title: 'Manutenção simples', detail: 'Sistemas modulares que facilitam reparos e trocas pontuais.' },
    ],
  },
  {
    slug: 'toldos',
    name: 'Toldos',
    shortName: 'Toldos',
    tagline: 'Toldos comerciais e residenciais sob medida.',
    description:
      'Fabricação e instalação de toldos para comércios e residências. Proteção solar, chuva e destaque visual para sua fachada, com estrutura metálica resistente e lona de qualidade.',
    icon: Umbrella,
    heroImage: gh('toldo-1.webp'),
    hasPage: true,
    features: [
      { title: 'Proteção solar e chuva', detail: 'Lona impermeável e resistente aos raios UV, com estrutura robusta.' },
      { title: 'Sob medida', detail: 'Cada toldo é projetado para as dimensões e estilo do seu espaço.' },
      { title: 'Estrutura metálica', detail: 'Base em aço ou alumínio para máxima durabilidade e estabilidade.' },
      { title: 'Versatilidade', detail: 'Modelos fixos, retráteis e motorizados conforme a necessidade.' },
    ],
  },
  {
    slug: 'cortinas-rolo',
    name: 'Cortinas Rolô',
    shortName: 'Cortinas Rolô',
    tagline: 'Cortinas de rolo metálicas para segurança e controle solar.',
    description:
      'Instalação de cortinas rolô metálicas para comércios, indústrias e residências. Proteção, controle de luz e privacidade com acionamento manual ou motorizado.',
    icon: PanelTop,
    heroImage: gh('cortina-cortina-rolou.webp'),
    hasPage: true,
    features: [
      { title: 'Segurança', detail: 'Lâminas metálicas resistentes que protegem contra invasões.' },
      { title: 'Controle de luz', detail: 'Ajuste preciso da iluminação e privacidade do ambiente.' },
      { title: 'Acionamento motorizado', detail: 'Opção de motor elétrico com controle remoto para maior comodidade.' },
      { title: 'Durabilidade', detail: 'Material de alta resistência com mínimo de manutenção.' },
    ],
  },
  {
    slug: 'coberturas',
    name: 'Coberturas',
    shortName: 'Coberturas',
    tagline: 'Coberturas em telha termoacústica e lona estruturada.',
    description:
      'Coberturas em estrutura metálica treliçada com telhas trapezoidais termoacústicas ou lona. Soluções para galpões, arenas e áreas externas, com isolamento térmico e drenagem dimensionada.',
    icon: Home,
    heroImage: gh('cobertura-cobertura-com-estrutura-trelicada-e-telha-trapezoidal-termoacustica.webp'),
    hasPage: true,
    features: [
      { title: 'Isolamento termoacústico', detail: 'Telhas sanduíche que reduzem temperatura e ruído externo.' },
      { title: 'Estrutura treliçada', detail: 'Vãos amplos com mínimos apoios, otimizando o espaço coberto.' },
      { title: 'Drenagem dimensionada', detail: 'Calhas e condutores projetados para vazões críticas de chuva.' },
      { title: 'Lona estruturada', detail: 'Opção em lona tensionada para coberturas temporárias ou permanentes.' },
    ],
  },
  {
    slug: 'pergolados',
    name: 'Pergolados',
    shortName: 'Pergolados',
    tagline: 'Pergolados em estrutura metálica para áreas externas.',
    description:
      'Pergolados em estrutura metálica que valorizam áreas externas residenciais e comerciais. Sombra, estilo e durabilidade com acabamento arquitetônico.',
    icon: Grid3x3,
    heroImage: gh('avulsa-pergolado.webp'),
    hasPage: true,
    features: [
      { title: 'Estrutura metálica', detail: 'Aço ou alumínio tratado contra corrosão e intempéries.' },
      { title: 'Design personalizado', detail: 'Modelos que se integram à arquitetura do seu espaço.' },
      { title: 'Sombra e ventilação', detail: 'Lâminas orientáveis para controle de luz e circulação de ar.' },
      { title: 'Baixa manutenção', detail: 'Materiais de alta resistência com pintura de longa durabilidade.' },
    ],
  },
  {
    slug: 'portoes',
    name: 'Portões',
    shortName: 'Portões',
    tagline: 'Portões automáticos e manuais em aço e alumínio.',
    description:
      'Fabricação e instalação de portões residenciais e comerciais. Modelos deslizantes, basculantes e de correr, com automação opcional e acabamento de qualidade.',
    icon: DoorOpen,
    heroImage: gh('portao-residencial.webp'),
    hasPage: true,
    features: [
      { title: 'Automação', detail: 'Integração com motores, controle remoto e sensores de segurança.' },
      { title: 'Modelos variados', detail: 'Deslizantes, basculantes, de correr e portas em folhas.' },
      { title: 'Acabamento premium', detail: 'Pintura eletrostática com tonalidades sob medida.' },
      { title: 'Segurança', detail: 'Estrutura robusta e ferragens resistentes para máxima proteção.' },
    ],
  },
  {
    slug: 'moveis-industriais',
    name: 'Móveis Industriais',
    shortName: 'Móveis Industriais',
    tagline: 'Móveis em tubo metalon com estilo industrial.',
    description:
      'Móveis sob medida em tubo metalon, MDF e madeira com estilo industrial. Araras, estantes, gôndulas e mesas para lojas, escritórios e residências.',
    icon: Store,
    heroImage: gh('movel-loja-montada.webp'),
    hasPage: true,
    features: [
      { title: 'Tubo metalon', detail: 'Estrutura leve e resistente em aço carbono com acabamento industrial.' },
      { title: 'Sob medida', detail: 'Cada móvel é projetado para o seu espaço e necessidade.' },
      { title: 'Para lojas', detail: 'Araras, gôndulas e mesas que valorizam a vitrine e o produto.' },
      { title: 'Estilo industrial', detail: 'Design contemporâneo que combina com ambientes modernos.' },
    ],
  },
  {
    slug: 'refrigeracao',
    name: 'Refrigeração',
    shortName: 'Refrigeração',
    tagline: 'Sistemas de refrigeração para comércio e indústria.',
    description:
      'Instalação e manutenção de sistemas de refrigeração para ambientes comerciais e industriais. Soluções em climatização, exaustão e ventilação com eficiência energética.',
    icon: AirVent,
    heroImage: gh('IMG_20250222_143411.jpg.webp'),
    hasPage: true,
    features: [
      { title: 'Climatização', detail: 'Sistemas dimensionados para cada ambiente e carga térmica.' },
      { title: 'Eficiência energética', detail: 'Equipamentos selecionados para baixo consumo e alta performance.' },
      { title: 'Exaustão e ventilação', detail: 'Renovação de ar passiva e ativa para ambientes saudáveis.' },
      { title: 'Manutenção', detail: 'Serviço técnico preventivo e corretivo para sua tranquilidade.' },
    ],
  },
  {
    slug: 'esquadrias-aluminio',
    name: 'Esquadrias de Alumínio',
    shortName: 'Esquadrias',
    tagline: 'Janelas, portas e esquadrias em alumínio de alta performance.',
    description:
      'Fabricação e instalação de esquadrias de alumínio: janelas, portas, divisórias e fachadas. Vedação, isolamento e acabamento de alto padrão para qualquer projeto.',
    icon: Frame,
    heroImage: gh('IMG_20250320_091049.jpg.webp'),
    hasPage: true,
    features: [
      { title: 'Vedação total', detail: 'Sistemas de vedação que eliminam infiltrações de água e ar.' },
      { title: 'Isolamento térmico', detail: 'Perfis com quebra de ponte térmica para conforto e eficiência.' },
      { title: 'Acabamento premium', detail: 'Anodização ou pintura eletrostática em diversas tonalidades.' },
      { title: 'Sob medida', detail: 'Cada esquadria é fabricada para as dimensões exatas do projeto.' },
    ],
  },
  {
    slug: 'mezanino',
    name: 'Mezanino',
    shortName: 'Mezanino',
    tagline: 'Mezaninos metálicos que dobram a área útil.',
    description:
      'Mezaninos em estrutura metálica leve para dobrar a área útil de galpões, lojas e indústrias. Compatível com pisos técnicos e cargas elevadas, sem interferir na operação.',
    icon: Layers,
    heroImage: gh('IMG_20250610_080429.jpg.webp'),
    hasPage: true,
    features: [
      { title: 'Baixo peso próprio', detail: 'Vigas em aço leve reduzem a sobrecarga na estrutura existente.' },
      { title: 'Piso técnico', detail: 'Pisos em chapa xadrez, painéis raised-floor ou concreto colaborante.' },
      { title: 'Guarda-corpos integrados', detail: 'Corrimãos e rodapés em aço com acabamento arquitetônico.' },
      { title: 'Operação contínua', detail: 'Montagem noturna ou em áreas isoladas mantém sua operação ativa.' },
    ],
  },
  {
    slug: 'outros',
    name: 'Outros Serviços',
    shortName: 'Outros',
    tagline: 'Tem algo diferente em mente? Vamos conversar.',
    description:
      'A GAE Dynamics também realiza outros tipos de serviços em áreas parecidas. Entre em contato para discutirmos o que você tem em mente.',
    icon: Sparkles,
    heroImage: gh('avulsa-corrimo.webp'),
    hasPage: false,
    features: [],
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

const estruturaImages = [
  gh('estrutura-coluna-trelicada-para-galpo-2.webp'),
  gh('estrutura-coluna-trelicada-para-galpo.webp'),
  gh('estrutura-fase-de-montagem-estrutura-galpo.webp'),
  gh('estrutura-fase-de-montagem-galpo.webp'),
  gh('estrutura-galpo-de-estrutura-galvanizada.webp'),
  gh('estrutura-galpo-de-estrutura-metalica-galvanizada.webp'),
  ...ghRange('estrutura-wa', 35),
];

const pinturaImages = [
  gh('pintura-telhado-epi-completo.webp'),
  gh('IMG_20241019_125543.jpg.webp'),
  gh('IMG_20241024_131404.jpg.webp'),
];

const pprImages = [
  gh('PPR.webp'),
  gh('IMG_20241024_131409.jpg.webp'),
];

const fachadaImages = [
  gh('fachada-casa-do-norte.webp'),
  gh('fachada-cofab.webp'),
  gh('fachada-drogalis.webp'),
  gh('fachada-fachada-em-lona.webp'),
  gh('fachada-magrass-2.webp'),
  gh('fachada-magrass.webp'),
  gh('fachada-miami.webp'),
  gh('fachada-oticas-diniz.webp'),
  gh('fachada-rellu.webp'),
  gh('fachada-studio-revest.webp'),
  gh('avulsa-tela-fachadeira.webp'),
];

const toldoImages = [
  gh('toldo-1.webp'),
  gh('toldo-2.webp'),
  gh('toldo-3.webp'),
  gh('toldo-residencial.webp'),
];

const cortinaImages = [
  gh('cortina-cortina-rolou.webp'),
  gh('cortina-cortina-rolou-2.webp'),
  gh('cortina-cortina-rolou-3.webp'),
  gh('cortina-cortina-rolou-4.webp'),
  gh('cortina-cortina-rolou-5.webp'),
];

const coberturaImages = [
  gh('cobertura-cobertura-com-estrutura-trelicada-e-telha-trapezoidal-termoacustica.webp'),
  gh('cobertura-cobertura-em-lona.webp'),
  gh('cobertura-cobertura-telha-trapezoidal-termoacustica-2-.webp'),
  gh('cobertura-cobertura-telha-trapezoidal-termoacustica.webp'),
  gh('cobertura-wa-01.webp'),
  gh('cobertura-wa-02.webp'),
  gh('avulsa-beiral.webp'),
];

const pergoladoImages = [
  gh('avulsa-pergolado.webp'),
  gh('IMG_20250613_143418.jpg.webp'),
  gh('IMG_20250613_144529.jpg.webp'),
];

const portaoImages = [
  gh('portao-1.webp'),
  gh('portao-2.webp'),
  gh('portao-3.webp'),
  gh('portao-residencial.webp'),
  gh('avulsa-porta-de-correr-em-folhas.webp'),
];

const movelImages = [
  gh('movel-arara-para-loja-em-tubo-metalom.webp'),
  gh('movel-arara-para-loja-em-tubo-metalom-1.webp'),
  gh('movel-arara-para-loja-em-tubo-metalom-2.webp'),
  gh('movel-estante-estilo-induatrial-em-tubo-metalom-mdf.webp'),
  gh('movel-estante-estilo-induatrial-em-tubo-metalom-mdf-1.webp'),
  gh('movel-gondulas-araras-mesa-em-tubo-metalom-para-loja.webp'),
  gh('movel-gondulas-araras-mesa-em-tubo-metalom-para-loja-1.webp'),
  gh('movel-loja-montada.webp'),
];

const refrigeracaoImages = [
  gh('IMG_20250620_170118.jpg.webp'),
  gh('IMG_20250625_171827.jpg.webp'),
  gh('IMG_20250625_171840.jpg.webp'),
];

const esquadriasImages = [
  gh('IMG_20250626_160653.jpg.webp'),
  gh('IMG_20250626_160656.jpg.webp'),
  gh('IMG_20250715_133947.jpg.webp'),
];

const mezaninoImages = [
  gh('IMG_20250222_143411.jpg.webp'),
  gh('IMG_20250320_091049.jpg.webp'),
  gh('IMG_20250610_080429.jpg.webp'),
];

const outrosImages = [
  gh('avulsa-corrimo.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.17.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.18.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.19 (1).webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.19.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.20.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.21 (1).webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.21.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.51.22.webp'),
  gh('WhatsApp Image 2026-07-13 at 14.54.12.webp'),
  gh('WhatsApp Image 2026-07-13 at 15.28.25.webp'),
];

const makeProjects = (
  category: ProjectCategory,
  images: string[],
  namePrefix: string,
  startIndex: number,
): Project[] =>
  images.map((image, i) => ({
    id: `p-${String(startIndex + i).padStart(2, '0')}`,
    title: `${namePrefix} ${String(startIndex + i).padStart(2, '0')}`,
    category,
    image,
    featured: i === 0,
  }));

export const projects: Project[] = [
  ...makeProjects('estruturas-metalicas', estruturaImages, 'Estrutura Metálica', 1),
  ...makeProjects('pintura-termica', pinturaImages, 'Pintura Térmica', 42),
  ...makeProjects('tubulacao-ppr', pprImages, 'Tubulação PPR', 45),
  ...makeProjects('fachadas', fachadaImages, 'Fachada', 47),
  ...makeProjects('toldos', toldoImages, 'Toldo', 58),
  ...makeProjects('cortinas-rolo', cortinaImages, 'Cortina Rolô', 62),
  ...makeProjects('coberturas', coberturaImages, 'Cobertura', 67),
  ...makeProjects('pergolados', pergoladoImages, 'Pergolado', 74),
  ...makeProjects('portoes', portaoImages, 'Portão', 77),
  ...makeProjects('moveis-industriais', movelImages, 'Móvel Industrial', 82),
  ...makeProjects('refrigeracao', refrigeracaoImages, 'Refrigeração', 90),
  ...makeProjects('esquadrias-aluminio', esquadriasImages, 'Esquadria de Alumínio', 93),
  ...makeProjects('mezanino', mezaninoImages, 'Mezanino', 96),
  ...makeProjects('outros', outrosImages, 'Projeto Especial', 99),
];

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 8);

export const projectFilters: { key: ProjectCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'estruturas-metalicas', label: 'Estruturas' },
  { key: 'pintura-termica', label: 'Pintura' },
  { key: 'tubulacao-ppr', label: 'PPR' },
  { key: 'fachadas', label: 'Fachadas' },
  { key: 'toldos', label: 'Toldos' },
  { key: 'cortinas-rolo', label: 'Cortinas' },
  { key: 'coberturas', label: 'Coberturas' },
  { key: 'pergolados', label: 'Pergolados' },
  { key: 'portoes', label: 'Portões' },
  { key: 'moveis-industriais', label: 'Móveis' },
  { key: 'refrigeracao', label: 'Refrigeração' },
  { key: 'esquadrias-aluminio', label: 'Esquadrias' },
  { key: 'mezanino', label: 'Mezanino' },
  { key: 'outros', label: 'Outros' },
];

export const projectsByCategory = (cat: ProjectCategory): Project[] =>
  projects.filter((p) => p.category === cat);

export const stats = [
  { value: '180k+', label: 'm² construídos' },
  { value: '+50', label: 'obras realizadas' },
  { value: '18+', label: 'anos de operação' },
  { value: '100%', label: 'projeto próprio' },
];

export const contactInfo = {
  address: 'Av. Airton Dos Santos Heras Galves',
  phone: '11998376381',
  phoneDisplay: '(11) 99837-6381',
  whatsapp: 'https://wa.me/5511998376381',
  email: 'contato@gaedynamics.com.br',
};
