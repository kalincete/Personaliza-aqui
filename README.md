# Personaliza Aquí · Gutenberg

App web MVP para que el cliente suba su logo o diseño, lo vea sobre productos de la imprenta y pida presupuesto por email.

## Qué incluye esta primera versión

- Portada con identidad visual Gutenberg provisional.
- Catálogo inicial de 12 productos.
- Editor visual con canvas.
- Subida de logo/diseño en PNG, JPG, WEBP o SVG.
- Controles de posición, tamaño y rotación.
- Texto opcional.
- Descarga de vista previa en PNG.
- Formulario básico de presupuesto.
- Envío de resumen por email a info@imprentagutenberg.es.
- Panel admin provisional con listado de productos.

## Productos incluidos

1. Taza blanca sublimable
2. Bidón blanco sublimable
3. Camiseta DTF
4. Sudadera DTF
5. Tote bag DTF
6. Tote bag serigrafía
7. Bolígrafo impresión UV
8. Bolígrafo metálico grabado láser
9. Llavero metacrilato
10. Medalla metacrilato UV
11. Pegatina vinilo troquelada
12. Placa/cartel pequeño UV

## Instalación local

```bash
npm install
npm run dev
```

Abrir:

```bash
http://localhost:3000
```

## Configurar WhatsApp

Crear un archivo `.env.local` copiando `.env.local.example`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=34600000000
```

Cambiar el número por el de la imprenta, con prefijo país y sin `+`, espacios ni guiones.

Ejemplo España:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=34612345678
```

Después reiniciar el servidor local.

## Cambiar productos

Editar el archivo:

```bash
data/products.ts
```

Cada producto tiene:

- nombre
- categoría
- técnica
- precio desde
- imagen
- descripción corta
- opciones

## Cambiar imágenes de productos

Sustituir los SVG provisionales dentro de:

```bash
public/products/
```

Mantener el mismo nombre de archivo o actualizar la ruta en `data/products.ts`.

## Cambiar logo

Cuando tengas el logo PNG/SVG real, se puede añadir en:

```bash
public/brand/logo.png
```

Después se cambia la cabecera en:

```bash
app/layout.tsx
```

Ahora se usa texto provisional `Gutenberg` para no depender del archivo.

## Subir a GitHub

```bash
git init
git add .
git commit -m "Primera versión Personaliza Aquí"
git branch -M main
git remote add origin URL_DE_TU_REPOSITORIO
git push -u origin main
```

## Publicar en Vercel

1. Entrar en Vercel.
2. Importar el repositorio de GitHub.
3. Framework: Next.js.
4. Añadir variable de entorno:
5. Deploy.

## Siguiente fase recomendada

- Añadir logo real.
- Sustituir dibujos por fotos reales de producto.
- Añadir zonas de impresión por producto.
- Añadir envío de email automático desde servidor.
- Añadir base de datos para solicitudes.
- Añadir panel admin real.
