/**
 * PrintfulService.js
 * Wrapper para la API de Printful. Asegura el principio de Agnosticismo de Dependencias.
 */

export class PrintfulService {
  constructor() {
    this.apiKey = process.env.PRINTFUL_API_KEY;
    this.baseUrl = 'https://api.printful.com';
  }

  /**
   * Obtiene todos los productos de la tienda de Printful.
   * Si no hay API key (entorno de desarrollo inicial), devuelve un mock.
   */
  async getProducts() {
    if (!this.apiKey) {
      console.warn("No PRINTFUL_API_KEY provided, using mock data.");
      return this._getMockProducts();
    }

    try {
      const response = await fetch(`${this.baseUrl}/store/products`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });
      if (!response.ok) {
        throw new Error(`Printful API Error: ${response.status}`);
      }
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error fetching products from Printful:", error);
      throw error;
    }
  }

  /**
   * Obtiene los detalles de un producto individual, incluyendo sus variantes (tallas).
   */
  async getProduct(id) {
    if (!this.apiKey) {
      console.warn(`No PRINTFUL_API_KEY provided. Usando mock para producto ${id}`);
      return this._getMockProductDetail(id);
    }

    try {
      const response = await fetch(`${this.baseUrl}/store/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });
      if (!response.ok) {
        throw new Error(`Printful API Error: ${response.status}`);
      }
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error(`Error fetching product ${id} from Printful:`, error);
      throw error;
    }
  }

  /**
   * Crea una orden en Printful (lanzado automáticamente tras pago en Stripe)
   */
  async createOrder(orderData) {
    if (!this.apiKey) {
      console.warn("No PRINTFUL_API_KEY. Simulando creación de orden:", orderData);
      return { id: "mock_order_123", status: "pending" };
    }

    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Printful API Error: ${errorData.error?.message || response.status}`);
      }
      
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error creando orden en Printful:", error);
      throw error;
    }
  }

  _getMockProductDetail(id) {
    return {
      sync_product: {
        id: id,
        name: "ÍCONOS DEL CAOS - DETALLE MOCK",
        thumbnail_url: "/placeholder1.jpg",
      },
      sync_variants: [
        { id: 101, name: "ÍCONOS DEL CAOS - S", retail_price: "29.99" },
        { id: 102, name: "ÍCONOS DEL CAOS - M", retail_price: "29.99" },
        { id: 103, name: "ÍCONOS DEL CAOS - L", retail_price: "29.99" },
      ]
    };
  }

  _getMockProducts() {
    return [
      { id: 1, name: "ÍCONOS DEL CAOS", thumbnail_url: "/placeholder1.jpg", retail_price: "29.99" },
      { id: 2, name: "HUMOR & ACTITUD", thumbnail_url: "/placeholder2.jpg", retail_price: "25.00" },
      { id: 3, name: "ANIMALES SALVAJES", thumbnail_url: "/placeholder3.jpg", retail_price: "27.50" },
      { id: 4, name: "ARTE & REBELDÍA", thumbnail_url: "/placeholder4.jpg", retail_price: "30.00" },
    ];
  }
}
