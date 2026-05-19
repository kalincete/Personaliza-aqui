import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ProductosPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ fontSize: "52px", marginBottom: 18 }}>Productos</h1>
        <p>Catálogo inicial para crear una vista previa rápida y pedir presupuesto.</p>
        <div className="grid" style={{ marginTop: 26 }}>
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </main>
  );
}
