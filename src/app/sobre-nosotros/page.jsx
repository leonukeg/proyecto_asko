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
        <div className="global-title-wrapper" style={{ borderBottomColor: 'transparent' }}>
          <h1 className="global-page-title glitch" data-text="EL MANIFIESTO">EL MANIFIESTO</h1>
        </div>
        
        <div className={styles.manifesto}>
          <p className={styles.accent}>
            ASKO
          </p>
          <p>
            No hacemos camisetas. Creamos piezas para quienes nunca encajaron.
          </p>
          <p>
            <span className={styles.highlight}>ASKO</span> no está hecha para todos. Si buscas una camiseta bonita, probablemente estés en el sitio equivocado.
          </p>
          <p>
            Nace de la obsesión por el arte underground, la cultura alternativa y todo aquello que se sale del molde. Nos inspiran las portadas de discos, los garabatos en una pared, el caos de una ciudad, el humor incómodo, la estética punk, el rock, los cómics, los errores, los personajes extraños y esos pequeños momentos cotidianos que la mayoría pasa por alto.
          </p>
          <p>
            Aquí convertimos lo cotidiano en extraño, lo incómodo en arte y lo grotesco en identidad. Nos alimentamos del punk, del rock, del underground, de las portadas que marcaron generaciones, de la cultura callejera y de todas esas ideas que nunca encontrarías en un escaparate convencional.
          </p>

          <p className={styles.highlight}>
            Cada diseño es una declaración de intenciones
          </p>
          <p>
            Trabajamos con artistas que entienden que lo imperfecto tiene más personalidad que lo correcto, y que lo grotesco puede ser bello cuando tiene algo que decir. Cada ilustración nace para romper con lo correcto.
          </p>
          <p>
            <span className={styles.accent} style={{ fontSize: '1.5rem', marginTop: '10px' }}>Sin filtros. Sin normas. Sin pedir permiso.</span>
          </p>

          <p className={styles.highlight}>
            El producto
          </p>
          <p>
            Estampamos sobre algodón de calidad mediante impresión DTF de alta calidad, para que cada ilustración conserve toda su fuerza, color y detalle, y el arte sobreviva al tiempo.
          </p>
          <p>
            Porque una camiseta no debería ser un simple básico: debería hablar antes que tú. Puede durar años, pero una actitud dura toda la vida.
          </p>

          <p className={styles.highlight}>
            La web
          </p>
          <p>
            Nuestra web sigue la misma filosofía. No queremos que navegues por otra tienda online más, ni que simplemente compres.
          </p>
          <p>
            Queremos que entres, explores, descubras cada animación, cada detalle, cada interacción — y salgas con la sensación de haber estado en un lugar que no se parece a ningún otro.
          </p>

          <p className={styles.highlight}>
            Filosofía
          </p>
          <p>
            ASKO no busca gustarle a todo el mundo. Solo a quienes entienden que la personalidad nunca estuvo hecha para seguir normas.
          </p>
          <p>
            No seguimos tendencias. Las ignoramos.
          </p>

          <p className={styles.accent} style={{ marginTop: 'var(--spacing-2xl)' }}>
            ASKO. Arte para los que nunca necesitaron encajar.
          </p>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
