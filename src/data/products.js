// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Glow Skin Serum",
    price: 950,
    image: "/images/lipstick.jpg",
    description: "Cildine ışıltı kazandıran hyaluronic acid & vitamin C.",
    category: "bakim",
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    price: 650,
    image: "/images/eyeliner.jpg",
    description: "Chanel dokusunda kadifemsi mat bitiş.",
    category: "ruj",
  },
  {
    id: 3,
    name: "Velvet",
    price: 650,
    image: "/images/fn.jpg",
    description: "Chanel dokusunda kadifemsi mat bitiş.",
    category: "krem",
  },
  {
    id: 4,
    name: "Velvet Lipstick",
    price: 650,
    image: "/images/cream.jpg",
    description: "Chanel dokusunda kadifemsi mat bitiş.",
    category: "oje",
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}
