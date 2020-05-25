var express = require('express');
var router = express.Router();
let recipe = require('./recipes');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

// Connection Url
const url = 'mongodb://127.0.0.1:27017/team_green_recipe_blog?retryWrites=true&w=majority';

// Database Name
const dbName = 'team_green_recipe_blog';
let db;

/* Connect to MongoDB */
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log('Connected successfully to Database');

  db = client.db(dbName);

  /* Find all Recipes */
  const findRecipes = function() {
    const collection = db.collection('recipes');
    return collection.find({'public': true}).toArray();
  }

  /* GET home page. */
  router.get('/', async function(req, res, next) {
    const recipes = await findRecipes();
    console.log('Found the following recipes:');
    console.log(recipes);
    res.render('index', {recipes});
  });

  /* GET profile page */

  router.get('/profile', function(req, res, next) {
    res.render('profile');
  });

  /* GET recipes page */

  router.get('/recipes', function(req, res, next) {
    res.render('recipes');
  });

  /* GET login page */

  router.get('/login', function(req, res, next) {
    res.render('login');
  });
});
module.exports = router;
