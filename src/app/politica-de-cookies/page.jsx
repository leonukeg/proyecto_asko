import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '../legal.module.css';

export default function PoliticaCookies() {
  return (
    <main>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Política de Cookies</h1>
        <div className={styles.content}>
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2>1. ¿Qué son las cookies?</h2>
          <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>
          
          <h2>2. ¿Qué tipos de cookies utiliza esta página web?</h2>
          <ul>
            <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan. (Ej: identificar la sesión, acceder al carrito de compra, recordar elementos del pedido).</li>
            <li><strong>Cookies de análisis:</strong> Son aquellas que, bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</li>
            <li><strong>Cookies de terceros:</strong> La Web de ASKO puede utilizar servicios de terceros que recopilarán información con fines estadísticos y de analítica (por ejemplo, Google Analytics) o para procesar pagos de forma segura (Stripe).</li>
          </ul>

          <h2>3. Revocación y eliminación de cookies</h2>
          <p>Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador. Ten en cuenta que si bloqueas las cookies técnicas, es posible que no puedas realizar compras en nuestra tienda de forma correcta.</p>
          
          <ul>
            <li>Para más información sobre el navegador Chrome pulsa <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer">aquí</a>.</li>
            <li>Para más información sobre el navegador Firefox pulsa <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">aquí</a>.</li>
            <li>Para más información sobre el navegador Safari pulsa <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">aquí</a>.</li>
          </ul>

          <h2>4. Consentimiento</h2>
          <p>Al navegar y continuar en nuestra web nos indicas que estás consintiendo el uso de las cookies antes enunciadas, y en las condiciones contenidas en la presente Política de Cookies.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
