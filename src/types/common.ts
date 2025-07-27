export interface MovieResponse {
  page: number;
  results: Array<{
    adult: boolean;
    poster_path: string;
    release_date: string;
    id: number;
    title: string;
  }>;
}
