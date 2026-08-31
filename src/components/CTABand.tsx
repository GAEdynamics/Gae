import { ArrowRight } from 'lucide-react';
import { useRouter } from '../lib/router';
import { Reveal } from './Reveal';

interface CTABandProps {
  title?: string;
  description?: string;
}

export function CTABand({
  title = 'Pronto para construir com engenharia de alto padrão?',
  description = 'Solicite um orçamento técnico. Resposta em até 1 dia útil, com memorial preliminar e estimativa de prazo.',
}: CTABandProps) {
  const { navigate } = useRouter();
  return (
    <section className="container-wide py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-14 text-white sm:px-12 sm:py-16">
          <div className="absolute inset-0 -z-10 bg-grid-faint [background-size:42px_42px] opacity-40" />
          <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-ember-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-steel-500/20 blur-3xl" />

          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow text-ink-400">
                <span className="inline-block h-px w-6 bg-ember-500" />
                Próximo passo
              </span>
              <h2 className="h-section mt-4 text-white">{title}</h2>
              <p className="lead mt-4 text-ink-300">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate({ name: 'contact' })} className="btn-primary">
                Solicitar Orçamento
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate({ name: 'portfolio' })}
                className="btn-ghost border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Ver Portfólio
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
