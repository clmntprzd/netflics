import './Search.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../netflicslogo.ico';
function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const queryParameters = new URLSearchParams(window.location.search);
  const [currentSearch, setCurrentSearch] = useState({
    search: false,
    request: '',
  });
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

  function SearchLaunch() {
    setCurrentSearch({
      search: true,
      request: document.getElementById('request').value,
    });
  }
  window.onload = function () {
    var input = document.getElementById('request');

    // Execute a function when the user presses a key on the keyboard
    input.addEventListener('keypress', function (event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        // Cancel the default action, if needed
        // Trigger the button element with a click
        SearchLaunch();
      }
    });
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
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/movies/search',
      params: { language: langId, query: currentSearch.request },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
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
  }, [currentSearch]);

  return (
    <div className="App">
      <div className="searchBigContainer">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Rechercher..."
            name="request"
            id="request"
          />
          <div className="search-icon" onClick={SearchLaunch}>
            <FontAwesomeIcon
              icon="fa-solid fa-search"
              style={{ color: '#ffffff' }}
            />
          </div>
        </div>
      </div>
      {currentSearch.search ? (
        <ul className="App-moviesList">{listMoviesRender}</ul>
      ) : (
        <div className="NoSearch">
          Lancer une recherche parmi notre collection
        </div>
      )}
    </div>
  );
}

export default Home;
