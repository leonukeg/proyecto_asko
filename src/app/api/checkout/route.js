import { NextResponse } from 'next/server';
import { StripeService } from '@/lib/services/StripeService';

const stripeService = new StripeService();

export async function POST(req) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Obtenemos la URL base dinámicamente para redireccionar de vuelta al carrito tras el pago
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const host = req.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    // Stripe REQUIERE que las imágenes sean URLs absolutas (empezando por http:// o https://)
    const formattedItems = items.map(item => ({
      ...item,
      image: item.image?.startsWith('http') ? item.image : `${baseUrl}${item.image}`
    }));

    const successUrl = `${baseUrl}/carrito?success=true`;
    const cancelUrl = `${baseUrl}/carrito?canceled=true`;

    const session = await stripeService.createCheckoutSession(formattedItems, successUrl, cancelUrl);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout API Error:", error.message);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
