import { FC } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import clsx from "clsx";
import { useFavorites } from "../../common/hooks/useFavorites";
import { useMutation } from "@tanstack/react-query";

export const MovieDetail: FC = () => {
  const { isFavorite, toggle } = useFavorites();

  const BASE_URL = "https://api.themoviedb.org/3";

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
  const location = useLocation();
  const movieDetail = location.state;
  return (
    <div className={clsx(styles.movie_detail)}>
      <div className={clsx(styles.poster_wrapper)}>
        <img className={clsx(styles.poster)} src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path}`} alt={movieDetail.title} />
        <button
          className={clsx(styles.favorite_icon, styles.reset_button)}
          onClick={() => {
            mutate({ id: movieDetail.id, favorite: true });
            toggle(movieDetail.id);
          }}
        >
          {isFavorite(movieDetail.id) ? "★" : "☆"}
        </button>
      </div>
      <div className={clsx(styles.movie_texts)}>
        <h2 className={clsx(styles.title)}>{movieDetail.title}</h2>
        <h3>{movieDetail.original_title}</h3>
        <h3>개요</h3>
        <p className={clsx(styles.overview)}>{movieDetail.overview}</p>
      </div>
    </div>
  );
};
