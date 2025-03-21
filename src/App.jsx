import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useRef } from "react";

function App() {
  const { movies: mappedMovies } = useMovies();

  function handleSubmit(event) {
    event.preventDefault();
    const { query } = Object.fromEntries(new window.FormData(event.target));
    console.log({ query });
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input name="query" placeholder="Avatar, Interestelar, Matrix..." />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies}></Movies>
      </main>
    </div>
  );
}

export default App;
