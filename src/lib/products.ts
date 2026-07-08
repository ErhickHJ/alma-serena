import { images } from "./images";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  emoji: string;
  category: string;
  desc: string;
};

export const products: Product[] = [
  {
    id: "vela-lavanda",
    name: "Vela Aromática - Lavanda",
    price: 18.00,
    image: images.candle,
    emoji: "🕯️",
    category: "Velas y Aromaterapia",
    desc: "Aroma calmante para tus momentos de meditación.",
  },
  {
    id: "vela-sandalo",
    name: "Vela Aromática - Sándalo",
    price: 18.00,
    image: images.candle,
    emoji: "🕯️",
    category: "Velas y Aromaterapia",
    desc: "Notas amaderadas que invitan a la paz interior.",
  },
  {
    id: "mist-almohada",
    name: "Mist de Almohada",
    price: 14.00,
    image: images.aromatherapy,
    emoji: "🌙",
    category: "Velas y Aromaterapia",
    desc: "Rocío suave con esencia de manzanilla y lavanda.",
  },
  {
    id: "difusor",
    name: "Difusor de Aceites",
    price: 32.00,
    image: images.aromatherapy,
    emoji: "💨",
    category: "Velas y Aromaterapia",
    desc: "Difusor ultrasónico de cerámica artesanal.",
  },
  {
    id: "cuaderno-gratitud",
    name: "Cuaderno de Gratitud",
    price: 12.00,
    image: images.notebook,
    emoji: "📓",
    category: "Diarios y Papelería",
    desc: "Pequeño compañero para tus notas de agradecimiento.",
  },
  {
    id: "set-plumas",
    name: "Set de Plumas",
    price: 8.00,
    image: images.journal,
    emoji: "🖊️",
    category: "Diarios y Papelería",
    desc: "Tres plumas de tinta suave para escribir con calma.",
  },
  {
    id: "separadores",
    name: "Separadores Artesanales",
    price: 6.00,
    image: images.notebook,
    emoji: "🔖",
    category: "Diarios y Papelería",
    desc: "Set de 4 separadores con diseños de la naturaleza.",
  },
  {
    id: "kit-journaling",
    name: "Kit de Journaling",
    price: 28.00,
    image: images.journal,
    emoji: "📦",
    category: "Diarios y Papelería",
    desc: "Cuaderno, plumas, washi tape y stickers.",
  },
  {
    id: "amatista",
    name: "Cristal de Amatista",
    price: 22.00,
    image: images.crystals,
    emoji: "💜",
    category: "Cristales y Energía",
    desc: "Piedra de calma y equilibrio espiritual.",
  },
  {
    id: "cuarzo-rosa",
    name: "Cuarzo Rosa",
    price: 18.00,
    image: images.crystals,
    emoji: "🩷",
    category: "Cristales y Energía",
    desc: "Para abrir el corazón al amor propio.",
  },
  {
    id: "selenita",
    name: "Selenita",
    price: 16.00,
    image: images.crystals,
    emoji: "🤍",
    category: "Cristales y Energía",
    desc: "Limpia y purifica la energía del espacio.",
  },
  {
    id: "chakras",
    name: "Set de 7 Chakras",
    price: 35.00,
    image: images.crystals,
    emoji: "🌈",
    category: "Cristales y Energía",
    desc: "Piedras para alinear y equilibrar tu energía.",
  },
  {
    id: "te-relajante",
    name: "Kit de Té Relajante",
    price: 15.00,
    image: images.tea,
    emoji: "🍵",
    category: "Ritual y Bienestar",
    desc: "Mezcla de hierbas para momentos de calma.",
  },
  {
    id: "aceite-corporal",
    name: "Aceite Corporal",
    price: 24.00,
    image: images.aromatherapy,
    emoji: "🧴",
    category: "Ritual y Bienestar",
    desc: "Hidratante con esencia de ylang-ylang.",
  },
  {
    id: "manta-meditacion",
    name: "Manta de Meditación",
    price: 45.00,
    image: images.yoga,
    emoji: "🧘",
    category: "Ritual y Bienestar",
    desc: "Suave y ligera, ideal para tu práctica diaria.",
  },
  {
    id: "balsamo-templos",
    name: "Bálsamo de Templos",
    price: 12.00,
    image: images.aromatherapy,
    emoji: "🌿",
    category: "Ritual y Bienestar",
    desc: "Alivia la tensión con aceites esenciales puros.",
  },
];

export const bookProduct: Product = {
  id: "alma-serena-libro",
  name: "Alma Serena — Diario de 90 días",
  price: 24.99,
  image: images.bookCover,
  emoji: "✿",
  category: "Libros",
  desc: "Un diario de 90 días para reconectar con tu calma, gratitud y crecimiento personal.",
};
