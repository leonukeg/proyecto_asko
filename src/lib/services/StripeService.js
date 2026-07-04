import Stripe from 'stripe';

/**
 * StripeService.js
 * Wrapper para la API de Stripe. Asegura el principio de Agnosticismo de Dependencias.
 */
export class StripeService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * Crea una sesión de Checkout.
   * @param {Array} items - Los items a comprar.
   * @param {string} successUrl - URL de éxito.
   * @param {string} cancelUrl - URL de cancelación.
   */
  async createCheckoutSession(items, successUrl, cancelUrl) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("No STRIPE_SECRET_KEY provided. Returning mock checkout URL.");
      return { url: "/success" };
    }

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [item.image],
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects cents
          },
          quantity: item.quantity || 1,
        })),
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return { url: session.url };
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      throw error;
    }
  }
}
