import { ArrowRight, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useRouter, type Route } from '../lib/router';
import { services, contactInfo } from '../data/content';
import { Logo } from './Logo';

const link = (label: string, route: Route) => ({ label, route });

const navCol: { title: string; items: { label: string; route: Route }[] }[] = [
  {
    title: 'Empresa',
    items: [
      link('Home', { name: 'home' }),
      link('Serviços', { name: 'services' }),
      link('Portfólio', { name: 'portfolio' }),
      link('Sobre Nós', { name: 'about' }),
      link('Contato', { name: 'contact' }),
    ],
  },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink-950 text-ink-200">
      <div className="absolute inset-0 -z-10 bg-grid-faint [background-size:48px_48px] opacity-50" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-ember-500/40 to-transparent" />

      <div className="container-wide py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="light" className="h-9" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
              Estruturas metálicas, fachadas, toldos, portões, coberturas,
              refrigeração e muito mais. Soluções completas com projeto,
              fabricação e montagem próprios.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {services.map((s) =>
                s.hasPage ? (
                  <button
                    key={s.slug}
                    onClick={() => navigate({ name: 'service', slug: s.slug })}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-300 transition hover:border-white/25 hover:text-white"
                  >
                    {s.shortName}
                  </button>
                ) : (
                  <button
                    key={s.slug}
                    onClick={() => navigate({ name: 'contact' })}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-300 transition hover:border-white/25 hover:text-white"
                  >
                    {s.shortName}
                  </button>
                ),
              )}
            </div>
          </div>

          {navCol.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-400">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.route)}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-300 transition hover:text-white"
                    >
                      <span className="link-underline">{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-400">
              Serviços
            </h4>
            <ul className="mt-5 space-y-3">
              {services.map((s) =>
                s.hasPage ? (
                  <li key={s.slug}>
                    <button
                      onClick={() => navigate({ name: 'service', slug: s.slug })}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-300 transition hover:text-white"
                    >
                      <span className="link-underline">{s.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </button>
                  </li>
                ) : (
                  <li key={s.slug}>
                    <button
                      onClick={() => navigate({ name: 'contact' })}
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-300 transition hover:text-white"
                    >
                      <span className="link-underline">{s.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-400">
              Contato
            </h4>
            <ul className="mt-5 space-y-4 text-sm text-ink-300">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember-400" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-ember-400" />
                <a href={`tel:+55${contactInfo.phone}`} className="link-underline">
                  {contactInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 shrink-0 text-ember-400" />
                <a href={contactInfo.whatsapp} className="link-underline">
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-ember-400" />
                <a href={`mailto:${contactInfo.email}`} className="link-underline">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
            <button
              onClick={() => navigate({ name: 'contact' })}
              className="btn-primary mt-6"
            >
              Solicitar Orçamento
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} GAE Dynamics. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember-500" />
            Equipe própria · Projeto, fabricação e montagem
          </p>
        </div>
      </div>
    </footer>
  );
}
