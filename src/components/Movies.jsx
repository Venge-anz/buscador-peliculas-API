const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movies" key={movie.id}>
          <img src={movie.poster} alt={movie.title}></img>
          <div className="title-year">
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const NoMoviesResoult = () => {
  return <p>No se encontraron resultados</p>;
};

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResoult />;
}
