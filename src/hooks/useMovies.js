import withResults from "../mocks/with-results.json";
import withoutResults from "../mocks/no-results.json";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      //Si la nueva busqueda es igual a la anterior no se renderiza
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.menssage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { getMovies, movies: getSortedMovies, loading };
}
