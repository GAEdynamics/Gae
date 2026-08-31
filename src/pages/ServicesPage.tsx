import { ArrowRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { useRouter } from '../lib/router';
import { services, stats } from '../data/content';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CTABand } from '../components/CTABand';

export function ServicesPage() {
  const { navigate } = useRouter();
  const pageServices = services.filter((s) => s.hasPage);
  const outros = services.find((s) => s.slug === 'outros');

  return (
    <div className="pt-28">
      <section className="container-wide pt-12">
        <SectionHeading
          eyebrow="Serviços"
          title="Tudo o que sua obra precisa, em um único time."
          description="Estruturas metálicas, fachadas, coberturas, toldos, portões, refrigeração e mais. Projeto, fabricação e montagem sob o mesmo controle de qualidade."
        />
      </section>

      <section className="container-wide py-14">
        <div className="flex flex-col gap-6">
          {pageServices.map((s, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={s.slug} delay={i * 60}>
                <article className="card group grid overflow-hidden md:grid-cols-2">
                  <div
                    className={[
                      'relative h-64 overflow-hidden md:h-auto',
                      reversed ? 'md:order-2' : '',
                    ].join(' ')}
                  >
                    <ImageWithFallback
                      src={s.heroImage}
                      alt={s.name}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                      <s.icon className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="flex flex-col p-7 sm:p-9">
                    <span className="eyebrow text-ink-500">
                      0{i + 1} · Serviço
                    </span>
                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                      {s.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {s.description}
                    </p>

                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {s.features.slice(0, 4).map((f) => (
                        <li
                          key={f.title}
                          className="flex items-start gap-2 text-sm text-ink-700"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" />
                          {f.title}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate({ name: 'service', slug: s.slug })}
                        className="btn-primary"
                      >
                        Ver detalhes
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigate({ name: 'contact' })}
                        className="btn-ghost"
                      >
                        Orçamento
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* OUTROS SERVIÇOS — special card */}
      {outros && (
        <section className="container-wide pb-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
              <div className="absolute inset-0 -z-10 bg-grid-faint [background-size:42px_42px] opacity-30" />
              <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-ember-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-steel-500/20 blur-3xl" />

              <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-ember-400 backdrop-blur-md">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h2 className="h-section mt-5 text-white">{outros.name}</h2>
                  <p className="lead mt-4 text-ink-300">{outros.description}</p>
                </div>
                <button
                  onClick={() => navigate({ name: 'contact' })}
                  className="btn-primary shrink-0"
                >
                  Falar com a Equipe
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Stats */}
      <section className="bg-ink-950 py-16 text-white">
        <div className="container-wide grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink-900/40 p-6">
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </div>
  );
}
