import "./globals.css";
import BackgroundLayer from "@/components/layout/BackgroundLayer";

export const metadata = {
  title: "ASKO | Arte que Viste",
  description: "Diseños originales de artistas independientes que rompen moldes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <BackgroundLayer />
        {children}
      </body>
    </html>
  );
}
