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
    },
    poster_path: {
      type: String,
      unique: true,
    },
    popularity: {
      type: 'float',
    },
  },
  relations: {
    users: {
      type: 'many-to-many',
      target: 'User',
      mappedBy: 'movies', // Refers to the property in the User entity that holds the relationship
    }
  }
  
  
});

export default Movie;
