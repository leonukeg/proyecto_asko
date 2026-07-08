import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'El Manifiesto | ASKO',
  description: 'Conoce la historia detrás de ASKO. Arte independiente, cero copias, estética punk y ropa urbana sin reglas.',
};

export default function SobreNosotros() {
  return (
    <main className={styles.main}>
      <Header />
      
      <section className={styles.content}>
        <h1 className={`${styles.title} glitch`} data-text="EL MANIFIESTO">EL MANIFIESTO</h1>
        
        <div className={styles.manifesto}>
          <p>
            <span className={styles.highlight}>ASKO</span> no nació para encajar en escaparates limpios ni para seguir las reglas de la moda rápida. 
            Nació del ruido de la calle, de la cultura underground y de la necesidad de llevar encima arte que grite en lugar de susurrar.
          </p>
          
          <p>
            En un mundo saturado de copias y diseños genéricos generados en masa, nosotros apostamos por lo brutalista. 
            Cada pieza de nuestro catálogo es una declaración de intenciones. No hacemos uniformes; hacemos <span className={styles.highlight}>Arte que Viste</span>.
          </p>
          
          <p>
            <span className={styles.accent}>CERO COPIAS. 100% ACTITUD.</span>
          </p>

          <p>
            Trabajamos bajo demanda porque rechazamos la sobreproducción y el desperdicio industrial. 
            Tú eliges el diseño que te representa, y nosotros lo materializamos con la máxima calidad exclusivamente para ti.
          </p>
          
          <p>
            Si buscas básicos aburridos, estás en el lugar equivocado. 
            Si buscas expresar lo que eres sin pedir permiso... bienvenido al equipo.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
