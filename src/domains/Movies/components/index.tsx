import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { MovieResponse } from "../common/types/movie.type";
import { useFavorites } from "../../common/hooks/useFavorites";

const BASE_URL = "https://api.themoviedb.org/3";

const getPopularMovies = async (): Promise<MovieResponse> => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: "ko-KR",
    },
  });
  return data;
};

export const Movie: FC = () => {
  const { isFavorite, toggle } = useFavorites();
  const { data } = useQuery<MovieResponse, unknown>({
    queryFn: getPopularMovies,
    queryKey: ["popular-movies"],
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 10,
  });

  const { mutate } = useMutation<Response, any, { id: number; favorite: boolean }>({
    mutationFn: async (data) => {
      const accountId = localStorage.getItem("accountId");
      const response = await fetch(`${BASE_URL}/account/${accountId}/favorite`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
        },
        body: JSON.stringify({
          media_id: data.id,
          media_type: "movie",
          favorite: data.favorite,
        }),
      });
      return response;
    },
    mutationKey: ["favorite-movies"],
  });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={clsx(styles.content, styles.grid, styles.scroller)}>
      {data.results.map((result) => (
        <div key={result.id}>
          <Link to={`/movies/${result.id}`} state={result}>
            <div className={styles.image_wrapper}>
              <img src={`https://media.themoviedb.org/t/p/w154/${result.poster_path}`} alt={result.title} />
              <button
                className={clsx(styles.favorite_icon, styles.reset_button)}
                onClick={() => {
                  mutate({ id: result.id, favorite: true });
                  toggle(result.id);
                }}
              >
                {isFavorite(result.id) ? "★" : "☆"}
              </button>
            </div>
          </Link>
          <div className={styles.card_text}>
            <h2 className={styles.card_title}>{result.title}</h2>
            <p>{result.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
