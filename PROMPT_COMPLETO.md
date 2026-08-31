# Prompt Completo — Site GAE Dynamics

## Objetivo

Reproduzir perfeitamente o site institucional da **GAE Dynamics**, empresa de engenharia e montagem com 18+ anos de operação. Site moderno, responsivo, com animações sutis, estética industrial sofisticada, dark mode, e formulário de orçamento que salva no Supabase.

---

## Stack

- Vite + React 18 + TypeScript (strict)
- Tailwind CSS 3.4 (darkMode: 'class')
- lucide-react para ícones
- @supabase/supabase-js para persistência
- Hash-based router customizado (sem react-router)
- Sem dependências adicionais de UI

---

## 1. Configuração

### index.html
- `lang="pt-BR"`, `<html class="dark">` por padrão
- Script inline antes do CSS: lê `localStorage.getItem('gae-theme')`; se `'light'` remove classe `dark`, senão adiciona. Fallback: dark.
- Meta description: "GAE Dynamics — Engenharia de estruturas metálicas de alto padrão. Galpões, mezaninos, coberturas e serralheria industrial com precisão e performance."
- `<meta name="theme-color" content="#0a0d12">`
- Title: "GAE Dynamics — Engenharia de Estruturas Metálicas"
- Google Fonts: `Plus Jakarta+Sans` (300-800 + italic 400) e `JetBrains+Mono` (400-500)
- Favicon: `/favicon.svg`

### tailwind.config.js
```
darkMode: 'class'
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
fontFamily:
  sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
  display: igual ao sans
  mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace']
colors:
  ink: 50:#f6f7f8, 100:#eceef1, 200:#d4d9df, 300:#aab2bd, 400:#7c8593, 500:#5b6573, 600:#454f5d, 700:#343c47, 800:#1f2530, 900:#12161d, 950:#0a0d12
  steel: 50:#eef4f8, 100:#d6e4ee, 200:#aecfdf, 300:#7fb0d0, 400:#4f90bd, 500:#3274a3, 600:#255c85, 700:#1f4a6b, 800:#1d3f59, 900:#1b3650, 950:#11243a
  ember: 50:#ecfeff, 100:#cffafe, 200:#a5f3fc, 300:#67e8f9, 400:#22d3ee, 500:#06b6d4, 600:#0891b2, 700:#0e7490, 800:#155e75, 900:#164e63, 950:#083344
letterSpacing: tightest: '-0.04em'
transitionTimingFunction: 'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
keyframes: fade-in, fade-up, scale-in, slow-zoom, shimmer, marquee
animation: fade-in 0.5s, fade-up 0.7s cubic-bezier(0.16,1,0.3,1), scale-in 0.4s, slow-zoom 12s, shimmer 2.4s linear infinite, marquee 36s linear infinite
backgroundImage: 'grid-faint': linear-gradient com rgba(255,255,255,0.04) em duas direções
```

### vite.config.ts
- Plugin react()
- `optimizeDeps.exclude: ['lucide-react']`

### tsconfig.app.json
- target ES2020, strict true, jsx react-jsx, moduleResolution bundler, noEmit true, noUnusedLocals false, noUnusedParameters false

### package.json
Dependencies: @supabase/supabase-js ^2.57.4, lucide-react ^0.344.0, react ^18.3.1, react-dom ^18.3.1
DevDeps: @eslint/js, @types/react, @types/react-dom, @vitejs/plugin-react, autoprefixer, eslint, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss, tailwindcss, typescript, typescript-eslint, vite

### postcss.config.js
- tailwindcss + autoprefixer

---

## 2. CSS Global (src/index.css)

### Variáveis CSS (:root e .dark)
```css
:root {
  --surface: #ffffff;
  --surface-subtle: #f7f8fa;
  --text-strong: #12161d;
  --text-base: #454f5d;
  --text-muted: #5b6573;
  --border: #e6e8ec;
  --border-strong: #d4d9df;
}
.dark {
  --surface: #0a0d12;
  --surface-subtle: #12161d;
  --text-strong: #f6f7f8;
  --text-base: #aab2bd;
  --text-muted: #7c8593;
  --border: #1f2530;
  --border-strong: #2a313b;
}
```

### Base
- `*` com font-smoothing antialiased
- `html` scroll-behavior: smooth
- `body` font-sans, antialiased, font-feature-settings 'ss01','cv11', background var(--surface), color var(--text-strong), transition 0.4s
- `::selection` bg-ember-500/90 text-white
- h1-h4: font-display tracking-tightest, text-wrap: balance
- Scrollbar customizada: 10px, track surface-subtle, thumb border-strong arredondado

### Dark mode overrides (crítico)
Inverter ink-50..300 (text e bg) para tons escuros. bg-ink-950 fica #060810. bg-white e translucidos brancos viram dark. Cores ember/steel 50/200/600/700/800 invertidas para tons cyan. Ver arquivo index.css completo para mapeamento exato.

### Component classes
- `.container-px`: px-5 sm:px-8 lg:px-12
- `.container-wide`: mx-auto w-full max-w-[1400px] container-px
- `.eyebrow`: inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em], color var(--text-muted)
- `.btn`: inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out-expo, focus ring ember-400
- `.btn-primary`: btn bg-ember-500 px-6 py-3 text-white shadow hover:bg-ember-600 hover:-translate-y-0.5
- `.btn-ghost`: btn px-6 py-3, border var(--border-strong), bg color-mix surface 70%, hover surface + translateY
- `.btn-dark`: btn bg-ember-600 px-6 py-3 text-white hover:bg-ember-500
- `.glass`: border backdrop-blur-xl, bg color-mix surface 70%
- `.glass-dark`: border-white/10 backdrop-blur-xl, bg rgba(10,13,18,0.6)
- `.card`: rounded-3xl, border var(--border), bg var(--surface), shadow sutil
- `.section-eyebrow`: eyebrow mb-4
- `.h-display`: text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl
- `.h-section`: text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]
- `.lead`: text-base leading-relaxed sm:text-lg, color var(--text-muted)
- `.link-underline`: after pseudo com scale-x-0 → hover scale-x-100
- `.hairline`: h-px w-full, gradient transparent → border-strong → transparent

### Utilities
- `.text-balance`: text-wrap balance
- `.mask-fade-b`: mask-image linear-gradient bottom
- `.mask-fade-x`: mask-image horizontal
- `.pause-animation`: animation-play-state paused
- `.bg-noise`: SVG turbulence inline
- `.bg-surface` / `.bg-surface-subtle`: var(--surface) / var(--surface-subtle)

---

## 3. Libs (src/lib/)

### router.tsx
- Tipo `Route`: union de { name: 'home' | 'services' | 'portfolio' | 'about' | 'contact' | 'service'; slug?: string }
- `parseHash()`: lê `window.location.hash`, remove `#/`, split por `/`. Segments: 'servicos'→services, 'portfolio'→portfolio, 'sobre'→about, 'contato'→contact, 'servico'→service com slug. Default: home.
- `routeToHash()`: home→'#/', services→'#/servicos', etc. service→'#/servico/{slug}'
- `RouterProvider`: useState com parseHash, useEffect hashchange listener, navigate() que seta hash e scrollTo top instant
- `useRouter()`: context hook

### theme.tsx
- Theme = 'dark' | 'light'
- STORAGE_KEY = 'gae-theme'
- ThemeProvider: useState('dark'), useEffect lê localStorage, applyTheme add/remove classe 'dark' no documentElement
- toggle() inverte, setTheme() persiste
- useTheme() context hook

### supabase.ts
- createClient com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY, persistSession false
- Tipos: QuoteStatus = 'novo' | 'em_contato' | 'convertido' | 'arquivado'
- Interface QuoteRequest: id?, name, email, phone?, company?, service, message?, status?, created_at?

### useReveal.ts
- Hook useReveal<T>(): ref + shown (boolean)
- IntersectionObserver com threshold 0.12, rootMargin '0px 0px -8% 0px'
- Quando intersecta: shown=true, disconnect
- Fallback: se IntersectionObserver undefined, shown=true

---

## 4. Dados (src/data/content.ts)

### Base de imagens
```
GH_BASE = 'https://raw.githubusercontent.com/GAEdynamics/porfolio-gaedynamics/main/portfolio/'
gh(filename) = GH_BASE + encodeURIComponent(filename)
ghRange(prefix, count, suffix='.webp') = array de gh(`${prefix}-${String(i+1).padStart(2,'0')}${suffix}`)
```

### 14 Serviços (array `services`)
Cada serviço: { slug, name, shortName, tagline, description, icon (LucideIcon), heroImage, features: [{title, detail}[]], hasPage }

1. **estruturas-metalicas** | Estruturas Metálicas | Estruturas | Warehouse | hasPage: true
   - tagline: "Galpões, colunas e treliças com precisão industrial."
   - heroImage: gh('estrutura-galpo-de-estrutura-metalica-galvanizada.webp')
   - features: Vãos livres, Montagem express, Galvanização, Modularidade

2. **pintura-termica** | Pintura Térmica | Pintura Térmica | PaintRoller | hasPage: true
   - heroImage: gh('pintura-telhado-epi-completo.webp')
   - features: Redução térmica, Proteção anticorrosiva, Equipe EPI completo, Durabilidade

3. **tubulacao-ppr** | Tubulação PPR | Tubulação PPR | Waves | hasPage: true
   - heroImage: gh('PPR.webp')
   - features: Termofusão, Alta resistência térmica, Vida útil longa, Higienicamente seguro

4. **fachadas** | Fachadas | Fachadas | Building2 | hasPage: true
   - heroImage: gh('fachada-magrass.webp')
   - features: Identidade visual, Materiais variados, Resistência ao clima, Manutenção simples

5. **toldos** | Toldos | Toldos | Umbrella | hasPage: true
   - heroImage: gh('toldo-1.webp')
   - features: Proteção solar e chuva, Sob medida, Estrutura metálica, Versatilidade

6. **cortinas-rolo** | Cortinas Rolô | Cortinas Rolô | PanelTop | hasPage: true
   - heroImage: gh('cortina-cortina-rolou.webp')
   - features: Segurança, Controle de luz, Acionamento motorizado, Durabilidade

7. **coberturas** | Coberturas | Coberturas | Home | hasPage: true
   - heroImage: gh('cobertura-cobertura-com-estrutura-trelicada-e-telha-trapezoidal-termoacustica.webp')
   - features: Isolamento termoacústico, Estrutura treliçada, Drenagem dimensionada, Lona estruturada

8. **pergolados** | Pergolados | Pergolados | Grid3x3 | hasPage: true
   - heroImage: gh('avulsa-pergolado.webp')
   - features: Estrutura metálica, Design personalizado, Sombra e ventilação, Baixa manutenção

9. **portoes** | Portões | Portões | DoorOpen | hasPage: true
   - heroImage: gh('portao-residencial.webp')
   - features: Automação, Modelos variados, Acabamento premium, Segurança

10. **moveis-industriais** | Móveis Industriais | Móveis Industriais | Store | hasPage: true
    - heroImage: gh('movel-loja-montada.webp')
    - features: Tubo metalon, Sob medida, Para lojas, Estilo industrial

11. **refrigeracao** | Refrigeração | Refrigeração | AirVent | hasPage: true
    - heroImage: gh('IMG_20250222_143411.jpg.webp')
    - features: Climatização, Eficiência energética, Exaustão e ventilação, Manutenção

12. **esquadrias-aluminio** | Esquadrias de Alumínio | Esquadrias | Frame | hasPage: true
    - heroImage: gh('IMG_20250320_091049.jpg.webp')
    - features: Vedação total, Isolamento térmico, Acabamento premium, Sob medida

13. **mezanino** | Mezanino | Mezanino | Layers | hasPage: true
    - heroImage: gh('IMG_20250610_080429.jpg.webp')
    - features: Baixo peso próprio, Piso técnico, Guarda-corpos integrados, Operação contínua

14. **outros** | Outros Serviços | Outros | Sparkles | hasPage: false
    - tagline: "Tem algo diferente em mente? Vamos conversar."
    - description: "A GAE Dynamics também realiza outros tipos de serviços em áreas parecidas. Entre em contato para discutirmos o que você tem em mente."
    - heroImage: gh('avulsa-corrimo.webp')
    - features: []

### Projetos (array `projects`)
107 projetos gerados por `makeProjects(category, images, namePrefix, startIndex)`:
- Cada projeto: { id: `p-{NN}`, title: `{namePrefix} {NN}`, category, image, featured: i===0 }

Categorias e imagens (todas .webp):
- estruturas-metalicas (41 imgs, start 1): estrutura-coluna-trelicada-para-galpo-2, estrutura-coluna-trelicada-para-galpo, estrutura-fase-de-montagem-estrutura-galpo, estrutura-fase-de-montagem-galpo, estrutura-galpo-de-estrutura-galvanizada, estrutura-galpo-de-estrutura-metalica-galvanizada, estrutura-wa-01..35
- pintura-termica (3 imgs, start 42): pintura-telhado-epi-completo, IMG_20241019_125543.jpg, IMG_20241024_131404.jpg
- tubulacao-ppr (2 imgs, start 45): PPR, IMG_20241024_131409.jpg
- fachadas (11 imgs, start 47): fachada-casa-do-norte, fachada-cofab, fachada-drogalis, fachada-fachada-em-lona, fachada-magrass-2, fachada-magrass, fachada-miami, fachada-oticas-diniz, fachada-rellu, fachada-studio-revest, avulsa-tela-fachadeira
- toldos (4 imgs, start 58): toldo-1, toldo-2, toldo-3, toldo-residencial
- cortinas-rolo (5 imgs, start 62): cortina-cortina-rolou, -2, -3, -4, -5
- coberturas (7 imgs, start 67): cobertura-cobertura-com-estrutura-trelicada-e-telha-trapezoidal-termoacustica, cobertura-cobertura-em-lona, cobertura-cobertura-telha-trapezoidal-termoacustica-2-, cobertura-cobertura-telha-trapezoidal-termoacustica, cobertura-wa-01, cobertura-wa-02, avulsa-beiral
- pergolados (3 imgs, start 74): avulsa-pergolado, IMG_20250613_143418.jpg, IMG_20250613_144529.jpg
- portoes (5 imgs, start 77): portao-1, portao-2, portao-3, portao-residencial, avulsa-porta-de-correr-em-folhas
- moveis-industriais (8 imgs, start 82): movel-arara-para-loja-em-tubo-metalom, -1, -2, movel-estante-estilo-induatrial-em-tubo-metalom-mdf, -1, movel-gondulas-araras-mesa-em-tubo-metalom-para-loja, -1, movel-loja-montada
- refrigeracao (3 imgs, start 90): IMG_20250620_170118.jpg, IMG_20250625_171827.jpg, IMG_20250625_171840.jpg
- esquadrias-aluminio (3 imgs, start 93): IMG_20250626_160653.jpg, IMG_20250626_160656.jpg, IMG_20250715_133947.jpg
- mezanino (3 imgs, start 96): IMG_20250222_143411.jpg, IMG_20250320_091049.jpg, IMG_20250610_080429.jpg
- outros (11 imgs, start 99): avulsa-corrimo, WhatsApp Image 2026-07-13 at 14.51.17, 14.51.18, 14.51.19 (1), 14.51.19, 14.51.20, 14.51.21 (1), 14.51.21, 14.51.22, 14.54.12, 15.28.25

### Exports
- `featuredProjects`: projects.filter(featured).slice(0, 8)
- `projectFilters`: [{ key: 'all', label: 'Todos' }, ...um por categoria com label curto]
- `projectsByCategory(cat)`: filter
- `serviceBySlug(slug)`: find
- `stats`: [{ value: '180k+', label: 'm² construídos' }, { value: '+50', label: 'obras realizadas' }, { value: '18+', label: 'anos de operação' }, { value: '100%', label: 'projeto próprio' }]
- `contactInfo`: { address: 'Av. Airton Dos Santos Heras Galves', phone: '11998376381', phoneDisplay: '(11) 99837-6381', whatsapp: 'https://wa.me/5511998376381', email: 'contato@gaedynamics.com.br' }

---

## 5. Componentes (src/components/)

### Logo.tsx
- `<img src="/GAE_DYNAMICS_LOGO copy copy.png" alt="GAE Dynamics" />`
- Props: className, variant ('dark' | 'light')
- variant 'light' aplica `brightness-0 invert` (para fundo escuro/footer)

### Header.tsx
- Fixed top-3 sm:top-5, z-50, max-w-[1400px]
- Nav com glass effect quando scrolled (scrollY > 16), senão bg-white/40 backdrop-blur
- Logo clicável → navigate home
- Links desktop (lg+): Home, Serviços, Portfólio, Sobre Nós, Contato — pill ativo com bg-ink-100/80
- Botão "Solicitar Orçamento" (btn-primary, md+)
- ThemeToggle: botão circular com Sun/Moon animados (rotate + scale)
- Botão menu mobile (lg:hidden) com icon Menu
- Mobile drawer: right-0, w-[86%] max-w-sm, bg-white/dark:bg-ink-100, overlay bg-ink-950/40 backdrop-blur
  - Links em coluna com ArrowRight
  - Botão orçamento no bottom (mt-auto)
  - body overflow hidden quando aberto

### Footer.tsx
- bg-ink-950 text-ink-200, grid-faint overlay, linha ember no topo
- Grid lg: 1.4fr_1fr_1fr_1.2fr
- Col 1: Logo light, descrição ("Estruturas metálicas, fachadas, toldos, portões, coberturas, refrigeração e muito mais. Soluções completas com projeto, fabricação e montagem próprios."), tags de serviços como botões (hasPage→service, !hasPage→contact)
- Col 2: "Empresa" — nav links
- Col 3: "Serviços" — lista completa (hasPage→service, !hasPage→contact)
- Col 4: "Contato" — MapPin (address), Phone (tel link), MessageSquare (WhatsApp), Mail (mailto), botão "Solicitar Orçamento"
- Bottom: copyright dinâmico + "Equipe própria · Projeto, fabricação e montagem" com bullet ember

### CTABand.tsx
- Props: title?, description? (com defaults)
- Section container-wide py-16, card bg-ink-950 rounded-3xl
- grid-faint overlay, blur circles ember/steel
- Eyebrow "Próximo passo", h2 title, lead description
- Botões: "Solicitar Orçamento" (btn-primary → contact) + "Ver Portfólio" (btn-ghost branco → portfolio)

### Reveal.tsx
- Props: children, delay (ms), className, as ('div'|'section'|'li'|'article')
- Usa useReveal hook
- Classes: transition-all duration-700 ease-out-expo, shown ? translate-y-0 opacity-100 : translate-y-6 opacity-0
- transitionDelay inline style

### ScrollProgress.tsx
- Fixed top-0 z-[60] h-0.5
- Barra gradient from-ember-500 via-ember-400 to-steel-400
- Width = scroll percentage

### SectionHeading.tsx
- Props: eyebrow?, title (ReactNode), description?, align ('left'|'center'), dark?, action?
- Eyebrow com linha ember + texto
- h2 h-section max-w-3xl
- lead max-w-2xl
- Cada elemento envolto em Reveal com delays escalonados (0, 80, 160, 220)

### ImageWithFallback.tsx
- Props: src, alt, className, imgClassName, loading ('lazy'|'eager')
- Shimmer placeholder (gradient + animation shimmer) enquanto não carrega
- img com onLoad → loaded=true: scale-100 opacity-100 blur-0, senão scale-105 opacity-0 blur-md
- Container bg-ink-100

### ProjectCard.tsx
- Article group relative overflow-hidden rounded-2xl bg-ink-900
- ImageWithFallback aspect-[4/5], zoom group-hover:scale-110
- Gradient overlay from-ink-950/90
- Badge categoria (shortName) + título
- Badge "Destaque" se featured (ember-500)
- Botão ArrowUpRight no hover → navigate to service

### ProjectLightbox.tsx
- Props: project, onClose, onPrev?, onNext?
- Fixed z-[90], overlay bg-ink-950/80 backdrop-blur
- Card max-w-4xl animate-scale-in
- ImageWithFallback h-[50vh] md:h-[60vh]
- Botões prev/next (ChevronLeft/Right) nas laterais
- Footer: badge categoria + título + botão close
- Contador "Projeto NN de {total}"
- Keyboard: Escape→close, ArrowLeft→prev, ArrowRight→next
- body overflow hidden quando ativo

### ProjectGallery.tsx
- Props: category?, title?, eyebrow?, description?, limit?, showHeading?
- Filtra projects por category, aplica limit
- Grid 1/2/3/4 colunas responsivas
- Cada card em Reveal com delay escalonado
- ProjectLightbox integrado com navegação prev/next circular

### PortfolioModal.tsx
- Props: open, onClose, initialCategory?
- Fixed z-[80], overlay bg-ink-50/95 backdrop-blur-xl
- Top bar: ícone LayoutGrid + título "Portfólio completo" + botão Fechar
- Filtros: barra horizontal scrollável (scrollbar hidden), botões com count badge
- Grid scrollável 1/2/3/4 colunas
- Animação fade-up escalonada ao filtrar (key={filter})
- ProjectLightbox integrado
- ESC fecha (se lightbox fechado)

### QuoteForm.tsx
- Props: defaultService?, compact?
- Campos: name*, company, email*, phone, service* (select com todos + "Outro / Não sei ainda"), message (textarea)
- Validação: name, email, service obrigatórios
- Submit → supabase.from('quote_requests').insert(...)
- Estados: idle, loading (Loader2 spin), success (CheckCircle2 + mensagem), error (AlertCircle)
- Success: card com ícone steel-500, mensagem "Solicitação recebida", botão "Enviar nova solicitação"
- Inputs: rounded-xl border-ink-200, focus ring steel-200

---

## 6. Páginas (src/pages/)

### HomePage.tsx
1. **Hero** (min-h-100svh, bg-ink-950, text-white):
   - grid-faint overlay, blur circles ember/steel
   - Grid lg: 1.15fr_1fr
   - Left: eyebrow "Engenharia e montagem · desde 2007", h1 "Soluções que **transformam** espaços e impulsionam negócios." (transformam em ember-400 com SVG underline cyan), lead, 3 bullets com CheckCircle2, botões "Solicitar Orçamento" + "Ver Portfólio" (Play icon), stats grid 2x2/4x1
   - Right (lg+): colagem de 3 imagens (heroMain=estrutura, heroSecondary=fachada, heroTertiary=toldo) com badges flutuantes "Equipe própria" e "18+ anos"
   - Scroll indicator no bottom (mouse com bounce)

2. **Diferenciais** (container-wide py-20/28):
   - Grid lg: 1fr_1.1fr
   - Left: SectionHeading "Sobre a GAE Dynamics" / "Engenharia e montagem com **precisão industrial** e visão de longo prazo." + botão "Conhecer a empresa"
   - Right: 4 cards (ShieldCheck/Equipe própria, Factory/Fabricação própria, Ruler/Precisão milimétrica, Sparkles/Acabamento premium)

3. **Services Grid** (bg-ink-100/60 py-20/28):
   - SectionHeading "O que fazemos" / "Serviços que cobrem toda a sua obra."
   - Grid md:2 xl:4 — 14 cards (cada: imagem com zoom hover, ícone overlay, name, tagline, link "Explorar serviço" ou "Falar com a equipe")
   - hasPage→service page, !hasPage→contact

4. **Portfolio Preview** (container-wide py-20/28):
   - SectionHeading "Portfólio" / "Projetos recentes em destaque."
   - 8 featuredProjects em grid 1/2/4
   - Botão "Ver Portfólio Completo" → abre PortfolioModal
   - Botão mobile duplicado

5. **Testimonial** (bg-ink-100/60 py-20/28):
   - Grid lg: 1.2fr_1fr
   - Left: imagem cobertura + badge "18+ anos de experiência"
   - Right: SectionHeading "Depoimento" / "Cumprimento de prazo e excelência técnica em cada etapa." + blockquote + assinatura Ricardo Almeida (Logística ABC)

6. **CTABand** default

7. PortfolioModal + ProjectLightbox integrados

### ServicesPage.tsx
1. SectionHeading "Serviços" / "Tudo o que sua obra precisa, em um único time."
2. Lista de 13 serviços (hasPage) em cards grandes alternados (imagem esquerda/direita a cada ímpar):
   - Card grid md:2, imagem com zoom hover, ícone overlay, número "0N · Serviço", name, description, 4 features em checklist, botões "Ver detalhes" + "Orçamento"
3. **Card especial Outros** (bg-ink-950): ícone Sparkles, título, description, botão "Falar com a Equipe" → contact
4. Stats band (bg-ink-950, grid 2x2/4x1)
5. CTABand

### ServicePage.tsx (individual, props: slug)
1. Se !service ou !hasPage → 404 ("Serviço não encontrado", botão "Ver todos os serviços")
2. Breadcrumb "← Todos os serviços"
3. Hero: eyebrow "Serviço · {shortName}", h1 name, lead description, botões "Solicitar Orçamento" + "Formulário rápido" (anchor #orcamento), imagem com ícone overlay
4. Features: 4 cards com Check (h-full p-6)
5. Localized portfolio (bg-ink-100/60): SectionHeading "{shortName} que já construímos." + badge "Exclusivo · {shortName}" + ProjectGallery filtrada
6. Quote form (#orcamento): grid lg:1fr_1.1fr, left intro + 2 features, right card com QuoteForm defaultService
7. Other services: 3 cards (exclui atual e sem página) com ícone + name + tagline + ArrowRight
8. CTABand

### PortfolioPage.tsx
1. SectionHeading "Portfólio" / "Mais de 50 estruturas metálicas entregues."
2. Filtros sticky top-24 z-30: barra horizontal scrollável com Filter icon + 15 botões (cada com count badge)
3. Grid 1/2/3/4 com animate-fade-up escalonado (key={filter})
4. Empty state se 0 projetos
5. CTABand custom: "Tem um projeto em mente?"
6. ProjectLightbox com navegação circular

### AboutPage.tsx
1. SectionHeading "Sobre Nós" / "18+ anos transformando espaços e impulsionando negócios." + description
2. Stats band (grid 2x2/4x1, border ink-200, bg white per cell)
3. 2 imagens (montagem + fachada) com overlay gradient + labels
4. Values: 3 cards (Target/Missão, Eye/Visão, Award/Valores)
5. Highlights (bg-ink-100/60): 6 cards (Factory, Users, Ruler, ShieldCheck, Clock, Award) com ícone steel-50/steel-600
6. CTABand custom: "Vamos conversar sobre o seu projeto?"
7. SEM timeline, SEM certificações

### ContactPage.tsx
1. SectionHeading "Contato" / "Vamos construir juntos."
2. Grid lg: 1fr_1.2fr
3. Left: 4 cards de canal (Phone, MessageSquare/WhatsApp, Mail, MapPin) + card de serviços (tags)
4. Right: card com QuoteForm

---

## 7. App.tsx
- ThemeProvider > RouterProvider > ScrollProgress + Header + main > Routes + Footer
- Routes: switch route.name → HomePage | ServicesPage | ServicePage(slug) | PortfolioPage | AboutPage | ContactPage | default HomePage

---

## 8. Supabase Migration

Tabela `quote_requests`:
```sql
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'novo',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx ON quote_requests (created_at DESC);
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert_quote_requests" ON quote_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "anon_select_quote_requests" ON quote_requests FOR SELECT TO anon, authenticated USING (true);
```

---

## 9. Diretrizes de Design

- **Cores**: ink (neutro escuro), ember (ciano/azul-acento), steel (azul). NUNCA roxo/índigo/violeta.
- **Dark mode**: classe 'dark' no html, toggle persistido em localStorage 'gae-theme'. Default: dark.
- **Fontes**: Plus Jakarta Sans (display + body), JetBrains Mono (mono). Máx 3 pesos.
- **Espaçamento**: sistema 8px. container max-w-[1400px].
- **Line-height**: 150% body, 120% headings (leading-[1.05] a [1.1]).
- **Responsividade**: mobile-first. Breakpoints sm:640, md:768, lg:1024, xl:1280.
- **Grid portfólio**: 1 col mobile, 2 tablet, 3 laptop, 4 desktop.
- **Filtros**: scroll horizontal no mobile (scrollbar hidden), wrap no desktop.
- **Animações**: fade-up on scroll (Reveal), hover translate/scale, transições ease-out-expo.
- **Contraste**: sempre legível em qualquer tema.
- **Sem emojis**.
- **Português brasileiro** em todo conteúdo.
- **Comentários**: mínimos, apenas quando o "porquê" não é óbvio.

---

## 10. Estrutura de Arquivos

```
project/
├── public/
│   ├── favicon.svg
│   ├── GAE_DYNAMICS_LOGO.png
│   ├── GAE_DYNAMICS_LOGO copy.png
│   └── GAE_DYNAMICS_LOGO copy copy.png
├── src/
│   ├── components/
│   │   ├── CTABand.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ImageWithFallback.tsx
│   │   ├── Logo.tsx
│   │   ├── PortfolioModal.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectGallery.tsx
│   │   ├── ProjectLightbox.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── Reveal.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── SectionHeading.tsx
│   ├── data/
│   │   └── content.ts
│   ├── lib/
│   │   ├── router.tsx
│   │   ├── supabase.ts
│   │   ├── theme.tsx
│   │   └── useReveal.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── PortfolioPage.tsx
│   │   ├── ServicePage.tsx
│   │   └── ServicesPage.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/migrations/
│   └── 20260720181821_create_quote_requests.sql.sql
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
└── tsconfig.node.json
```
