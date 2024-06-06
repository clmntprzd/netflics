import './Likes.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Home() {
  function getCookieValue(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
  }
  const userid = getCookieValue('userid');
  const [likedMoviesList, setLikedMoviesList] = useState([]);
  const [dislikedMoviesList, setDislikedMoviesList] = useState([]);
  const likedMoviesRender = likedMoviesList.map((movie) => (
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
  const dislikedMoviesRender = dislikedMoviesList.map((movie) => (
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
  function formatList(numbers) {
    return numbers.join(',');
  }
  useEffect(() => {
    const optionslikes = {
      method: 'GET',
      url: 'http://localhost:8000/users/show_likes',
      params: {
        id: userid,
      },
      headers: {
        accept: 'application/json',
      },
    };
    axios
      .request(optionslikes)
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        setLikedMoviesList(response.data.likes);
        setDislikedMoviesList(response.data.dislikes);
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="App-Header">Likes</div>
      <ul className="App-moviesList">{likedMoviesRender}</ul>
      <div className="App-Header">Dislikes</div>
      <ul className="App-moviesList">{dislikedMoviesRender}</ul>
    </div>
  );
}

export default Home;
