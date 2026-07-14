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

export const bookProduct: Product = {
  id: "alma-serena-libro",
  name: "Alma Serena — Diario de 90 días",
  price: 24.99,
  image: images.bookCover,
  emoji: "✿",
  category: "Libros",
  desc: "Un diario de 90 días para reconectar con tu calma, gratitud y crecimiento personal.",
};
