import { useEffect, useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { useRouter } from '../lib/router';
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from '../data/content';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectLightbox } from '../components/ProjectLightbox';
import { CTABand } from '../components/CTABand';

export function PortfolioPage() {
  const { navigate } = useRouter();
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [active, setActive] = useState<Project | null>(null);

  const filtered =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  const activeIndex = active
    ? filtered.findIndex((p) => p.id === active.id)
    : -1;
  const step = (dir: 1 | -1) => {
    if (activeIndex < 0) return;
    setActive(filtered[(activeIndex + dir + filtered.length) % filtered.length]);
  };

  return (
    <div className="pt-28">
      <section className="container-wide pt-8">
        <SectionHeading
          eyebrow="Portfólio"
          title="Mais de 50 estruturas metálicas entregues."
          description="Filtre por categoria e clique em qualquer projeto para visualizar a galeria completa."
        />
      </section>

      <section className="container-wide py-10">
        <div className="sticky top-24 z-30 -mx-1 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-ink-100 bg-white/80 p-2 backdrop-blur-md [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <span className="flex items-center gap-1.5 px-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
              <Filter className="h-3.5 w-3.5" /> Filtrar
            </span>
            {projectFilters.map((f) => {
              const count =
                f.key === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category === f.key).length;
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={[
                    'inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                    isActive
                      ? 'bg-ink-900 text-white'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                  ].join(' ')}
                >
                  {f.label}
                  <span
                    className={[
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                      isActive ? 'bg-white/15 text-white/80' : 'bg-ink-100 text-ink-500',
                    ].join(' ')}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          key={filter}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className="animate-fade-up"
              style={{
                animationDelay: `${Math.min(i * 50, 400)}ms`,
                animationFillMode: 'both',
              }}
            >
              <ProjectCard project={p} onOpen={setActive} index={i} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-sm text-ink-500">
              Nenhum projeto nesta categoria ainda.
            </p>
          </div>
        )}
      </section>

      <CTABand
        title="Tem um projeto em mente?"
        description="Conte-nos sua necessidade. Retornamos com uma proposta técnica preliminar em até 1 dia útil."
      />

      <ProjectLightbox
        project={active}
        onClose={() => setActive(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}
