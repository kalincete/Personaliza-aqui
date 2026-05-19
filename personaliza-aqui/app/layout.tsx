import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personaliza Aquí | Gutenberg",
  description: "Sube tu diseño, mira cómo queda y pide presupuesto."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="header">
          <div className="container header-inner">
            <a href="/" className="brand" aria-label="Gutenberg">
              <span className="brand-main">Gutenberg</span>
              <span className="brand-sub">soluciones & servicios gráficos</span>
            </a>
            <nav className="nav">
              <a href="/">Inicio</a>
              <a href="/productos">Productos</a>
              <a href="/personaliza">Personaliza aquí</a>
              <a href="/admin">Admin</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container small">Personaliza Aquí · Gutenberg · Mockups orientativos. Revisamos cada archivo antes de producir.</div>
        </footer>
      </body>
    </html>
  );
}
