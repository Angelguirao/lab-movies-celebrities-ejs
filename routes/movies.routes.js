// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router()

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

// all your routes here

// Route for adding new movies
router.get('/create', (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('movies/new-movie', { celebrities });
    })
    .catch((error) => {
      console.log(error);
      res.render('error', { message: 'Error retrieving celebrities.' });
    });
});

  router.post('/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
  
    // Create a new Movie instance with the form data
    const newMovie = new Movie({
      title,
      genre,
      plot,
      cast
    });
  
    // Save the new movie to the database
    newMovie
      .save()
      .then(() => {
        res.redirect('/movies');
      })
      .catch((error) => {
        console.log(error);
        res.render('error', { message: 'Error creating movie.' });
      });
  });

  router.get('/', (req, res) => {
    Movie.find()
      .then((movies) => {
        res.render('movies/movies', { movies });
      })
      .catch((error) => {
        console.log(error);
        res.render('error', { message: 'Error retrieving movies.' });
      });
  });
  
module.exports = router