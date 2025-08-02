import { FC } from "react";
import { useLocation } from "react-router-dom";

export const MovieDetail: FC = () => {
  const location = useLocation();
  const movieDetail = location.state;
  return (
    <div>
      <img src={`https://media.themoviedb.org/t/p/w154/${movieDetail.poster_path}`} alt={movieDetail.title} />
      <h2>{movieDetail.title}</h2>
      <h3>{movieDetail.original_title}</h3>
      <h3>개요</h3>
      <p>{movieDetail.overview}</p>
    </div>
  );
};
