import './Genres.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [movieName, setMovieName] = useState('Exemples');
  const [moviesList, setMoviesList] = useState([]);

  const listMoviesRender = moviesList.map((movie) => (
    <li key={movie.id}>{movie.name}</li>
  ));
  useEffect(() => {
    console.log('test du hook');
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
        },
      })
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        setMoviesList(response.data.genres);
        console.log(moviesList);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, []);

  function handleChange(e) {
    setMovieName(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Trouver des films parmi une collection de plusieurs milliers</p>
      </header>
      <input value={movieName} onChange={handleChange} />
      <p>Recherche actuelle: {movieName}</p>
      <button onClick={() => setMovieName('Exemple de films')}>Reset</button>
      <ul className="App-genresList">{listMoviesRender}</ul>
    </div>
  );
}

export default Home;
