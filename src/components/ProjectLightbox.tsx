import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { projects, services, type Project } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function ProjectLightbox({
  project,
  onClose,
  onPrev,
  onNext,
}: ProjectLightboxProps) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (project) setAnimKey((k) => k + 1);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const service = services.find((s) => s.slug === project.category);
  const idx = projects.findIndex((p) => p.id === project.id);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md animate-fade-in" />

      <div
        key={animKey}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-4xl animate-scale-in overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-ink-100"
      >
        <div className="relative bg-ink-900">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            loading="eager"
            className="h-[50vh] w-full md:h-[60vh]"
            imgClassName="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />

          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-ink-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-600 dark:bg-ink-200">
              {service?.shortName ?? 'Outros'}
            </span>
            <h3 className="text-xl font-extrabold tracking-tight text-ink-900">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition hover:bg-ink-50"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 pb-6 text-xs text-ink-400">
          <span>Projeto {String(idx + 1).padStart(2, '0')}</span>
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-ink-300" />
          <span>de {projects.length}</span>
        </div>
      </div>
    </div>
  );
}
