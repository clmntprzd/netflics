import './Recommandation.css';
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
  const [moviesList, setMoviesList] = useState([]);
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
  function formatList(numbers) {
    return numbers.join(',');
  }
  useEffect(() => {
    var likeslist = [];
    var dislikeslist = [];
    const optionslikes = {
      method: 'GET',
      url: 'http://localhost:8000/users/likes',
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
        likeslist = response.data.likes;
        dislikeslist = response.data.dislikes;
        const options = {
          method: 'GET',
          url: 'http://localhost:8008',
          params: {
            like: formatList(likeslist),
            dislike: formatList(dislikeslist),
          },
          headers: {
            accept: 'application/json',
          },
        };
        console.log('test du hook');
        axios
          .request(options)
          .then((response2) => {
            // Do something if call succeeded
            console.log('Everything is working so far');
            setMoviesList(response2.data);
            console.log(moviesList);
          })
          .catch((error) => {
            // Do something if call failed
            console.log(error);
          });
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="App-Header">Recommandations</div>
      <ul className="App-moviesList">{listMoviesRender}</ul>
    </div>
  );
}

export default Home;
