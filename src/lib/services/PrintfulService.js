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

  _getMockProducts() {
    return [
      { id: 1, name: "ÍCONOS DEL CAOS", thumbnail_url: "/placeholder1.jpg", retail_price: "29.99" },
      { id: 2, name: "HUMOR & ACTITUD", thumbnail_url: "/placeholder2.jpg", retail_price: "25.00" },
      { id: 3, name: "ANIMALES SALVAJES", thumbnail_url: "/placeholder3.jpg", retail_price: "27.50" },
      { id: 4, name: "ARTE & REBELDÍA", thumbnail_url: "/placeholder4.jpg", retail_price: "30.00" },
    ];
  }
}
