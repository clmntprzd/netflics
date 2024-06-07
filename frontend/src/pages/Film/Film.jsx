import './Film.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
import M18 from './M18.svg';
function Film() {
  function getCookieValue(name) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);
    if (match) {
      return match[2];
    }
  }
  const userid = getCookieValue('userid');
  const [movieData, setMovieData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieImages, setMovieImage] = useState({});
  const [movieLiked, setMovieLikes] = useState({
    Like: true,
    Dislike: false,
  });

  const [movieLikedScreen, setMovieLikedScreen] = useState({
    Like: 'white',
    Dislike: 'white',
  });
  function SendLikes() {
    axios
      .get()
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  }
  function LikeFunction() {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/users/add_likes',
      params: { userid: userid, movieid: filmId },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };
    axios
      .request(options)
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        console.log(response.data);
        setMovieLikes({
          Like: true,
          Dislike: false,
        });
        console.log('Like');
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }
  function DislikeFunction() {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/users/add_dislikes',
      params: { userid: userid, movieid: filmId },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };
    axios
      .request(options)
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        console.log(response.data);
        setMovieLikes({
          Like: false,
          Dislike: true,
        });
        console.log('Dislike');
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }
  function RemoveLikeFunction() {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/users/remove_likes',
      params: { userid: userid, movieid: filmId },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };
    axios
      .request(options)
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        console.log(response.data);
        setMovieLikes({
          Like: false,
          Dislike: false,
        });
        console.log('Dislike');
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }
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

  const queryParameters = new URLSearchParams(window.location.search);
  const filmId = queryParameters.get('id');
  var langId = 'fr-FR';
  var langactuelle = queryParameters.get('lang');
  if (langactuelle === 'en') {
    langId = 'en-US';
  }
  function formatList(numbers) {
    return numbers.join(',');
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/users/check_likes',
      params: { userid: userid, movieid: filmId },
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
      },
    };
    axios
      .request(options)
      .then((response) => {
        // Do something if call succeeded
        console.log('Everything is working so far');
        console.log(response.data);
        if (response.data.liked) {
          setMovieLikedScreen({ Like: 'green', Dislike: 'white' });
        } else {
          if (response.data.disliked) {
            setMovieLikedScreen({ Like: 'white', Dislike: 'red' });
          } else {
            setMovieLikedScreen({ Like: 'white', Dislike: 'white' });
          }
        }
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }, [movieLiked]);
  useEffect(() => {
    var likeslist = [];
    var dislikeslist = [];
    // Do something if call succeeded
    console.log('Everything is working so far');
    likeslist = [filmId];
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
  }, [filmId]);
  useEffect(() => {
    if (filmId) {
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/` + filmId,
        params: { language: langId, page: '1' },
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
          setMovieData(response.data);
          const options2 = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/` + filmId + `/images`,
            params: {},
            headers: {
              accept: 'application/json',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo',
            },
          };
          axios
            .request(options2)
            .then((response2) => {
              // Do something if call succeeded
              setMovieImage(response2.data.backdrops['0'].file_path);
              setIsLoaded(true);
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
    }
  }, [filmId]);
  if (filmId) {
    if (isLoaded) {
      return (
        <div className="FilmRecommandationBigContainer">
          <div
            className="FilmBox"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movieImages})`,
            }}
          >
            <div className="FilmImage">
              <img
                src={
                  'https://media.themoviedb.org/t/p/w440_and_h660_face' +
                  movieData.poster_path
                }
                alt="Poster"
              />
            </div>
            <div className="FilmText">
              <div className="FilmTitle">
                {movieData.title}{' '}
                {!(
                  movieData.genres.find(
                    (element) => element.id == 27 || element.id == 9648
                  ) == undefined
                ) && <img className="logo18" src={M18} alt="Logo 18"></img>}
              </div>
              <div className="Liked">
                <div className="LikeSingle" onClick={LikeFunction}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-thumbs-up"
                    style={{ color: movieLikedScreen.Like }}
                  />
                </div>
                <div className="LikeSingle" onClick={RemoveLikeFunction}>
                  <FontAwesomeIcon
                    icon="fa-solid fa-times"
                    style={{ color: '#ffffff' }}
                  />
                </div>
                <div className="LikeSingle" onClick={DislikeFunction}>
                  {' '}
                  <FontAwesomeIcon
                    icon="fa-solid fa-thumbs-down"
                    style={{ color: movieLikedScreen.Dislike }}
                  />
                </div>
              </div>

              <div className="star-rating">
                <div className="back-stars">
                  <FontAwesomeIcon icon="fa-solid fa-star" />
                  <FontAwesomeIcon icon="fa-solid fa-star" />
                  <FontAwesomeIcon icon="fa-solid fa-star" />
                  <FontAwesomeIcon icon="fa-solid fa-star" />
                  <FontAwesomeIcon icon="fa-solid fa-star" />

                  <div
                    className="front-stars"
                    style={{ width: `${movieData.vote_average * 10}%` }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-star" />
                    <FontAwesomeIcon icon="fa-solid fa-star" />
                    <FontAwesomeIcon icon="fa-solid fa-star" />
                    <FontAwesomeIcon icon="fa-solid fa-star" />
                    <FontAwesomeIcon icon="fa-solid fa-star" />
                  </div>
                </div>
              </div>
              <div className="FilmFacInfo">
                {movieData.release_date.slice(0, 4)}
              </div>
              <div className="FilmFacInfo">Durée : {movieData.runtime}min </div>

              <div className="FilmDescription">{movieData.overview}</div>
            </div>
          </div>
          <div className="SimilairesTitres">Similaires</div>
          <div className="App-moviesList">{listMoviesRender}</div>
        </div>
      );
    } else {
      return (
        <div className="LoadingBox">
          <div className="FilmTitle">Loading...</div>
        </div>
      );
    }
  } else {
    return (
      <a href="/">
        <div className="Error">
          <div>Erreur recherche nulle.</div>
          <div>Retour à l'accueil</div>
        </div>
      </a>
    );
  }
}
export default Film;
