import { useEffect, useState } from "react";
import { MovieResponse } from "../../types/common";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const getFavoritMovies = async () => {
      const accountId = localStorage.getItem("accountId");
      if (!accountId) return;
      const moviesResponse = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
          "content-type": "application/json",
        },
      });

      const moviesJson: MovieResponse = await moviesResponse.json();
      const movies = moviesJson.results ? moviesJson.results.map((movie) => movie.id) : [];

      setFavorites(movies);
    };

    getFavoritMovies();
  }, []);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggle = (id: number) => {
    const exists = favorites.includes(id);
    const updated = exists ? favorites.filter((favorite) => favorite !== id) : [...favorites, id];

    setFavorites(updated);
    const updateFavoriteMovies = async (media_id: number, favorite: Boolean) => {
      const accountId = localStorage.getItem("accountId");
      if (!accountId) return;
      await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id,
          favorite,
        }),
      });
    };
    updateFavoriteMovies(id, !exists);
  };

  return { favorites, isFavorite, toggle };
};
