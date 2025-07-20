import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import styles from "./Movie.module.css";
import clsx from "clsx";
import { useFavorites } from "./hooks/useFavorites";

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
      const response = await fetch(
        `${BASE_URL}/account/${accountId}/favorite`,
        {
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
          <div className={styles.image_wrapper}>
            <img
              src={`https://media.themoviedb.org/t/p/w154/${result.poster_path}`}
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
          <div className={styles.card_text}>
            <h2 className={styles.card_title}>{result.title}</h2>
            <p>{result.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// 4주차 과제: 영화정보 + 즐겨찾기 정보 합치기
// 1. useFavorites 훅을 수정하여 즐겨찾기 정보를 가져오도록 한다.
// 2. Movie 컴포넌트에서 useFavorites 훅을 사용하여 각 영화의 즐겨찾기 상태를 표시한다.
// 3. 즐겨찾기 버튼을 클릭하면 해당 영화의 즐겨찾기 상태가 토글되도록 한다.
// 4. 뒤로가기나 새로고침 시에도 즐겨찾기 상태가 유지되도록 한다.
