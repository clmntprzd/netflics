import typeorm from 'typeorm';
import Movie from './movies.js';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
  },
  relations: {
    movies: {
      type: 'many-to-many',
      target: 'Movie',
      joinTable: true,
      cascade: true,
    }
  }
});

export default User;