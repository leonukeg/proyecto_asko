# ASKO - Streetwear sin Reglas

Bienvenido al repositorio oficial de **ASKO**, una marca de ropa con actitud punk, diseño brutalista y automatización Print-on-Demand. Creamos piezas para quienes nunca encajaron.

## 🚀 Arquitectura y Routing

Hemos rediseñado la experiencia de navegación para romper moldes:

- **La Puerta de Entrada (`/`)**: Una "Splash Screen" oscura y brutalista. Un logo gigante parpadeante que parte la pantalla en dos. Un click en el vacío te transporta al caos.
- **El Dash (`/home`)**: El centro de operaciones. Un Hero con layout asimétrico de pantalla dividida (Split-screen) donde las camisetas flotan y orbitan alrededor de textos gigantescos optimizados para SEO.
- **Página de Producto (`/producto/[id]`)**: Eliminamos la "tarjeta de producto" tradicional. Ahora la información flota sin fondo directamente sobre el entorno caótico de ASKO, integrándose con el fondo 100%.

## ⚡ Tecnologías y SEO

Este proyecto está construido para ser rápido, moderno, completamente automatizado y **optimizado al 100% para SEO**:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router).
- **Microdatos (JSON-LD)**: Inyectamos Schema.org en el lado del servidor para que Google indexe los productos de inmediato.
- **Estilos**: Vanilla CSS Modules (Layouts en CSS Grid, Flexbox, animaciones de péndulo y levitación de imágenes).
- **Print-on-Demand**: Integración nativa con la API de [Printful](https://www.printful.com/) para sincronizar catálogo en tiempo real.
- **Pagos**: [Stripe](https://stripe.com/) (Checkout & Webhooks) - *Próximamente*

## 🎨 Filosofía de Diseño ("El Vibe")
ASKO no es una tienda limpia y aburrida. Utilizamos un sistema de diseño "Atomic Vibe":
- **Grid Roto y Caos:** Usamos asimetría. "STREETWEAR SIN REGLAS". El peso visual te obliga a navegar de forma no tradicional.
- **Interacciones Agresivas:** Animaciones de levitación (`float`), botones industriales con colores reactivos, desenfoques (`backdrop-filter`) y sombras sucias.

## ⚙️ Estructura del Proyecto

- `src/app/page.jsx`: La Intro Screen (Splash) con Framer Motion.
- `src/app/home/page.jsx`: Landing principal (El Dash) con el nuevo Hero asimétrico y Server Components.
- `src/components/ui/ProductGrid.jsx`: Cuadrícula interactiva de productos.
- `src/app/producto/[id]/page.jsx`: Página de producto individual y desordenada intencionalmente.

## 🛠️ Cómo ejecutar en local

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz:
   ```env
   PRINTFUL_API_KEY=tu_clave_secreta
   STRIPE_SECRET_KEY=tu_clave_secreta
   STRIPE_WEBHOOK_SECRET=tu_clave_webhook
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000).

## 📜 Roadmap Actualizado
- [x] Sincronización de catálogo con Printful.
- [x] Refactorización de la Intro y el Dash (Grid asimétrico, SEO).
- [x] Integración transparente de la página de producto.
- [ ] Enlace del botón de compra con Stripe Checkout.
- [ ] Webhook de Stripe para disparar órdenes en Printful automáticamente.

---
*“Convirtiendo lo cotidiano en extraño y lo grotesco en identidad.”*
