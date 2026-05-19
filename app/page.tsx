import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 8);
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="kicker">Gutenberg</div>
            <h1>Personaliza Aquí</h1>
            <p>Sube tu logo o diseño, mira cómo queda en nuestros productos y solicita presupuesto sin compromiso.</p>
            <div className="actions">
              <a className="btn btn-primary" href="/personaliza">Empezar a personalizar</a>
              <a className="btn btn-secondary" href="/productos">Ver productos</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Productos principales</h2>
          <div className="grid">
            {featured.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
