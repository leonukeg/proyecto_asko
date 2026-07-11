import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/ui/ProductGrid';
import { PrintfulService } from '@/lib/services/PrintfulService';
import styles from './page.module.css';

export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: 'ASKO | DROPS y Catálogo',
  description: 'Explora todos los lanzamientos de ASKO. Ropa urbana y tshirts de diseño independiente.',
};

export default async function DropsPage() {
  const printful = new PrintfulService();
  let products = [];
  let error = null;

  try {
    const data = await printful.getProducts();
    products = data || [];
  } catch (err) {
    console.error("Error cargando drops:", err);
    error = "No pudimos conectar con el arsenal. Intenta de nuevo más tarde.";
  }

  return (
    <main className={styles.main}>
      <Header />
      
      <section className={`container ${styles.section}`}>
        <div className="global-title-wrapper">
          <h1 className="global-page-title glitch" data-text="NUESTRO ARSENAL">NUESTRO ARSENAL</h1>
          <p className={styles.description}>Sin reglas. Sin filtros. Solo diseño puro.</p>
        </div>

        {error ? (
          <div className={styles.errorState}>
            <h3>Error de conexión</h3>
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
