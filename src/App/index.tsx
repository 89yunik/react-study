import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { Movie } from "./Movie";

const App: FC = () => {
  const queryClient = new QueryClient();

  // queryClient.invalidateQueries()

  return (
    <QueryClientProvider client={queryClient}>
      <Movie></Movie>
      <div>123123123123</div>
    </QueryClientProvider>
  );
};

export default App;
