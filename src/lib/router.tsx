import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'services' }
  | { name: 'portfolio' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'service'; slug: string };

interface RouterState {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterState | null>(null);

const parseHash = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash) return { name: 'home' };
  const [seg, slug] = hash.split('/');
  switch (seg) {
    case 'servicos':
      return { name: 'services' };
    case 'portfolio':
      return { name: 'portfolio' };
    case 'sobre':
      return { name: 'about' };
    case 'contato':
      return { name: 'contact' };
    case 'servico':
      return slug ? { name: 'service', slug } : { name: 'services' };
    default:
      return { name: 'home' };
  }
};

const routeToHash = (route: Route): string => {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'services':
      return '#/servicos';
    case 'portfolio':
      return '#/portfolio';
    case 'about':
      return '#/sobre';
    case 'contact':
      return '#/contato';
    case 'service':
      return `#/servico/${route.slug}`;
  }
};

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? { name: 'home' } : parseHash()
  );

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next: Route) => {
    const hash = routeToHash(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setRoute(next);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
