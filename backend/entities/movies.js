import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
    },
    title: {
      type: String,
    },
    overview: {
      type: String,
      unique: true,
    },
    poster_path: {
      type: String,
      unique: true,
    },
  },
});

export default Movie;
