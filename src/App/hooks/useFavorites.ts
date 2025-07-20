import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggle = (id: number) => {
    const exists = favorites.includes(id);
    const updated = exists
      ? favorites.filter((favorite) => favorite !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return { favorites, isFavorite, toggle };
};
