import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FC } from "react"

const BASE_URL = "https://api.themoviedb.org/3"

interface MovieResponse {
  page: number
  results: Array<{
    adult: boolean
    poster_path: string
    release_date: string
    id: number
    title: string
  }>
}
const getPopularMovies = async (): Promise<MovieResponse> => {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
      language: "ko-KR",
    },
  })
  return data
}

export const Movie: FC = () => {
  const { data } = useQuery<MovieResponse, unknown>({
    queryFn: getPopularMovies,
    queryKey: ["popular-movies"],
    gcTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 10,
  })

  if (data === undefined) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {data.results.map((result) => (
        <div key={result.id}>
          <img src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${result.poster_path}`} />
          <h2>{result.title}</h2>
          <div>{result.release_date}</div>
        </div>
      ))}
    </div>
  )
}
