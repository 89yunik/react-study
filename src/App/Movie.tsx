import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import styles from "./Movie.module.css";
import clsx from "clsx";

const BASE_URL = "https://api.themoviedb.org/3";

interface MovieResponse {
  page: number;
  results: Array<{
    adult: boolean;
    poster_path: string;
    release_date: string;
    id: number;
    title: string;
  }>;
}
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
  const { data } = useQuery<MovieResponse, unknown>({
    queryFn: getPopularMovies,
    queryKey: ["popular-movies"],
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 10,
  });

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className={clsx(styles.content, styles.grid, styles.scroller)}>
      {data.results.map((result) => (
        <div key={result.id}>
          <img
            src={`https://media.themoviedb.org/t/p/w154/${result.poster_path}`}
          />
          <div className={styles.card_text}>
            <h2 className={styles.card_title}>{result.title}</h2>
            <p>{result.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
