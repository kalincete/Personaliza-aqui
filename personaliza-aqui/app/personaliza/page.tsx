import ProductEditor from "@/components/ProductEditor";

export default function PersonalizaPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ fontSize: "52px", marginBottom: 12 }}>Personaliza Aquí</h1>
        <p>Elige un producto, sube tu diseño y genera una vista previa rápida.</p>
        <div style={{ marginTop: 24 }}>
          <ProductEditor />
        </div>
      </div>
    </main>
  );
}
