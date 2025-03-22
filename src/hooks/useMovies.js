import withResults from "../mocks/with-results.json";
import withoutResults from "../mocks/no-results.json/";
import { useState } from "react";

export function useMovies({ search }) {
  ///////////// me raya el parametro que se le pone
  const [responseMovies, setResponseMovies] = useState([]);
  const movies = responseMovies.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  const getMovies = async () => {
    if (search) {
      let API = await fetch(
        `http://www.omdbapi.com/?apikey=15638813&s=${search}`
      );
      let res = await API.json();
      console.log(res);
      setResponseMovies(res);
    } else {
      setResponseMovies(withoutResults);
    }
  };

  //   function getMovies() {
  //     if (search) {
  //       fetch(`http://www.omdbapi.com/?apikey=15638813&s=${search}`).then(
  //         (response) => response.json().then((data) => setResponseMovies(data))
  //       );
  //     } else {
  //       setResponseMovies(withoutResults);
  //     }
  //   }

  return { movies: mappedMovies, getMovies };
}
