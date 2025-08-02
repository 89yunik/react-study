import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Login: FC = () => {
  const location = useLocation();
  const movieDetail = location.state;
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const tokenResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/new`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
        },
      });
      const requestToken = (await tokenResponse.json()).request_token;

      const loginResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: id,
          password,
          request_token: requestToken,
        }),
      });
      const success = (await loginResponse.json()).success;

      if (!success) {
        throw new Error("로그인 실패");
      }

      const sessionResponse = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          request_token: requestToken,
        }),
      });
      const sessionId = (await sessionResponse.json()).session_id;

      const accountResponse = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`).then((res) => res.json());

      localStorage.setItem("accountId", accountResponse.id);

      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input
        id="id"
        type="text"
        placeholder="id"
        value={id}
        onChange={(e) => {
          // 한 글자 가져오는 방법
          // as를 쓴 이유는 e.nativeEvent를 React에선 그냥 Event라고 치부해버림.
          // 리액트에게 이건 InputEvent라고 한번 더 알려주는 것.
          console.log((e.nativeEvent as InputEvent).data);
          setId(e.target.value);
        }}
      />
      <input
        id="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleClick}>로그인하기</button>
    </div>
  );
};

// 로그인 및 마이페이지 접속가능한 Header 만들기(이 헤더는 모든 페이지에서 접속이 가능해야 함)
// Pages 안에 넣으면 됨. (Header 같은 경우는 어떤 domain에도 속하지 않으니 디렉토리 구조 잘 생각해서 만들기)
// 영화 상세페이지 UI 만들기 + 상세페이지 내에서 즐겨찾기 ON-OFF 가능하게 만들기

// 카밋할 때 주의사항
// 한 기능을 만들면, 그 기능에 대한 커밋을 즉각 push하기
// ex) 상세페이지 UI 만들기 + 즐겨찾기 (x)

// 상세페이지 UI 만들기
// 상세페이지 내 즐겨찾기

// feat, refactor, ui, chore, fix

// ex) feat: 상세페이지 즐겨찾기 추가
// ex) ui: Header css 변경
// ex) refactor: 로그인 로직 변경
// ex) chore: 자잘한 UI 변경사항 반영(코드리뷰 반영)
