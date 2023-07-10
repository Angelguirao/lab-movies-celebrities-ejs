// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router()

const Celebrity = require('../models/Celebrity.model');

// all your routes here

// Route for adding new celebrities
router.get('/create', (req, res) => {
    // Render the new celebrity form
    res.render('celebrities/new-celebrity');
  });

  router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
  
    // Create a new Celebrity instance with the form data
    const newCelebrity = new Celebrity({
      name,
      occupation,
      catchPhrase
    });
  
    // Save the new celebrity to the database
    newCelebrity.save()
      .then(() => {
        // Redirect to the list of celebrities
        res.redirect('/celebrities');
      })
      .catch(error => {
        console.log(error);
        // Render the new-celebrity view with an error message
        res.render('celebrities/new-celebrity', { error: 'Error creating celebrity. Please try again.' });
      });
  });

  router.get('/', (req, res) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render('celebrities/celebrities', { celebrities });
      })
      .catch((error) => {
        console.log(error);
        res.render('error', { message: 'Error retrieving celebrities.' });
      });
  });
  
  

module.exports = router