import { useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Layers3 } from 'lucide-react';
import { useRouter } from '../lib/router';
import { serviceBySlug, services } from '../data/content';
import { Reveal } from '../components/Reveal';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { QuoteForm } from '../components/QuoteForm';
import { ProjectGallery } from '../components/ProjectGallery';
import { CTABand } from '../components/CTABand';

interface ServicePageProps {
  slug: string;
}

export function ServicePage({ slug }: ServicePageProps) {
  const { navigate } = useRouter();
  const service = serviceBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!service || !service.hasPage) {
    return (
      <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center pt-28 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-ember-500">
          404
        </p>
        <h1 className="h-display mt-3 text-ink-900">Serviço não encontrado</h1>
        <p className="lead mt-4 max-w-md">
          O serviço que você procura não está disponível. Explore nossa lista
          completa.
        </p>
        <button onClick={() => navigate({ name: 'services' })} className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Ver todos os serviços
        </button>
      </div>
    );
  }

  const others = services.filter((s) => s.slug !== service.slug && s.hasPage).slice(0, 3);

  return (
    <div className="pt-28">
      {/* HERO */}
      <section className="container-wide pt-8">
        <Reveal>
          <button
            onClick={() => navigate({ name: 'services' })}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Todos os serviços
          </button>
        </Reveal>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <span className="eyebrow text-ink-500">
                <span className="inline-block h-px w-6 bg-ember-500" />
                Serviço · {service.shortName}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="h-display mt-4 text-ink-900">{service.name}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="lead mt-5 max-w-xl">{service.description}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate({ name: 'contact' })} className="btn-primary">
                  Solicitar Orçamento
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#orcamento" className="btn-ghost">
                  Formulário rápido
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-3xl">
              <ImageWithFallback
                src={service.heroImage}
                alt={service.name}
                className="aspect-[4/3] w-full"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
              <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                <service.icon className="h-7 w-7" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-wide py-16 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="card h-full p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 text-ember-500">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  {f.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LOCALIZED PORTFOLIO */}
      <section className="bg-ink-100/60 py-16 sm:py-20">
        <div className="container-wide">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="section-eyebrow">
                <span className="inline-block h-px w-6 bg-ember-500" />
                Portfólio localizado
              </span>
              <h2 className="h-section text-ink-900">
                {service.shortName} que já construímos.
              </h2>
              <p className="lead mt-3 max-w-xl">
                Apenas projetos desta categoria — exemplos reais entregues pela
                GAE Dynamics.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-600">
              <Layers3 className="h-4 w-4 text-ember-500" />
              Exclusivo · {service.shortName}
            </span>
          </div>
        </div>
        <div className="container-wide mt-10">
          <ProjectGallery
            category={service.slug}
            showHeading={false}
          />
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="orcamento" className="container-wide py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="section-eyebrow">
              <span className="inline-block h-px w-6 bg-ember-500" />
              Orçamento para {service.shortName}
            </span>
            <h2 className="h-section text-ink-900">
              Solicite uma proposta técnica para {service.name.toLowerCase()}.
            </h2>
            <p className="lead mt-4 max-w-md">
              Conte-nos sobre seu projeto. Nossa equipe retorna em até 1 dia
              útil com memorial preliminar, estimativa de prazo e investimento.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-600">
              {service.features.slice(0, 2).map((f) => (
                <li key={f.title} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-ember-500" />
                  {f.title} — {f.detail}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="card p-6 sm:p-8">
              <QuoteForm defaultService={service.name} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="container-wide pb-8">
        <span className="section-eyebrow">
          <span className="inline-block h-px w-6 bg-ember-500" />
          Outros serviços
        </span>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((s) => (
            <button
              key={s.slug}
              onClick={() => navigate({ name: 'service', slug: s.slug })}
              className="group flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-50 text-ink-700">
                <s.icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-ink-900">{s.name}</p>
                <p className="text-xs text-ink-500">{s.tagline}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-ember-500" />
            </button>
          ))}
        </div>
      </section>

      <CTABand />
    </div>
  );
}
