import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import dotenv from "dotenv";
import {
  TMDBMovieResponse,
  TMDBMovieDetail,
  TMDBAuthResponse,
  TMDBAccountResponse,
  AuthValidateTokenRequest,
  AuthCreateSessionRequest,
  FavoriteRequest,
  SearchMoviesRequest,
  MoviesRequest,
  EnvironmentVariables,
  ApiResponse,
} from "./types";

dotenv.config();

const app = express();
const PORT = process.env["PORT"] || 5001;

// 환경 변수 타입 체크
const env: EnvironmentVariables = {
  TMDB_API_KEY: process.env["TMDB_API_KEY"] || "",
  TMDB_AUTHENTICATION_KEY: process.env["TMDB_AUTHENTICATION_KEY"] || "",
  PORT: process.env["PORT"] || "5001",
  NODE_ENV: process.env["NODE_ENV"] || "development",
};

// 필수 환경 변수 검증
if (!env.TMDB_API_KEY || !env.TMDB_AUTHENTICATION_KEY) {
  console.error(
    "Missing required environment variables: TMDB_API_KEY or TMDB_AUTHENTICATION_KEY"
  );
  process.exit(1);
}

// 미들웨어 설정
app.use(helmet());
app.use(
  cors({
    origin:
      process.env["NODE_ENV"] === "production"
        ? "https://your-frontend-domain.com"
        : "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());

// TMDB API 기본 설정
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// 인증 토큰 검증 및 로그인
app.post(
  "/api/auth/validate-token",
  async (req: Request<{}, {}, AuthValidateTokenRequest>, res: Response) => {
    try {
      const { username, password, request_token } = req.body;

      const response = await axios.post<TMDBAuthResponse>(
        `${TMDB_BASE_URL}/authentication/token/validate_with_login`,
        {
          username,
          password,
          request_token,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${env.TMDB_AUTHENTICATION_KEY}`,
            "content-type": "application/json",
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error(
        "Token validation error:",
        error.response?.data || error.message
      );
      const errorResponse: ApiResponse = {
        success: false,
        error: "Token validation failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 세션 생성
app.post(
  "/api/auth/create-session",
  async (req: Request<{}, {}, AuthCreateSessionRequest>, res: Response) => {
    try {
      const { request_token } = req.body;

      const response = await axios.post<TMDBAuthResponse>(
        `${TMDB_BASE_URL}/authentication/session/new`,
        {
          request_token,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${env.TMDB_AUTHENTICATION_KEY}`,
            "content-type": "application/json",
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error(
        "Session creation error:",
        error.response?.data || error.message
      );
      const errorResponse: ApiResponse = {
        success: false,
        error: "Session creation failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 계정 정보 조회
app.get(
  "/api/account/:sessionId",
  async (req: Request<{ sessionId: string }>, res: Response) => {
    try {
      const { sessionId } = req.params;

      const response = await axios.get<TMDBAccountResponse>(
        `${TMDB_BASE_URL}/account?api_key=${env.TMDB_API_KEY}&session_id=${sessionId}`
      );

      res.json(response.data);
    } catch (error: any) {
      console.error(
        "Account fetch error:",
        error.response?.data || error.message
      );
      const errorResponse: ApiResponse = {
        success: false,
        error: "Account fetch failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 즐겨찾기 추가/제거
app.post(
  "/api/account/:accountId/favorite",
  async (
    req: Request<{ accountId: string }, {}, FavoriteRequest>,
    res: Response
  ) => {
    try {
      const { accountId } = req.params;
      const { media_id, media_type, favorite, session_id } = req.body;

      const response = await axios.post(
        `${TMDB_BASE_URL}/account/${accountId}/favorite?api_key=${env.TMDB_API_KEY}&session_id=${session_id}`,
        {
          media_id,
          media_type,
          favorite,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      console.error(
        "Favorite toggle error:",
        error.response?.data || error.message
      );
      const errorResponse: ApiResponse = {
        success: false,
        error: "Favorite toggle failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 영화 목록 조회
app.get(
  "/api/movies",
  async (req: Request<{}, {}, {}, MoviesRequest>, res: Response) => {
    try {
      const { page = 1, sort_by = "popularity.desc" } = req.query;

      const response = await axios.get<TMDBMovieResponse>(
        `${TMDB_BASE_URL}/discover/movie?api_key=${env.TMDB_API_KEY}&page=${page}&sort_by=${sort_by}`
      );

      res.json(response.data);
    } catch (error: any) {
      console.error(
        "Movies fetch error:",
        error.response?.data || error.message
      );
      const errorResponse: ApiResponse = {
        success: false,
        error: "Movies fetch failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 영화 상세 정보 조회
app.get(
  "/api/movies/:movieId",
  async (req: Request<{ movieId: string }>, res: Response) => {
    try {
      const { movieId } = req.params;

      const response = await axios.get<TMDBMovieDetail>(
        `${TMDB_BASE_URL}/movie/${movieId}?api_key=${env.TMDB_API_KEY}&append_to_response=credits,videos,images`
      );

      res.json(response.data);
    } catch (error: any) {
      console.error(
        "Movie detail fetch error:",
        error.response?.data || error.message
      );
      const errorResponse: ApiResponse = {
        success: false,
        error: "Movie detail fetch failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 검색 API
app.get(
  "/api/search/movies",
  async (
    req: Request<{}, {}, {}, SearchMoviesRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const { query, page = 1 } = req.query;

      if (!query) {
        const errorResponse: ApiResponse = {
          success: false,
          error: "Query parameter is required",
        };
        res.status(400).json(errorResponse);
        return;
      }

      const response = await axios.get<TMDBMovieResponse>(
        `${TMDB_BASE_URL}/search/movie?api_key=${
          env.TMDB_API_KEY
        }&query=${encodeURIComponent(query)}&page=${page}`
      );

      res.json(response.data);
    } catch (error: any) {
      console.error("Search error:", error.response?.data || error.message);
      const errorResponse: ApiResponse = {
        success: false,
        error: "Search failed",
        details: error.response?.data || error.message,
      };
      res.status(500).json(errorResponse);
    }
  }
);

// 헬스 체크
app.get("/api/health", (_req: Request, res: Response) => {
  const healthResponse: ApiResponse = {
    success: true,
    data: { status: "OK", timestamp: new Date().toISOString() },
  };
  res.json(healthResponse);
});

// 404 핸들러
app.use("*", (_req: Request, res: Response) => {
  const errorResponse: ApiResponse = {
    success: false,
    error: "Route not found",
  };
  res.status(404).json(errorResponse);
});

// 에러 핸들러
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server error:", error);
  const errorResponse: ApiResponse = {
    success: false,
    error: "Internal server error",
  };
  res.status(500).json(errorResponse);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
