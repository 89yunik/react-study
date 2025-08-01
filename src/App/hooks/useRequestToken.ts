import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useRequestToken = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestToken = searchParams.get("request_token");
    const id = searchParams.get("id");
    const password = searchParams.get("password");

    if (!requestToken) return;

    const asyncFun = async () => {
      const sessionResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login`, {
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
      const sessionId = (await sessionResponse.json()).request_token;

      if (!sessionId) return;

      const accountResponse = await fetch(`https://api.themoviedb.org/3/account?api_key=${process.env.REACT_APP_TMDB_API_KEY}&session_id=${sessionId}`).then((res) => res.json());

      localStorage.setItem("accountId", accountResponse.id);
    };

    asyncFun();
  }, [searchParams]);
};
