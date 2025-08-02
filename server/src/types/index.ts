import { Request, Response, NextFunction } from "express";

// TMDB API 응답 타입들
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
  original_title: string;
  original_language: string;
}

export interface TMDBMovieResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface TMDBMovieDetail extends TMDBMovie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }>;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
      profile_path: string | null;
    }>;
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  images: {
    backdrops: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
    posters: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
  };
}

export interface TMDBAuthResponse {
  success: boolean;
  request_token?: string;
  session_id?: string;
}

export interface TMDBAccountResponse {
  id: number;
  name: string;
  username: string;
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string | null;
    };
  };
}

// API 요청/응답 타입들
export interface AuthValidateTokenRequest {
  username: string;
  password: string;
  request_token: string;
}

export interface AuthCreateSessionRequest {
  request_token: string;
}

export interface FavoriteRequest {
  media_id: number;
  media_type: string;
  favorite: boolean;
  session_id: string;
}

export interface SearchMoviesRequest {
  query: string;
  page?: number;
}

export interface MoviesRequest {
  page?: number;
  sort_by?: string;
  language?: string;
}

// Express 미들웨어 타입
export interface CustomRequest extends Request {
  user?: any;
}

export type CustomResponse = Response;
export type CustomNextFunction = NextFunction;

// 환경 변수 타입
export interface EnvironmentVariables {
  TMDB_API_KEY: string;
  TMDB_AUTHENTICATION_KEY: string;
  PORT: string;
  NODE_ENV: string;
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}
