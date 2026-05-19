"use client";

import { products } from "@/data/products";
import { useEffect, useMemo, useRef, useState } from "react";

type Customer = {
  name: string;
  company: string;
  phone: string;
  email: string;
  quantity: string;
  date: string;
  notes: string;
};

const emptyCustomer: Customer = {
  name: "",
  company: "",
  phone: "",
  email: "",
  quantity: "",
  date: "",
  notes: ""
};

export default function ProductEditor({ initialProductId }: { initialProductId?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [productId, setProductId] = useState(initialProductId || products[0].id);
  const [logoData, setLogoData] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>("");
  const [text, setText] = useState("");
  const [x, setX] = useState(400);
  const [y, setY] = useState(400);
  const [scale, setScale] = useState(42);
  const [rotation, setRotation] = useState(0);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [mockupUrl, setMockupUrl] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>("");

  const product = useMemo(() => products.find(p => p.id === productId) || products[0], [productId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("producto");
    if (requested && products.some(p => p.id === requested)) setProductId(requested);
  }, []);

  useEffect(() => {
    drawCanvas();
  }, [productId, logoData, x, y, scale, rotation, text]);

  function updateCustomer(key: keyof Customer, value: string) {
    setCustomer(prev => ({ ...prev, [key]: value }));
  }

  function handleLogoUpload(file?: File) {
    if (!file) return;
    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setLogoData(String(reader.result));
    reader.readAsDataURL(file);
  }

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 900;
    ctx.fillStyle = "#0a1424";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const productImg = new Image();
    productImg.crossOrigin = "anonymous";
    productImg.onload = () => {
      ctx.fillStyle = "#0a1424";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(productImg, 90, 90, 720, 720);

      if (logoData) {
        const logo = new Image();
        logo.onload = () => {
          drawBaseAndLogo(ctx, productImg, logo);
        };
        logo.src = logoData;
      } else {
        drawText(ctx);
        drawGuide(ctx);
        drawWatermark(ctx);
        setMockupUrl(canvas.toDataURL("image/png"));
      }
    };
    productImg.src = product.image;
  }

  function drawBaseAndLogo(ctx: CanvasRenderingContext2D, productImg: HTMLImageElement, logo: HTMLImageElement) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx.fillStyle = "#0a1424";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(productImg, 90, 90, 720, 720);

    const maxSide = Math.max(logo.width, logo.height) || 1;
    const size = 520 * (scale / 100);
    const ratio = size / maxSide;
    const w = logo.width * ratio;
    const h = logo.height * ratio;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(logo, -w / 2, -h / 2, w, h);
    ctx.restore();

    drawText(ctx);
    drawGuide(ctx);
    drawWatermark(ctx);
    setMockupUrl(canvas.toDataURL("image/png"));
  }

  function drawText(ctx: CanvasRenderingContext2D) {
    if (!text.trim()) return;
    ctx.save();
    ctx.fillStyle = "#111827";
    ctx.strokeStyle = "rgba(255,255,255,.72)";
    ctx.lineWidth = 5;
    ctx.textAlign = "center";
    ctx.font = "bold 46px Arial";
    ctx.strokeText(text.trim(), 450, 705);
    ctx.fillText(text.trim(), 450, 705);
    ctx.restore();
  }

  function drawWatermark(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = 0.26;
    ctx.fillStyle = "#E8EEF5";
    ctx.font = "bold 34px Arial";
    ctx.textAlign = "center";
    ctx.translate(450, 450);
    ctx.rotate((-22 * Math.PI) / 180);
    ctx.fillText("Vista previa · Gutenberg", 0, 0);
    ctx.restore();
  }

  function drawGuide(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = "rgba(140,198,63,.65)";
    ctx.setLineDash([12, 12]);
    ctx.lineWidth = 2;
    ctx.strokeRect(250, 230, 400, 400);
    ctx.fillStyle = "rgba(140,198,63,.9)";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("zona orientativa", 450, 214);
    ctx.restore();
  }

  function requiredFieldsCompleted() {
    return Boolean(
      customer.name.trim() &&
      customer.email.trim() &&
      customer.phone.trim() &&
      customer.quantity.trim()
    );
  }

  function validateCustomer() {
    if (requiredFieldsCompleted()) {
      setFormMessage("");
      return true;
    }
    setFormMessage("Completa nombre, email, teléfono y cantidad para descargar la vista previa o pedir presupuesto.");
    return false;
  }

  function downloadMockup() {
    if (!validateCustomer()) return false;
    if (!mockupUrl) drawCanvas();
    const link = document.createElement("a");
    link.href = mockupUrl || canvasRef.current?.toDataURL("image/png") || "";
    link.download = `personaliza-aqui-${product.id}.png`;
    link.click();
    return true;
  }

  function handleEmailClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!downloadMockup()) {
      event.preventDefault();
      return;
    }
  }


  function pointerToCanvas(event: React.PointerEvent<HTMLElement>) {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return null;
    const rect = stage.getBoundingClientRect();
    const canvasX = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const canvasY = ((event.clientY - rect.top) / rect.height) * canvas.height;
    return { x: canvasX, y: canvasY };
  }

  function moveDesignToPointer(event: React.PointerEvent<HTMLElement>) {
    const point = pointerToCanvas(event);
    if (!point) return;
    const nextX = Math.max(120, Math.min(780, Math.round(point.x)));
    const nextY = Math.max(120, Math.min(780, Math.round(point.y)));
    setX(nextX);
    setY(nextY);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (!logoData && !text.trim()) return;
    event.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveDesignToPointer(event);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (!isDraggingRef.current) return;
    event.preventDefault();
    moveDesignToPointer(event);
  }

  function stopDragging(event: React.PointerEvent<HTMLElement>) {
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}
  }

  function emailLink() {
    const to = "info@imprentagutenberg.es";
    const subject = `Solicitud de presupuesto - ${product.name}`;
    const body = [
      "Hola, quiero pedir presupuesto desde Personaliza Aquí.",
      "",
      `Producto: ${product.name}`,
      `Técnica: ${product.technique}`,
      `Cantidad: ${customer.quantity || "sin indicar"}`,
      `Nombre: ${customer.name || "sin indicar"}`,
      `Empresa: ${customer.company || "sin indicar"}`,
      `Teléfono: ${customer.phone || "sin indicar"}`,
      `Email: ${customer.email || "sin indicar"}`,
      `Fecha deseada: ${customer.date || "sin indicar"}`,
      `Archivo subido: ${logoName || "sin archivo"}`,
      `Texto: ${text || "sin texto"}`,
      `Observaciones: ${customer.notes || "sin observaciones"}`,
      "",
      "He descargado la vista previa del diseño para adjuntarla a este correo."
    ].join("\n");

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="editor-layout">
      <section className="panel">
        <div className="canvas-wrap">
          <div ref={stageRef} className="preview-stage">
            <canvas
              ref={canvasRef}
              aria-label="Vista previa del producto"
              className={isDragging ? "dragging" : ""}
            />
            <div
              className={isDragging ? "drag-layer dragging" : "drag-layer"}
              role="button"
              aria-label="Arrastra aquí para mover el diseño"
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
            >
              {(logoData || text.trim()) && <span className="drag-hint">Arrastra el diseño</span>}
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={downloadMockup}>Descargar vista previa</button>
          <button className="btn btn-secondary" onClick={() => { setLogoData(null); setText(""); }}>Limpiar diseño</button>
        </div>
        <p className="notice">Puedes mover el diseño arrastrándolo directamente sobre la imagen, tanto con ratón como con el dedo en móvil.</p>
        <p className="notice">La descarga queda bloqueada hasta completar nombre, email, teléfono y cantidad. La imagen es orientativa y lleva marca de agua.</p>
        <p className="notice">Antes de producir revisamos medidas, calidad del archivo, técnica adecuada y precio final.</p>
      </section>

      <aside className="panel">
        <h2>Personaliza aquí</h2>
        <div className="field">
          <label>Producto</label>
          <select value={productId} onChange={event => setProductId(event.target.value)}>
            {products.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Técnica</label>
          <input value={product.technique} readOnly />
        </div>
        <div className="field">
          <label>Sube tu logo o diseño</label>
          <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={e => handleLogoUpload(e.target.files?.[0])} />
        </div>
        <div className="field">
          <label>Texto opcional</label>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Nombre, fecha, evento..." />
        </div>
        <div className="field">
          <label>Posición horizontal / ajuste fino</label>
          <div className="range-row"><input type="range" min="120" max="780" value={x} onChange={e => setX(Number(e.target.value))} /><input value={x} readOnly /></div>
        </div>
        <div className="field">
          <label>Posición vertical / ajuste fino</label>
          <div className="range-row"><input type="range" min="120" max="780" value={y} onChange={e => setY(Number(e.target.value))} /><input value={y} readOnly /></div>
        </div>
        <div className="field">
          <label>Tamaño</label>
          <div className="range-row"><input type="range" min="10" max="100" value={scale} onChange={e => setScale(Number(e.target.value))} /><input value={`${scale}%`} readOnly /></div>
        </div>
        <div className="field">
          <label>Rotación</label>
          <div className="range-row"><input type="range" min="-180" max="180" value={rotation} onChange={e => setRotation(Number(e.target.value))} /><input value={`${rotation}º`} readOnly /></div>
        </div>

        <h2 style={{ fontSize: 28, marginTop: 26 }}>Pedir presupuesto</h2>
        <div className="field"><label>Nombre *</label><input value={customer.name} onChange={e => updateCustomer("name", e.target.value)} /></div>
        <div className="field"><label>Empresa</label><input value={customer.company} onChange={e => updateCustomer("company", e.target.value)} /></div>
        <div className="field"><label>Teléfono *</label><input value={customer.phone} onChange={e => updateCustomer("phone", e.target.value)} /></div>
        <div className="field"><label>Email *</label><input value={customer.email} onChange={e => updateCustomer("email", e.target.value)} /></div>
        <div className="field"><label>Cantidad *</label><input value={customer.quantity} onChange={e => updateCustomer("quantity", e.target.value)} placeholder="Ej. 25 unidades" /></div>
        <div className="field"><label>Fecha deseada</label><input type="date" value={customer.date} onChange={e => updateCustomer("date", e.target.value)} /></div>
        <div className="field"><label>Observaciones</label><textarea rows={4} value={customer.notes} onChange={e => updateCustomer("notes", e.target.value)} placeholder="Tallas, colores, posiciones, acabados..." /></div>
        <div className="actions">
          <a className="btn btn-primary" href={emailLink()} onClick={handleEmailClick}>Enviar por email</a>
        </div>
        {formMessage && <p className="notice warning">{formMessage}</p>}
        <p className="notice">Al pulsar “Enviar por email” se descarga la vista previa con marca de agua. Adjunta esa imagen y el archivo original al correo antes de enviarlo.</p>
      </aside>
    </div>
  );
}
