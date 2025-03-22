import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useState, useEffect, useRef } from "react";

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
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search });

  function handleSubmit(event) {
    event.preventDefault();
    getMovies();
  }

  const handleChange = (e) => {
    updateSearch(e.target.value);
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

          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies}></Movies>
      </main>
    </div>
  );
}

export default App;
