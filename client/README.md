# React Study Project

React와 Node.js를 사용한 영화 정보 앱입니다.

## 프로젝트 구조

```
react-study/
├── src/                    # React 프론트엔드
├── backend/               # Node.js 백엔드
├── public/               # 정적 파일
└── package.json          # 프론트엔드 의존성
```

## 설치 및 실행

### 1. 프론트엔드 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp env.example .env
# .env 파일을 편집하여 API 키를 설정하세요
```

### 2. 백엔드 설정

```bash
# 백엔드 디렉토리로 이동
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
cp env.example .env
# .env 파일을 편집하여 TMDB API 키를 설정하세요
```

### 3. 실행

#### 백엔드 서버 실행

```bash
cd backend
npm run dev
```

#### 프론트엔드 서버 실행 (새 터미널에서)

```bash
npm start
```

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

### 프론트엔드

- React 19
- TypeScript
- React Query
- React Router
- Axios

### 백엔드

- Node.js
- Express.js
- TypeScript
- Axios
- CORS
- Helmet (보안)
- Morgan (로깅)
