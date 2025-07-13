import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { Movie } from "./Movie";
import { useRequestToken } from "./hooks/useRequestToken";

const App: FC = () => {
  const queryClient = new QueryClient();

  // 버튼 클릭으로 fetch해서 request token을 받아온다
  // useEffect로 session id 생성하기

  const handleClick = async () => {
    const tokenResponse = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTHENTICATION_KEY}`,
        },
      }
    );
    const requestToken = await tokenResponse.json();
    const redirectUrl = new URLSearchParams({
      redirect_to: "http://localhost:3001/",
    });

    //URL로 이동시켜주기
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken.request_token}?${redirectUrl}`;
  };

  // queryClient.invalidateQueries()

  useRequestToken();

  return (
    <QueryClientProvider client={queryClient}>
      <Movie></Movie>
      <button onClick={handleClick}>로그인하기</button>
    </QueryClientProvider>
  );
};

export default App;
