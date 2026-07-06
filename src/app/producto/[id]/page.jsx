import { PrintfulService } from '@/lib/services/PrintfulService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './ProductPage.module.css';

// Client component wrapper for the interactive parts (Size selector, Add to Cart)
import ProductInteractiveControls from './ProductInteractiveControls';

// Forzamos que se regenere si cambia en Printful cada 1 hora
export const revalidate = 3600;

export default async function ProductPage({ params }) {
  // En Next.js 15+, 'params' es una Promesa y debe ser esperada (await)
  const { id } = await params;
  
  // Instanciamos el servicio y buscamos la camiseta
  const printful = new PrintfulService();
  let productData = null;
  let error = null;

  try {
    productData = await printful.getProduct(id);
  } catch (e) {
    error = e.message;
  }

  if (error || !productData) {
    return (
      <main className={styles.pageContainer}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className={styles.title} data-text="ERROR 404">ERROR 404</h1>
          <p>La prenda que buscas ha sido destruida o nunca existió.</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Desestructuramos los datos que nos manda Printful
  const { sync_product, sync_variants } = productData;
  
  // Extraemos un precio base (de la primera variante)
  const basePrice = sync_variants?.[0]?.retail_price || '30.00';

  return (
    <main className={styles.pageContainer}>
      <Header />
      
      {/* MARQUEE GIGANTE DE FONDO */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeText}>
          ASKO NO RULES // ARTE QUE VISTE // ASKO NO RULES // ARTE QUE VISTE //
        </div>
      </div>

      <section className={styles.productWrapper}>
        
        {/* COLUMNA IZQUIERDA: IMAGEN CON GLITCH Y MÁSCARA */}
        <div className={styles.imageColumn}>
          <div className={styles.glitchImageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={sync_product.thumbnail_url || 'https://via.placeholder.com/600x800'} 
              alt={sync_product.name} 
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: INFO Y CONTROLES INTERACTIVOS */}
        <div className={styles.infoColumn}>
          <h1 className={styles.title} data-text={sync_product.name.toUpperCase()}>
            {sync_product.name.toUpperCase()}
          </h1>
          
          <div className={styles.price}>
            ${basePrice}
          </div>

          {/* Componente de cliente para elegir talla y comprar */}
          <ProductInteractiveControls 
            product={sync_product} 
            variants={sync_variants} 
          />
          
        </div>

      </section>

      <Footer />
    </main>
  );
}
