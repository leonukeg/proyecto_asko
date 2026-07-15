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
      // Create a simplified metadata object for the webhook to read
      const orderMetadata = {
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          variantId: item.selectedVariantId || item.id, // ID de variante de Printful
          size: item.size,
          quantity: item.quantity
        })))
      };

      const session = await this.stripe.checkout.sessions.create({
        // Al omitir `payment_method_types`, Stripe carga automáticamente
        // lo que tengas activado en el panel (tarjetas, paypal, google pay, etc.)
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'ES', 'MX', 'GB', 'FR', 'DE'], // Paises soportados
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 500, // $5.00 envío fijo (ejemplo)
                currency: 'usd',
              },
              display_name: 'Envío Estándar Printful',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 10 },
              },
            },
          },
        ],
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${item.name} - Talla ${item.size}`,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects cents
          },
          quantity: item.quantity || 1,
        })),
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: orderMetadata,
      });

      return { url: session.url };
    } catch (error) {
      console.error("Error creating Stripe checkout session:", error);
      throw error;
    }
  }
}
