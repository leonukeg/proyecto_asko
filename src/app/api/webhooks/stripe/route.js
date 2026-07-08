import { NextResponse } from 'next/server';
import { StripeService } from '@/lib/services/StripeService';
import { PrintfulService } from '@/lib/services/PrintfulService';

const stripeService = new StripeService();
const printfulService = new PrintfulService();

// Necesitamos leer el body como texto sin procesar (raw) para que Stripe pueda verificar la firma
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  
  let event;

  try {
    // 1. Verificamos que la llamada realmente viene de Stripe (Seguridad)
    // Para que esto funcione, necesitas STRIPE_WEBHOOK_SECRET en tu .env
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 2. Manejamos el evento cuando el pago es exitoso
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log("Pago exitoso recibido de Stripe para la sesión:", session.id);

    try {
      // Extraemos la información del cliente desde la sesión de Stripe
      const customerEmail = session.customer_details.email;
      const shippingDetails = session.shipping_details;
      
      // TODO: Retrieve products from session metadata or line_items
      // Asumiremos que mandamos el printful_variant_id y la cantidad en la metadata
      
      // 3. Preparamos los datos para enviar la orden a Printful
      const orderData = {
        external_id: session.id, // Para enlazar la orden de Printful con Stripe
        recipient: {
          name: shippingDetails.name,
          address1: shippingDetails.address.line1,
          address2: shippingDetails.address.line2,
          city: shippingDetails.address.city,
          state_code: shippingDetails.address.state,
          country_code: shippingDetails.address.country,
          zip: shippingDetails.address.postal_code,
          email: customerEmail
        },
        items: [
          // Ejemplo: esto se llenará dinámicamente con los line_items comprados
          {
            sync_variant_id: 12345678, // ID del producto/talla en Printful
            quantity: 1
          }
        ]
      };

      // 4. Disparamos la creación de la orden en Printful
      const printfulOrder = await printfulService.createOrder(orderData);
      
      console.log("Orden enviada exitosamente a Printful:", printfulOrder.id);
      
    } catch (error) {
      console.error("Error al procesar la orden con Printful:", error);
      // Retornamos 500 para que Stripe reintente el webhook más tarde si hubo un error temporal
      return NextResponse.json({ error: 'Error procesando la orden' }, { status: 500 });
    }
  }

  // Retornamos 200 a Stripe para confirmar que recibimos el webhook
  return NextResponse.json({ received: true }, { status: 200 });
}
