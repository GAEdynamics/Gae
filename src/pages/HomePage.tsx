import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  ShieldCheck,
  Sparkles,
  Factory,
  Ruler,
  Quote,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from '../lib/router';
import {
  services,
  featuredProjects,
  stats,
  type ProjectCategory,
} from '../data/content';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectLightbox } from '../components/ProjectLightbox';
import { PortfolioModal } from '../components/PortfolioModal';
import { CTABand } from '../components/CTABand';
import type { Project } from '../data/content';

const GH_BASE =
  'https://raw.githubusercontent.com/GAEdynamics/porfolio-gaedynamics/main/portfolio/';
const gh = (f: string) => GH_BASE + encodeURIComponent(f);

const heroMain = gh('estrutura-galpo-de-estrutura-metalica-galvanizada.webp');
const heroSecondary = gh('fachada-magrass.webp');
const heroTertiary = gh('toldo-1.webp');

const aboutImg = gh('cobertura-cobertura-com-estrutura-trelicada-e-telha-trapezoidal-termoacustica.webp');

const differentials = [
  { icon: ShieldCheck, title: 'Equipe própria', detail: 'Engenheiros, soldadores e montadores em um único time, do projeto à entrega.' },
  { icon: Factory, title: 'Fabricação própria', detail: 'Oficina controlada com corte, dobra e solda qualificada para cada projeto.' },
  { icon: Ruler, title: 'Precisão milimétrica', detail: 'Detalhamento técnico e peças numeradas para montagem sem ajuste em obra.' },
  { icon: Sparkles, title: 'Acabamento premium', detail: 'Pintura industrial e detalhes arquitetônicos em cada entrega.' },
];

const heroBullets = [
  'Projeto e fabricação próprios',
  'Equipe especializada em obra',
  'Entrega no prazo combinado',
];

export function HomePage() {
  const { navigate } = useRouter();
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [lightbox, setLightbox] = useState<Project | null>(null);

  return (
    <div>
      {/* HERO — split layout with image collage */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 -z-10 bg-grid-faint [background-size:64px_64px] opacity-20" />
        <div className="absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-ember-500/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-steel-500/10 blur-[100px]" />

        <div className="container-wide relative flex min-h-[100svh] flex-col justify-center gap-12 pb-16 pt-32 lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-20">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow text-ink-300">
                <span className="inline-block h-px w-6 bg-ember-500" />
                Engenharia e montagem · desde 2007
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="h-display mt-5 text-white">
                Soluções que{' '}
                <span className="relative whitespace-nowrap text-ember-400">
                  transformam
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 9C70 3 230 3 298 9"
                      stroke="#22d3ee"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                espaços e impulsionam negócios.
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p className="lead mt-6 max-w-xl text-ink-200">
                Estruturas metálicas, fachadas, toldos, coberturas, portões,
                refrigeração e muito mais. Tudo com projeto, fabricação e
                montagem próprios — do briefing à entrega-chave.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {heroBullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-ink-200">
                    <CheckCircle2 className="h-4 w-4 text-ember-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate({ name: 'contact' })}
                  className="btn-primary"
                >
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPortfolioOpen(true)}
                  className="btn-ghost border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Play className="h-4 w-4" />
                  Ver Portfólio
                </button>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col gap-1 bg-ink-950/20 p-5 sm:p-6"
                  >
                    <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-ink-400">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="relative hidden lg:block">
            <div className="relative h-[520px]">
              <div className="absolute right-0 top-0 h-[340px] w-[78%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <ImageWithFallback
                  src={heroMain}
                  alt="Estrutura metálica industrial"
                  loading="eager"
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 h-[220px] w-[55%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <ImageWithFallback
                  src={heroSecondary}
                  alt="Fachada comercial"
                  loading="eager"
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
              </div>

              <div className="absolute bottom-16 right-0 h-[140px] w-[40%] overflow-hidden rounded-xl border border-white/10 shadow-xl">
                <ImageWithFallback
                  src={heroTertiary}
                  alt="Toldo comercial"
                  loading="eager"
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
              </div>

              <div className="absolute -left-4 top-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/80 p-4 backdrop-blur-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Equipe própria</p>
                  <p className="text-[11px] text-ink-400">Projeto à montagem</p>
                </div>
              </div>

              <div className="absolute -right-2 bottom-2 flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/80 px-4 py-2.5 backdrop-blur-xl">
                <span className="text-2xl font-extrabold text-ember-400">18+</span>
                <span className="text-xs font-medium text-ink-300">anos de<br />operação</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-ink-500 sm:flex">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em]">
            Role para explorar
          </span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-ink-600 p-1">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-ember-500" />
          </span>
        </div>
      </section>

      {/* DIFERENCIAIS / SOBRE TEASER */}
      <section className="container-wide py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Sobre a GAE Dynamics"
              title={
                <>
                  Engenharia e montagem com{' '}
                  <span className="text-ember-500">precisão industrial</span> e
                  visão de longo prazo.
                </>
              }
              description="Há mais de 18 anos atuamos com montagem e instalação de estruturas metálicas, fachadas, toldos, portões, móveis estilo industrial, refrigeração e muito mais."
            />
            <Reveal delay={200}>
              <button
                onClick={() => navigate({ name: 'about' })}
                className="btn-ghost mt-8"
              >
                Conhecer a empresa
                <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900 text-ember-400">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink-900">
                    {d.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                    {d.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-ink-100/60 py-20 sm:py-28">
        <div className="container-wide">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="O que fazemos"
              title="Serviços que cobrem toda a sua obra."
              description="Estruturas, fachadas, coberturas, toldos, portões, refrigeração e mais — tudo sob o mesmo controle de qualidade."
            />
            <Reveal delay={200}>
              <button
                onClick={() => navigate({ name: 'services' })}
                className="btn-ghost"
              >
                Ver todos os serviços
                <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <button
                  onClick={() =>
                    s.hasPage
                      ? navigate({ name: 'service', slug: s.slug })
                      : navigate({ name: 'contact' })
                  }
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_1px_0_rgba(0,0,0,0.02),0_12px_40px_-24px_rgba(10,13,18,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(10,13,18,0.3)]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <ImageWithFallback
                      src={s.heroImage}
                      alt={s.name}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold tracking-tight text-ink-900">
                      {s.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                      {s.tagline}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-ember-600">
                      {s.hasPage ? 'Explorar serviço' : 'Falar com a equipe'}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="container-wide py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Portfólio"
            title="Projetos recentes em destaque."
            description="Uma seleção dos trabalhos mais recentes. O catálogo completo tem mais de 100 obras entregues."
          />
          <Reveal delay={200}>
            <button
              onClick={() => setPortfolioOpen(true)}
              className="btn-dark"
            >
              Ver Portfólio Completo
              <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProjectCard project={p} onOpen={setLightbox} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 flex justify-center sm:hidden">
            <button onClick={() => setPortfolioOpen(true)} className="btn-dark">
              Ver Portfólio Completo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-ink-100/60 py-20 sm:py-28">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <div className="relative">
                <ImageWithFallback
                  src={aboutImg}
                  alt="Cobertura metálica termoacústica"
                  className="aspect-[4/3] w-full rounded-3xl"
                />
                <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-5 shadow-xl sm:block dark:bg-ink-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember-500 text-white">
                      <Quote className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-ink-900">18+</p>
                      <p className="text-xs text-ink-500">anos de experiência</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Depoimento"
                title="Cumprimento de prazo e excelência técnica em cada etapa."
              />
              <Reveal delay={200}>
                <blockquote className="mt-6 text-lg leading-relaxed text-ink-700">
                  &ldquo;A GAE entregou nosso galpão logístico em 38 dias,
                  exatamente como projetado. Estrutura impecável, montagem
                  limpa e zero retrabalho. Parceria que se repetiu em três
                  unidades.&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
                    RA
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-900">
                      Ricardo Almeida
                    </p>
                    <p className="text-xs text-ink-500">
                      Diretor de Operações · Logística ABC
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTABand />

      <PortfolioModal
        open={portfolioOpen}
        onClose={() => setPortfolioOpen(false)}
        initialCategory={'all' as ProjectCategory | 'all'}
      />
      <ProjectLightbox
        project={lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}
