import { useMemo, useState } from 'react';
import { projects, type Project, type ProjectCategory } from '../data/content';
import { ProjectCard } from './ProjectCard';
import { ProjectLightbox } from './ProjectLightbox';
import { Reveal } from './Reveal';

interface ProjectGalleryProps {
  category?: ProjectCategory;
  title?: string;
  eyebrow?: string;
  description?: string;
  limit?: number;
  showHeading?: boolean;
}

export function ProjectGallery({
  category,
  title = 'Portfólio relacionado',
  eyebrow = 'Projetos entregues',
  description,
  limit,
  showHeading = true,
}: ProjectGalleryProps) {
  const [active, setActive] = useState<Project | null>(null);

  const list = useMemo(() => {
    const base = category
      ? projects.filter((p) => p.category === category)
      : projects;
    return limit ? base.slice(0, limit) : base;
  }, [category, limit]);

  const step = (dir: 1 | -1) => {
    const idx = active ? list.findIndex((p) => p.id === active.id) : -1;
    if (idx < 0) return;
    setActive(list[(idx + dir + list.length) % list.length]);
  };

  if (list.length === 0) return null;

  return (
    <section className="container-wide py-16 sm:py-20">
      {showHeading && (
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="section-eyebrow">
              <span className="inline-block h-px w-6 bg-ember-500" />
              {eyebrow}
            </span>
            <h2 className="h-section text-ink-900">{title}</h2>
            {description && <p className="lead mt-3 max-w-xl">{description}</p>}
          </div>
          <span className="text-sm font-semibold text-ink-400">
            {list.length} projetos
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 60, 300)}>
            <ProjectCard project={p} onOpen={setActive} index={i} />
          </Reveal>
        ))}
      </div>

      <ProjectLightbox
        project={active}
        onClose={() => setActive(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </section>
  );
}
