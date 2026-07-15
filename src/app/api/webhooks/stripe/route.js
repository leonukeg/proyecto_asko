import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrintfulService } from '@/lib/services/PrintfulService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
  apiVersion: '2023-10-16',
});

const printfulService = new PrintfulService();

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const payload = await req.text(); // Stripe needs raw body to verify signature
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    if (!endpointSecret) {
      console.warn("No STRIPE_WEBHOOK_SECRET, skipping signature verification for local test");
      event = JSON.parse(payload);
    } else {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Extraer metadata y shipping address
    const { metadata, shipping_details, customer_details } = session;
    
    console.log("💰 Pago completado para la sesión:", session.id);
    
    if (metadata && metadata.items) {
      try {
        const items = JSON.parse(metadata.items);
        
        // Formatear datos para Printful
        const printfulOrder = {
          recipient: {
            name: shipping_details?.name || customer_details?.name || 'ASKO Customer',
            address1: shipping_details?.address?.line1 || '',
            address2: shipping_details?.address?.line2 || '',
            city: shipping_details?.address?.city || '',
            state_code: shipping_details?.address?.state || '',
            country_code: shipping_details?.address?.country || 'US',
            zip: shipping_details?.address?.postal_code || '',
            email: customer_details?.email || '',
          },
          items: items.map(item => ({
            sync_variant_id: parseInt(item.variantId, 10), // The Printful variant ID
            quantity: item.quantity,
          })),
        };

        // Crear orden en Printful
        console.log("📦 Enviando orden a Printful:", printfulOrder);
        const orderResult = await printfulService.createOrder(printfulOrder);
        console.log("✅ Orden creada en Printful exitosamente:", orderResult.id);

      } catch (e) {
        console.error("Error al procesar la orden hacia Printful:", e);
        // Retornamos 200 aunque Printful falle, para que Stripe no reintente
        // En producción idealmente se encola o se avisa por email
      }
    } else {
      console.warn("No metadata items found in Stripe session.");
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}
