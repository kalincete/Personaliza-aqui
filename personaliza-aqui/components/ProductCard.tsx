import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <div className="product-img"><img src={product.image} alt={product.name} /></div>
      <div className="card-body">
        <div className="meta">{product.technique}</div>
        <h3>{product.name}</h3>
        <p className="small">{product.short}</p>
        <div className="actions">
          <a className="btn btn-primary" href={`/personaliza?producto=${product.id}`}>Personalizar</a>
        </div>
      </div>
    </article>
  );
}
