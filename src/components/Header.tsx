import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight, Moon, Sun } from 'lucide-react';
import { useRouter, type Route } from '../lib/router';
import { useTheme } from '../lib/theme';
import { Logo } from './Logo';

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white/70 text-ink-800 transition hover:border-ember-300 hover:text-ember-600 dark:bg-ink-100/60"
      aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
    >
      <Sun className={`h-[18px] w-[18px] transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
      <Moon className={`absolute h-[18px] w-[18px] transition-all duration-300 ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
    </button>
  );
}

const navLinks: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Serviços', route: { name: 'services' } },
  { label: 'Portfólio', route: { name: 'portfolio' } },
  { label: 'Sobre Nós', route: { name: 'about' } },
  { label: 'Contato', route: { name: 'contact' } },
];

function routeKey(route: Route): string {
  if (route.name === 'service') return `service:${route.slug}`;
  return route.name;
}

export function Header() {
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.route.name === 'home') return route.name === 'home';
    return route.name === link.route.name;
  };

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-3 z-50 px-4 sm:top-5',
          'transition-all duration-500 ease-out-expo',
        ].join(' ')}
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <nav
            className={[
              'flex items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6',
              'transition-all duration-500 ease-out-expo',
              scrolled
                ? 'glass shadow-[0_12px_40px_-20px_rgba(10,13,18,0.4)]'
                : 'border border-transparent bg-white/40 backdrop-blur-md dark:bg-ink-950/40',
            ].join(' ')}
          >
            <button
              onClick={() => navigate({ name: 'home' })}
              className="group flex items-center"
              aria-label="GAE Dynamics — início"
            >
              <Logo className="h-8" />
            </button>

            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.route)}
                  className={[
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    isActive(link)
                      ? 'text-ink-900'
                      : 'text-ink-500 hover:text-ink-900',
                  ].join(' ')}
                >
                  {isActive(link) && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-ink-100/80" />
                  )}
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate({ name: 'contact' })}
                className="btn-primary hidden md:inline-flex"
              >
                Solicitar Orçamento
                <ArrowRight className="h-4 w-4" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white/70 text-ink-800 transition hover:bg-white lg:hidden dark:bg-ink-100/60"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-[70] lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        <div
          onClick={() => setOpen(false)}
          className={[
            'absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
        <div
          className={[
            'absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-500 ease-out-expo dark:bg-ink-100',
            open ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between">
            <Logo className="h-8" />
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.route);
                  setOpen(false);
                }}
                className={[
                  'flex items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-semibold transition',
                  isActive(link)
                    ? 'bg-ink-50 text-ink-900'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                ].join(' ')}
              >
                {link.label}
                <ArrowRight className="h-4 w-4 opacity-40" />
              </button>
            ))}
          </div>
          <div className="mt-auto">
            <button
              onClick={() => {
                navigate({ name: 'contact' });
                setOpen(false);
              }}
              className="btn-primary w-full"
            >
              Solicitar Orçamento
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
