import { Target, Eye, Award, ShieldCheck, Factory, Ruler, Users, Clock } from 'lucide-react';
import { useRouter } from '../lib/router';
import { stats } from '../data/content';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { CTABand } from '../components/CTABand';

const GH_BASE =
  'https://raw.githubusercontent.com/GAEdynamics/porfolio-gaedynamics/main/portfolio/';
const gh = (f: string) => GH_BASE + encodeURIComponent(f);

const studioImg = gh('estrutura-fase-de-montagem-estrutura-galpo.webp');
const fieldImg = gh('fachada-magrass.webp');

const values = [
  { icon: Target, title: 'Missão', text: 'Entregar soluções em estruturas metálicas, fachadas e serviços correlatos com qualidade, prazo e segurança, superando a expectativa do cliente em cada obra.' },
  { icon: Eye, title: 'Visão', text: 'Ser referência em engenharia e montagem, reconhecida pela diversidade de serviços, precisão técnica e relacionamento duradouro com os clientes.' },
  { icon: Award, title: 'Valores', text: 'Compromisso com o prazo, segurança em primeiro lugar, transparência em todo o processo e qualidade do detalhe ao conjunto.' },
];

const highlights = [
  { icon: Factory, title: 'Fabricação própria', detail: 'Oficina com corte, dobra e solda qualificada' },
  { icon: Users, title: 'Equipe própria', detail: 'Engenheiros, soldadores e montadores' },
  { icon: Ruler, title: 'Precisão técnica', detail: 'Detalhamento e peças numeradas' },
  { icon: ShieldCheck, title: 'Segurança', detail: 'NR-35 e protocolos de obra' },
  { icon: Clock, title: 'Prazo cumprido', detail: 'Cronograma respeitado em cada entrega' },
  { icon: Award, title: 'Acabamento premium', detail: 'Pintura industrial e detalhes arquitetônicos' },
];

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="pt-28">
      <section className="container-wide pt-8">
        <SectionHeading
          eyebrow="Sobre Nós"
          title="18+ anos transformando espaços e impulsionando negócios."
          description="A GAE Dynamics atua com montagem e instalação de estruturas metálicas, fachadas, toldos, escadas, portões, móveis estilo industrial, serviços de alvenaria, refrigeração, etc. Tudo com projeto, fabricação e montagem próprios."
        />
      </section>

      {/* Stats band */}
      <section className="container-wide py-10">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-6">
              <p className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-ink-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Studio + field */}
      <section className="container-wide py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl">
              <ImageWithFallback
                src={studioImg}
                alt="Montagem de estrutura metálica"
                className="aspect-[4/3] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Montagem
                </p>
                <p className="text-lg font-bold">Estruturas em obra</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-3xl">
              <ImageWithFallback
                src={fieldImg}
                alt="Fachada comercial entregue"
                className="aspect-[4/3] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Execução
                </p>
                <p className="text-lg font-bold">Fachadas e acabamentos</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container-wide py-12 sm:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <div className="card h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-ember-400">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-ink-100/60 py-16 sm:py-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Diferenciais"
            title="O que nos torna uma parceira completa."
            description="Da estrutura principal ao detalhe de serralheria — tudo sob o mesmo controle de qualidade, equipe e cronograma."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel-50 text-steel-600">
                    <h.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{h.title}</p>
                    <p className="text-xs text-ink-500">{h.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Vamos conversar sobre o seu projeto?"
        description="Conte-nos sua necessidade. Retornamos com uma proposta técnica preliminar em até 1 dia útil."
      />
    </div>
  );
}
