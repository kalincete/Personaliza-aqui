import { products } from "@/data/products";

export default function AdminPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ fontSize: "52px", marginBottom: 12 }}>Panel admin provisional</h1>
        <p>En esta primera versión los productos se editan en el archivo <strong>data/products.ts</strong>. Cuando validemos la app, añadimos base de datos y subida desde panel.</p>
        <div className="panel" style={{ marginTop: 24, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: 12 }}>Producto</th>
                <th style={{ textAlign: "left", padding: 12 }}>Categoría</th>
                <th style={{ textAlign: "left", padding: 12 }}>Técnica</th>
                <th style={{ textAlign: "left", padding: 12 }}>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: 12 }}>{product.name}</td>
                  <td style={{ padding: 12, color: "var(--muted)" }}>{product.category}</td>
                  <td style={{ padding: 12, color: "var(--green)", fontWeight: 800 }}>{product.technique}</td>
                  <td style={{ padding: 12, color: "var(--muted)" }}>{product.image}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
