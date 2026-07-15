import "./globals.css";
import BackgroundLayer from "@/components/layout/BackgroundLayer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "ASKO | Arte que Viste",
  description: "Diseños originales de artistas independientes que rompen moldes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <BackgroundLayer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
