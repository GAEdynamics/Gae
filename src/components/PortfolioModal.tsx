import { useEffect, useMemo, useState } from 'react';
import { LayoutGrid, X } from 'lucide-react';
import {
  projects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from '../data/content';
import { ProjectCard } from './ProjectCard';
import { ProjectLightbox } from './ProjectLightbox';

interface PortfolioModalProps {
  open: boolean;
  onClose: () => void;
  initialCategory?: ProjectCategory | 'all';
}

export function PortfolioModal({
  open,
  onClose,
  initialCategory = 'all',
}: PortfolioModalProps) {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>(initialCategory);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (open) setFilter(initialCategory);
  }, [open, initialCategory]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !active) onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, active, onClose]);

  const filtered = useMemo(() => {
    const list =
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter);
    return list;
  }, [filter]);

  const activeIndex = active
    ? filtered.findIndex((p) => p.id === active.id)
    : -1;

  const step = (dir: 1 | -1) => {
    if (activeIndex < 0) return;
    const next = (activeIndex + dir + filtered.length) % filtered.length;
    setActive(filtered[next]);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col">
      <div className="absolute inset-0 bg-ink-50/95 backdrop-blur-xl animate-fade-in" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Top bar */}
        <div className="border-b border-ink-200/70 bg-white/60 backdrop-blur-md">
          <div className="container-wide flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-white">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-tight text-ink-900">
                  Portfólio completo
                </h2>
                <p className="text-xs text-ink-500">
                  {filtered.length} projetos · filtragem dinâmica
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="group flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-ember-300 hover:bg-ember-50 hover:text-ember-700"
              aria-label="Fechar portfólio"
            >
              Fechar
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-white transition group-hover:bg-ember-500">
                <X className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-ink-200/70 bg-white/40">
          <div className="container-wide flex items-center gap-2 overflow-x-auto py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
                    'group inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                    isActive
                      ? 'bg-ink-900 text-white shadow-[0_8px_20px_-10px_rgba(10,13,18,0.6)]'
                      : 'bg-white text-ink-600 border border-ink-200 hover:border-ink-300 hover:text-ink-900',
                  ].join(' ')}
                >
                  {f.label}
                  <span
                    className={[
                      'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums transition',
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

        {/* Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="container-wide py-8">
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
          </div>
        </div>
      </div>

      <ProjectLightbox
        project={active}
        onClose={() => setActive(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}
