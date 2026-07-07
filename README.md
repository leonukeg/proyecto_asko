# ASKO - Arte que Viste (E-Commerce)

Bienvenido al repositorio oficial de **ASKO**, una marca de ropa con actitud punk, diseño brutalista y automatización Print-on-Demand.

## 🚀 Arquitectura SEO y Tecnologías (Máquina de Buscadores)

Este proyecto está construido para ser rápido, moderno, completamente automatizado y **optimizado al 100% para SEO**:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Components). La página de inicio carga los productos de Printful *en el servidor*, entregando HTML puro a Google al instante.
- **Microdatos (JSON-LD)**: Inyectamos Schema.org para que los buscadores entiendan que ASKO es una marca legítima de ropa streetwear.
- **Metadatos y OpenGraph**: Etiquetas optimizadas para Twitter, WhatsApp e Instagram.
- **Estilos**: Vanilla CSS Modules (Diseño Brutalista, Animaciones de péndulo, Marquee).
- **Print-on-Demand**: Integración nativa con la API de [Printful](https://www.printful.com/) para sincronizar catálogo en tiempo real.
- **Pagos**: [Stripe](https://stripe.com/) (Checkout & Webhooks) - *Próximamente*

## 🎨 Filosofía de Diseño ("El Vibe")
ASKO no es una tienda limpia y aburrida. Utilizamos un sistema de diseño "Atomic Vibe":
- **Fuentes Callejeras:** Títulos en `Permanent Marker` para un estilo graffiti/rotulador legible, contrastando con `Inter` para los detalles de compra.
- **Grid Roto y Caos:** La página del producto elimina la estructura tradicional. Presenta la caja de información en el centro de la pantalla, rodeada por imágenes de los productos lanzadas aleatoriamente por los bordes.
- **Interacciones Agresivas:** Animaciones de levitación (`float`), botones gigantes con animaciones de temblor (`shake`) y textos flotantes (`swingInOut`).

## ⚙️ Estructura del Proyecto

- `src/app/page.jsx`: Landing principal (Server Component) que carga productos y microdatos SEO.
- `src/components/ui/ProductGrid.jsx`: Componente de cliente encargado del interactuar con el carrito y pagos.
- `src/app/producto/[id]/page.jsx`: **La Monstruosidad**. Página de producto individual con layout caótico y determinista según el ID.
- `src/lib/services/`: Clases independientes (`PrintfulService`, `StripeService`).

## 🛠️ Cómo ejecutar en local

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto y añade tus claves maestras:
   ```env
   PRINTFUL_API_KEY=tu_clave_secreta
   STRIPE_SECRET_KEY=tu_clave_secreta
   STRIPE_WEBHOOK_SECRET=tu_clave_webhook
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📜 Roadmap Actualizado
- [x] Sincronización de catálogo con Printful.
- [x] Página brutalista individual de producto (Layout Caótico).
- [x] Refactorización de la Home a Server Components (Optimización SEO & JSON-LD).
- [ ] Enlace del botón "Hazlo Tuyo" con Stripe Checkout.
- [ ] Webhook de Stripe para disparar `createOrder()` en Printful automáticamente.

---
*“ASKO NO RULES // ARTE QUE VISTE”*
