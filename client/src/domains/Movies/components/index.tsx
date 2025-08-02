import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { MovieResponse } from "../common/types/movie.type";
import { useFavorites } from "../../common/hooks/useFavorites";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getPopularMovies = async (): Promise<MovieResponse> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/movies`, {
    params: {
      sort_by: "popularity.desc",
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

  const { mutate } = useMutation<
    Response,
    any,
    { id: number; favorite: boolean }
  >({
    mutationFn: async (data) => {
      const accountId = localStorage.getItem("accountId");
      const sessionId = localStorage.getItem("sessionId");

      if (!accountId || !sessionId) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/account/${accountId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_id: data.id,
            media_type: "movie",
            favorite: data.favorite,
            session_id: sessionId,
          }),
        }
      );
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
              <img
                src={`https://media.themoviedb.org/t/p/w154/${result.poster_path}`}
                alt={result.title}
              />
              <span
                role="button"
                className={styles.favorite_icon}
                onClick={() => {
                  mutate({ id: result.id, favorite: true });
                  toggle(result.id);
                }}
              >
                {isFavorite(result.id) ? "★" : "☆"}
              </span>
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
