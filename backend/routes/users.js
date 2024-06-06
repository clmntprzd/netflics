import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import Movie from '../entities/movies.js';
const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  console.log(req.body);
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  userRepository
    .save(newUser)
    .then(function (savedUser) {
      res.status(201).json({
        message: 'User successfully created',
        id: savedUser.id,
      });
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.get('/likes', function (req, res) {
  const userId = req.query.id;

  appDataSource
    .getRepository(User)
    .findOne({
      where: { id: userId },
      relations: ['likes', 'dislikes'],
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Extract liked movies from the user entity
      const likedMovies = user.likes.map((movie) => movie.id);

      // Extract disliked movies from the user entity
      const dislikedMovies = user.dislikes.map(
        (movie) => movie.id

        // Include any other movie properties you want to return
      );

      res.json({
        likes: likedMovies,
        dislikes: dislikedMovies,
      });
    });
});

router.get('/show_likes', function (req, res) {
  const userId = req.query.id;

  appDataSource
    .getRepository(User)
    .findOne({
      where: { id: userId },
      relations: ['likes', 'dislikes'],
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Extract liked movies from the user entity
      const likedMovies = user.likes.map((movie) => ({
        id: movie.id,
        poster_path: movie.poster_path,
      }));

      // Extract disliked movies from the user entity
      const dislikedMovies = user.dislikes.map(
        (movie) => ({ id: movie.id, poster_path: movie.poster_path })
        // Include any other movie properties you want to return
      );

      res.json({
        likes: likedMovies,
        dislikes: dislikedMovies,
      });
    });
});

router.get('/add_likes/', async (req, res) => {
  const userId = req.query.userid;
  const movieId = req.query.movieid;
  const userRepository = appDataSource.getRepository(User);
  const movieRepository = appDataSource.getRepository(Movie);
  try {
    // Fetch the user and the movie from the database
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['likes', 'dislikes'],
    });
    const movie = await movieRepository.findOne({
      where: { id: movieId },
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }

    // Add the movie to the user's likes
    user.likes.push(movie);
    await userRepository.save(user);
    try {
      // Fetch the user from the database

      // Find the index of the movie in the user's likes array
      const index = user.dislikes.findIndex(
        (movieit) => movieit.id === parseInt(movieId)
      );

      if (index === -1) {
        console.log('movie not disliked');
      } else {
        // Remove the movie from the user's likes array
        user.dislikes.splice(index, 1);

        // Save the updated user entity
        await userRepository.save(user);
      }
    } catch {
      console.log('Could not remove film');
    }

    res.send({ message: 'Like added successfully' });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).send({ error: 'An error occurred while adding the like' });
  }
});

router.get('/add_dislikes/', async (req, res) => {
  const userId = req.query.userid;
  const movieId = req.query.movieid;
  const userRepository = appDataSource.getRepository(User);
  const movieRepository = appDataSource.getRepository(Movie);
  try {
    // Fetch the user and the movie from the database
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ['likes', 'dislikes'],
    });
    const movie = await movieRepository.findOne({
      where: { id: movieId },
    });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (!movie) {
      return res.status(404).send({ error: 'Movie not found' });
    }

    // Add the movie to the user's likes
    user.dislikes.push(movie);
    await userRepository.save(user);
    try {
      // Fetch the user from the database

      // Find the index of the movie in the user's likes array
      const index = user.likes.findIndex(
        (movieit) => movieit.id === parseInt(movieId)
      );

      if (index === -1) {
        console.log('movie not liked');
      } else {
        // Remove the movie from the user's likes array
        user.likes.splice(index, 1);

        // Save the updated user entity
        await userRepository.save(user);
      }
    } catch {
      console.log('Could not remove film');
    }

    res.send({ message: 'Dislike added successfully' });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).send({ error: 'An error occurred while adding the like' });
  }
});

router.get('/check_likes', function (req, res) {
  const userId = req.query.userid;
  const movieId = parseInt(req.query.movieid);
  appDataSource
    .getRepository(User)
    .findOne({
      where: { id: userId },
      relations: ['likes', 'dislikes'],
    })
    .then(function (user) {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const likedMovies = user.likes.map((movie) => movie.id);

      // Extract disliked movies from the user entity
      const dislikedMovies = user.dislikes.map((movie) => movie.id);

      res.json({
        liked: likedMovies.includes(movieId),
        disliked: dislikedMovies.includes(movieId),
      });
    });
});

export default router;
