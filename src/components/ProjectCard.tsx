import { ArrowUpRight } from 'lucide-react';
import { useRouter } from '../lib/router';
import { services, type Project } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';

interface ProjectCardProps {
  project: Project;
  onOpen?: (p: Project) => void;
  index?: number;
}

export function ProjectCard({ project, onOpen, index = 0 }: ProjectCardProps) {
  const { navigate } = useRouter();
  const service = services.find((s) => s.slug === project.category);

  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-ink-900"
      onClick={() => (onOpen ? onOpen(project) : undefined)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <ImageWithFallback
        src={project.image}
        alt={project.title}
        className="aspect-[4/5] w-full"
        imgClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
            {service?.shortName ?? 'Outros'}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight">
          {project.title}
        </h3>
      </div>

      {project.featured && (
        <span className="absolute right-4 top-4 rounded-full bg-ember-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg">
          Destaque
        </span>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (service) navigate({ name: 'service', slug: service.slug });
        }}
        className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 hover:bg-white/20 group-hover:opacity-100"
        aria-label={`Ver projetos de ${service?.shortName ?? 'outros'}`}
      >
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </article>
  );
}
