import './Film.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/fontawesome-free-solid';
import M18 from './M18.svg';
function Film() {
  const [movieData, setMovieData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieImages, setMovieImage] = useState({});
  const queryParameters = new URLSearchParams(window.location.search);
  const filmId = queryParameters.get('id');
  var langId = 'fr-FR';
  var langactuelle = queryParameters.get('lang');
  if (langactuelle === 'en') {
    langId = 'en-US';
  }
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
