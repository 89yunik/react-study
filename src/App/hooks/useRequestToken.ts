import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useRequestToken = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestToken = searchParams.get("request_token");

    if (!requestToken) return;

    const asyncFun = async () => {
      const sessionResponse = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            request_token: requestToken,
          }),
        }
      );
      const sessionId = await sessionResponse.json();
    };

    asyncFun();
  }, [searchParams]);
};

// 과제: 영화 찜 구현하기 (새로고침이나 뒤로가기 등으로 다시 돌아왔을때도 유지되게 하기)
