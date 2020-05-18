var express = require('express');
var router = express.Router();
let recipe = require('./recipes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET profile page */

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

/* GET recipes page */

router.get('/recipes', function(req, res, next) {
  res.render('recipes');
});


module.exports = router;
