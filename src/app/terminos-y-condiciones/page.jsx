import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '../legal.module.css';

export default function TerminosCondiciones() {
  return (
    <main>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Términos y Condiciones</h1>
        <div className={styles.content}>
          <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
          
          <h2>1. Objeto</h2>
          <p>Las presentes Condiciones Generales tienen por objeto regular las condiciones de uso de la web ASKO, así como las condiciones de compra de productos a través de la misma por parte de los usuarios.</p>
          
          <h2>2. Productos y Servicios</h2>
          <p>Los productos ofertados en esta web son diseños exclusivos impresos bajo demanda a través de nuestro proveedor Printful. Las características y precios de los productos se indican en pantalla. Los precios incluyen los impuestos aplicables (IVA).</p>

          <h2>3. Proceso de Compra</h2>
          <p>Para realizar una compra, el usuario deberá añadir los productos deseados al carrito y seguir los pasos indicados. El pago se realizará de forma segura a través de la pasarela de pagos Stripe.</p>
          
          <h2>4. Envíos y Entregas</h2>
          <p>Dado que nuestros productos se imprimen bajo demanda, el tiempo de preparación suele ser de 2 a 5 días hábiles. El tiempo de envío dependerá de la ubicación del usuario y será calculado en la pantalla de pago. ASKO no se hace responsable de los retrasos ocasionados por la empresa de mensajería o aduanas.</p>
          
          <h2>5. Política de Devoluciones y Desistimiento</h2>
          <p>Al tratarse de productos impresos bajo demanda específicamente para cada pedido, de acuerdo con el art. 103 de la Ley 3/2014, de 27 de marzo, no se aceptan devoluciones por &quot;arrepentimiento&quot; o error de talla. Únicamente se aceptarán reclamaciones si el producto llega dañado o existe un defecto de fabricación, en cuyo caso deberá notificarse en un plazo máximo de 14 días desde la recepción.</p>
          
          <h2>6. Ley Aplicable y Jurisdicción</h2>
          <p>Estas condiciones se regirán e interpretarán conforme a la legislación española. Para la resolución de cualquier controversia las partes se someten a los juzgados y tribunales del domicilio del consumidor.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
