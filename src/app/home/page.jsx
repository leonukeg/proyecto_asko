import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ProductGrid from '@/components/ui/ProductGrid';
import { PrintfulService } from '@/lib/services/PrintfulService';
import styles from './page.module.css';

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'ASKO | Ropa Urbana y Tshirts con Alma Propia',
  description: 'Descubre diseños originales de artistas independientes que rompen moldes. ASKO es ropa urbana, streetwear y diseño brutalista sin reglas.',
  keywords: 'ropa urbana, streetwear, tshirts originales, arte independiente, diseño brutalista, moda punk, ASKO',
  openGraph: {
    title: 'ASKO | Arte que Viste',
    description: 'Tshirts con actitud. Diseños originales que rompen moldes.',
    url: 'https://asko-store.vercel.app',
    siteName: 'ASKO',
    images: [
      {
        url: '/logo.png', // Fallback to logo or you can use a real poster image
        width: 800,
        height: 600,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASKO | Arte que Viste',
    description: 'Ropa urbana y streetwear sin reglas.',
    images: ['/logo.png'],
  },
};

export default async function Home() {
  const printful = new PrintfulService();
  let products = [];
  let error = null;

  try {
    const data = await printful.getProducts();
    products = data || [];
  } catch (err) {
    console.error("Error cargando productos en el servidor:", err);
    error = "No pudimos conectar con el taller. Los artistas están descansando.";
  }

  // Schema.org JSON-LD for Organization & Website
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ASKO',
    url: 'https://asko-store.vercel.app',
    description: 'Ropa urbana, streetwear y diseño brutalista sin reglas.',
    publisher: {
      '@type': 'Organization',
      name: 'ASKO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://asko-store.vercel.app/logo.png'
      }
    }
  };

  return (
    <main className={styles.main}>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />
      <Hero />
      
      <section id="colecciones" className={`container ${styles.section}`}>
        {error ? (
          <div className={styles.errorState}>
            <h3>Error al cargar las colecciones</h3>
            <p>{error}</p>
          </div>
        ) : (
          <ProductGrid initialProducts={products} />
        )}
      </section>
      
      <Footer />
    </main>
  );
}
