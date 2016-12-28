var express = require('express');
var router = express.Router();
var moviedata=require('./../controllers').syncmovies;
var listmovies=require('./../controllers').listmovies;





/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs');
});

router.get('/movies', moviedata.getMovies);
router.get('/getmovies/:query', listmovies.getlistMovies);
router.get('/moviebyId/:query', listmovies.getMoviesId);


module.exports = router;
