import express from 'express';
import { Like } from 'typeorm';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';
const router = express.Router();
const ITEMS_PER_PAGE = 40; // Number of items per page
router.get('/', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .find({})
    .then(function (movie) {
      res.json({ results: movie });
    });
});

router.get('/popular', function (req, res) {
  const page = parseInt(req.query.page, 10); // Default to page 1 if pageId is not provided
  const skip = (page - 1) * ITEMS_PER_PAGE;
  appDataSource
    .getRepository(Movie)
    .find({
      order: {
        popularity: 'DESC',
      },
      skip: skip,
      take: ITEMS_PER_PAGE,
    })
    .then(function (movie) {
      res.json({ results: movie });
    });
});

router.get('/search', function (req, res) {
  const searchTerm = req.query.query || '';

  if (!searchTerm) {
    return res.status(400).send({ error: 'Title query parameter is required' });
  }
  appDataSource
    .getRepository(Movie)
    .find({
      where: {
        title: Like(`%${searchTerm}%`),
      },
    })
    .then(function (movie) {
      res.json({ results: movie });
    });
});

export default router;
