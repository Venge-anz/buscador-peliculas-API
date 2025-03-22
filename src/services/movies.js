const API_KEY = "15638813";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    if (search) {
      const API = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );
      const res = await API.json();

      const movies = res.Search;

      return movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }));
    }
  } catch (error) {
    throw new Error("Error searching movies");
  }
};
