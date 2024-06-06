import './Genres.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  var pageId = queryParameters.get('page');
  if (pageId == null) {
    pageId = 1;
  }
  var langId = 'fr-FR';
  var langactuelle = queryParameters.get('lang');
  if (langactuelle === 'en') {
    langId = 'en-US';
  }
  console.log(pageId);

  const listMoviesRender = moviesList.map((movie) => (
    <a href={'/film?id=' + movie.id}>
      <li className="list-item" key={movie.id}>
        <img
          src={
            'https://media.themoviedb.org/t/p/w440_and_h660_face' +
            movie.poster_path
          }
          alt="Poster"
          width="300px"
        />
      </li>
    </a>
  ));

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8008',
      params: { like: '1022789,653346', dislike: '' },
      headers: {
        accept: 'application/json',
      },
    };
    console.log('test du hook');
    axios
      .request(options)
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        setMoviesList(response.data.results);
        console.log(moviesList);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <ul className="App-moviesList">{listMoviesRender}</ul>
    </div>
  );
}

export default Home;
