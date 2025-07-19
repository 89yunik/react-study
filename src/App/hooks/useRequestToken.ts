import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useRequestToken = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestToken = searchParams.get("request_token");

    if (!requestToken) return;

    const asyncFun = async () => {
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
      const sessionId = await sessionResponse.json();
    };

    asyncFun();
  }, [searchParams]);
};
