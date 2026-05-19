export type Product = {
  id: string;
  name: string;
  category: string;
  technique: string;
  priceFrom: string;
  image: string;
  short: string;
  options: string[];
};

export const products: Product[] = [
  {
    id: "taza-blanca",
    name: "Taza blanca sublimable",
    category: "Regalo personalizado",
    technique: "Sublimación",
    priceFrom: "Consultar",
    image: "/products/taza.svg",
    short: "Ideal para regalos, empresas y eventos.",
    options: ["Frontal", "Ambos lados", "Diseño envolvente"]
  },
  {
    id: "bidon-blanco",
    name: "Bidón blanco sublimable",
    category: "Merchandising empresa",
    technique: "Sublimación",
    priceFrom: "Consultar",
    image: "/products/bidon.svg",
    short: "Producto útil para clubs, gimnasios y empresas.",
    options: ["Frontal", "Nombre personalizado", "Logo empresa"]
  },
  {
    id: "camiseta-dtf",
    name: "Camiseta DTF",
    category: "Textil",
    technique: "DTF",
    priceFrom: "Consultar",
    image: "/products/camiseta.svg",
    short: "Para eventos, peñas, empresas y regalos.",
    options: ["Pecho", "Espalda", "Manga", "Tallas variadas"]
  },
  {
    id: "sudadera-dtf",
    name: "Sudadera DTF",
    category: "Textil",
    technique: "DTF",
    priceFrom: "Consultar",
    image: "/products/sudadera.svg",
    short: "Más margen y buen producto para clubs y grupos.",
    options: ["Pecho", "Espalda", "Tallas variadas"]
  },
  {
    id: "tote-dtf",
    name: "Tote bag DTF",
    category: "Bolsas",
    technique: "DTF",
    priceFrom: "Consultar",
    image: "/products/tote.svg",
    short: "Perfecta para diseños a color y tiradas cortas.",
    options: ["Frontal", "Diseño a color", "Evento"]
  },
  {
    id: "tote-serigrafia",
    name: "Tote bag serigrafía",
    category: "Bolsas",
    technique: "Serigrafía",
    priceFrom: "Consultar",
    image: "/products/tote.svg",
    short: "Recomendada para cantidades medias y tintas planas.",
    options: ["1 tinta", "2 tintas", "Frontal"]
  },
  {
    id: "boligrafo-uv",
    name: "Bolígrafo impresión UV",
    category: "Empresa/eventos",
    technique: "UV",
    priceFrom: "Consultar",
    image: "/products/boligrafo.svg",
    short: "Regalo promocional económico para empresas.",
    options: ["Logo", "Texto", "Color"]
  },
  {
    id: "boligrafo-laser",
    name: "Bolígrafo metálico grabado láser",
    category: "Empresa premium",
    technique: "Láser",
    priceFrom: "Consultar",
    image: "/products/boligrafo-metal.svg",
    short: "Opción más elegante para regalos corporativos.",
    options: ["Logo", "Nombre", "Texto"]
  },
  {
    id: "llavero-metacrilato",
    name: "Llavero metacrilato",
    category: "Eventos/empresa",
    technique: "UV + láser",
    priceFrom: "Consultar",
    image: "/products/llavero.svg",
    short: "Buen margen y muchas posibilidades de forma.",
    options: ["Redondo", "Cuadrado", "Forma personalizada"]
  },
  {
    id: "medalla-metacrilato",
    name: "Medalla metacrilato UV",
    category: "Eventos/premios",
    technique: "UV + láser",
    priceFrom: "Consultar",
    image: "/products/medalla.svg",
    short: "Para carreras, torneos, colegios y reconocimientos.",
    options: ["Redonda", "Cuadrada", "Forma personalizada", "Con cinta"]
  },
  {
    id: "pegatina-vinilo",
    name: "Pegatina vinilo troquelada",
    category: "Eventos/packaging",
    technique: "Vinilo troquelado",
    priceFrom: "Consultar",
    image: "/products/pegatina.svg",
    short: "Para eventos, marcas pequeñas y packaging.",
    options: ["Forma libre", "Redonda", "Cuadrada", "Brillo/mate"]
  },
  {
    id: "placa-uv",
    name: "Placa/cartel pequeño UV",
    category: "Señalética/premium",
    technique: "UV",
    priceFrom: "Consultar",
    image: "/products/placa.svg",
    short: "Para QR, mostradores, premios y señalética pequeña.",
    options: ["Metacrilato", "PVC", "Aluminio", "Madera"]
  }
];
