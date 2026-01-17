import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, SetStateAction, useState, Dispatch, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Movie } from "../domains/Movies/components";
import { MovieDetail } from "../domains/Movies/components/MovieDetail";
import { useRequestToken } from "../App/hooks/useRequestToken";
import { Login } from "../domains/Login/components";
import Header from "./Header";
import { Provider as JotaiProvider } from "jotai";

const Pages: FC = () => {
  const queryClient = new QueryClient();

  // 버튼 클릭으로 fetch해서 request token을 받아온다
  // useEffect로 session id 생성하기

  // queryClient.invalidateQueries()

  useRequestToken();

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Movie />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </QueryClientProvider>
    </JotaiProvider>
  );
};

export default Pages;

// Context API
