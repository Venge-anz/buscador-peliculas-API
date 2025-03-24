import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("Está vacio");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No sé puede buscar una pelicula con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 carácteres");
      return;
    }

    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  function handleSubmit(event) {
    event.preventDefault();
    getMovies({ search });
  }

  const handleChange = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);
    debounceGetMovies({ newSearch });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avatar, Interestelar, Matrix..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? "Cargando" : <Movies movies={movies}></Movies>}</main>
    </div>
  );
}

export default App;
