import { RouterProvider, useRouter } from './lib/router';
import { ThemeProvider } from './lib/theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServicePage } from './pages/ServicePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function Routes() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'services':
      return <ServicesPage />;
    case 'service':
      return <ServicePage slug={route.slug} />;
    case 'portfolio':
      return <PortfolioPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <ScrollProgress />
        <Header />
        <main className="relative">
          <Routes />
        </main>
        <Footer />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;
