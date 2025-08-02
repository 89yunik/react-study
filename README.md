# React Study Project

React와 Node.js를 사용한 영화 정보 앱입니다.

## 프로젝트 구조

```
react-study/
├── client/                 # React 프론트엔드
│   ├── src/               # React 소스 코드
│   ├── public/            # 정적 파일
│   └── package.json       # 프론트엔드 의존성
├── server/                # Node.js 백엔드
│   ├── src/               # 백엔드 소스 코드
│   ├── dist/              # TypeScript 컴파일 결과
│   └── package.json       # 백엔드 의존성
└── README.md              # 프로젝트 문서
```

## 설치 및 실행

### 1. 환경 변수 설정

```bash
# 환경 변수는 서버/클라이언트 실행 시 자동으로 생성됩니다
# 수동으로 설정하려면:
cp .env.example .env
# .env 파일을 편집하여 API 키를 설정하세요
```

### 2. 프론트엔드 설정

```bash
# 클라이언트 디렉토리로 이동
cd client

# 의존성 설치
npm install
```

### 3. 백엔드 설정

```bash
# 서버 디렉토리로 이동
cd server

# 의존성 설치
npm install
```

### 3. 실행

#### 백엔드 서버 실행

```bash
cd server
npm run dev
# 자동으로 .env 파일이 생성됩니다
```

#### 프론트엔드 서버 실행 (새 터미널에서)

```bash
cd client
npm start
# 자동으로 .env 파일이 생성됩니다
```

## 환경 변수

### 공통 환경 변수 (.env)

```
# TMDB API Keys (공통)
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_TMDB_AUTHENTICATION_KEY=your_tmdb_authentication_key_here

# Backend API URL (프론트엔드용)
REACT_APP_API_BASE_URL=http://localhost:5001

# Server Configuration (백엔드용)
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_AUTHENTICATION_KEY=your_tmdb_authentication_key_here
PORT=5001
NODE_ENV=development
```

**참고**: 루트 디렉토리의 하나의 .env 파일을 server와 client가 공통으로 사용합니다.

## API 엔드포인트

### 인증

- `POST /api/auth/validate-token` - 토큰 검증 및 로그인
- `POST /api/auth/create-session` - 세션 생성
- `GET /api/account/:sessionId` - 계정 정보 조회

### 영화

- `GET /api/movies` - 영화 목록 조회
- `GET /api/movies/:movieId` - 영화 상세 정보 조회
- `GET /api/search/movies` - 영화 검색

### 즐겨찾기

- `POST /api/account/:accountId/favorite` - 즐겨찾기 추가/제거

## 기술 스택

### 프론트엔드 (client/)

- React 19
- TypeScript
- React Query
- React Router
- Axios

### 백엔드 (server/)

- Node.js
- Express.js
- TypeScript
- Axios
- CORS
- Helmet (보안)
- Morgan (로깅)
