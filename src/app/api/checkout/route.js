import { NextResponse } from 'next/server';
import { StripeService } from '@/lib/services/StripeService';

export async function POST(request) {
  try {
    const { items } = await request.json();
    
    // Validar items
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const stripeService = new StripeService();
    const origin = request.headers.get('origin') || 'http://localhost:3000';
    
    const session = await stripeService.createCheckoutSession(
      items,
      `${origin}/?success=true`,
      `${origin}/?canceled=true`
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
