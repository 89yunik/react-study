import { FC } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MovieDetail.module.css";
import clsx from "clsx";

export const MovieDetail: FC = () => {
  const location = useLocation();
  const movieDetail = location.state;
  return (
    <div className={clsx(styles.movie_detail)}>
      <div className={clsx(styles.poster_wrapper)}>
        <img className={clsx(styles.poster)} src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail.poster_path}`} alt={movieDetail.title} />
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
