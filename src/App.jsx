import "./App.css";

import responseMovies from "./mocks/with-results.json";

import { Movies } from "./components/Movies";

const movies = responseMovies.Search;

function App() {
  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form">
          <input placeholder="Avatar, Interestelar, Matrix..." />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies}></Movies>
      </main>
    </div>
  );
}

export default App;
