# ASKO - Arte que Viste (E-Commerce)

Bienvenido al repositorio oficial de **ASKO**, una marca de ropa con actitud punk, diseño brutalista y automatización Print-on-Demand.

## 🚀 Tecnologías

Este proyecto está construido para ser rápido, moderno y completamente automatizado:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Components)
- **Estilos**: Vanilla CSS Modules (Diseño Brutalista, Animaciones Glitch, Marquee infinito)
- **Print-on-Demand**: Integración nativa con la API de [Printful](https://www.printful.com/) para sincronizar catálogo y enviar órdenes automáticamente.
- **Pagos**: [Stripe](https://stripe.com/) (Checkout & Webhooks) - *En desarrollo*

## 🎨 Filosofía de Diseño ("El Vibe")
ASKO no es una tienda limpia y aburrida. Utilizamos un sistema de diseño "Atomic Vibe":
- **Grid Roto:** Márgenes asimétricos y desalineamiento intencionado.
- **Texturas:** Efectos de corrosión y desgaste a través de máscaras CSS.
- **Interacciones Agresivas:** Botones gigantes, animaciones de temblor (shake) y fallos visuales (glitches) en lugar de transiciones suaves.

## ⚙️ Arquitectura

- `src/app/page.jsx`: Landing principal que lista los productos sincrónicos (o mock) con tarjetas que tiemblan.
- `src/app/producto/[id]/page.jsx`: **La Monstruosidad**. Página individual de producto Server-Side que extrae los datos y tallas en tiempo real desde Printful.
- `src/lib/services/`: Clases independientes (`PrintfulService`, `StripeService`) inyectadas bajo el principio de agnosticismo.

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

## 📜 Próximos Pasos (Roadmap)
- [x] Sincronización de catálogo con Printful.
- [x] Página brutalista individual de producto.
- [ ] Enlace del botón "Hazlo Tuyo" con Stripe Checkout.
- [ ] Webhook de Stripe para disparar `createOrder()` en Printful automáticamente.

---
*“ASKO NO RULES // ARTE QUE VISTE”*
