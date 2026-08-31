import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { services, contactInfo } from '../data/content';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { QuoteForm } from '../components/QuoteForm';

const channels = [
  { icon: Phone, label: 'Telefone', value: contactInfo.phoneDisplay, href: `tel:+55${contactInfo.phone}` },
  { icon: MessageSquare, label: 'WhatsApp', value: contactInfo.phoneDisplay, href: contactInfo.whatsapp },
  { icon: Mail, label: 'E-mail', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: MapPin, label: 'Endereço', value: contactInfo.address, href: undefined },
];

export function ContactPage() {
  return (
    <div className="pt-28">
      <section className="container-wide pt-8">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos construir juntos."
          description="Preencha o formulário com os dados do seu projeto. Nossa equipe de engenharia retorna em até 1 dia útil com uma proposta técnica preliminar."
        />
      </section>

      <section className="container-wide py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col gap-4">
              {channels.map((c) => {
                const inner = (
                  <div className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-900 text-ember-400">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                        {c.label}
                      </p>
                      <p className="text-sm font-semibold text-ink-900">
                        {c.value}
                      </p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}

              <div className="card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Serviços
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <span
                      key={s.slug}
                      className="rounded-full border border-ink-200 px-3 py-1 text-xs font-medium text-ink-600"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card p-6 sm:p-8">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
