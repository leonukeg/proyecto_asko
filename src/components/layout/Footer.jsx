import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="ASKO Logo" className={styles.logoImage} />
            <p className={styles.tagline}>ARTE QUE VISTE.<br />ACTITUD QUE HABLA.</p>
          </div>
          
          <div className={styles.linksGroup}>
            <h4 className={styles.linkTitle}>Info Legal</h4>
            <Link href="/politica-de-privacidad" className={styles.link}>Política de Privacidad</Link>
            <Link href="/terminos-y-condiciones" className={styles.link}>Términos y Condiciones</Link>
            <Link href="/politica-de-cookies" className={styles.link}>Política de Cookies</Link>
          </div>
          
          <div className={styles.linksGroup}>
            <h4 className={styles.linkTitle}>Soporte</h4>
            <a href="#" className={styles.link}>Envíos y Devoluciones</a>
            <a href="#" className={styles.link}>Preguntas Frecuentes</a>
            <a href="#" className={styles.link}>Contacto</a>
          </div>
        </div>
        
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} ASKO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
