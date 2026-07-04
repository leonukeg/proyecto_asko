import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '../legal.module.css';

export default function PoliticaPrivacidad() {
  return (
    <main>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Política de Privacidad</h1>
        <div className={styles.content}>
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2>1. Información al usuario</h2>
          <p>ASKO (en adelante, el RESPONSABLE) es el Responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR) y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD).</p>
          
          <h2>2. Finalidad del tratamiento</h2>
          <p>Mantener una relación comercial con el Usuario. Las operaciones previstas para realizar el tratamiento son:</p>
          <ul>
            <li>Tramitar encargos, solicitudes o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto.</li>
            <li>Remisión de comunicaciones comerciales publicitarias por email, fax, SMS, MMS, comunidades sociales o cualquier otro medio electrónico o físico.</li>
          </ul>

          <h2>3. Criterios de conservación de los datos</h2>
          <p>Se conservarán mientras exista un interés mutuo para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.</p>
          
          <h2>4. Comunicación de los datos</h2>
          <p>No se comunicarán los datos a terceros, salvo obligación legal. Sin embargo, para la correcta gestión de los pedidos, los datos necesarios serán compartidos con nuestros proveedores logísticos y de producción (ej. Printful, pasarelas de pago como Stripe).</p>
          
          <h2>5. Derechos que asisten al Usuario</h2>
          <ul>
            <li>Derecho a retirar el consentimiento en cualquier momento.</li>
            <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición al su tratamiento.</li>
            <li>Derecho a presentar una reclamación ante la autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}
