import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movie) {
      res.json({ movies: movie });
    });
});

router.post('/new', function (req, res) {
  console.log(req.body);
  const movieRepository = appDataSource.getRepository(Movie);
  const newMovie = movieRepository.create({
    id: req.body.id,
    title: req.body.title,
    genre_ids: req.body.genre_ids,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
  });

  movieRepository
    .save(newMovie)
    .then(function (savedUser) {
      res.status(201).json({
        message: 'Movie successfully added',
        id: savedUser.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `Movie with id "${newMovie.id}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while adding the movie' });
      }
    });
});

router.delete('/:filmId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;
