import './Home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import logo from '../../netflicslogo.ico';
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
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: { language: langId, page: pageId },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
    },
  };
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
      <div className="pageSelectorBottom">
        {pageId != 1 && (
          <a href={'/?page=' + (parseInt(pageId) - 1)}>
            {' '}
            <div className="pageSelector">
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-left"
                style={{ color: '#ffffff' }}
              />
            </div>
          </a>
        )}

        <div className="pageSelector">{pageId}</div>
        <a href={'/?page=' + (parseInt(pageId) + 1)}>
          {' '}
          <div className="pageSelector">
            <FontAwesomeIcon
              icon="fa-solid fa-arrow-right"
              style={{ color: '#ffffff' }}
            />
          </div>
        </a>
      </div>
    </div>
  );
}

export default Home;
