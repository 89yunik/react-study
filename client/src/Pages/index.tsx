import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Movie } from "../domains/Movies/components";
import { MovieDetail } from "../domains/Movies/components/MovieDetail";
import { Login } from "../domains/Login/components";

const Pages: FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default Pages;
