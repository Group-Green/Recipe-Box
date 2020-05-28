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

    // Create an if statement. If user render profile page. Else render login page.

  });

  // Find listed recipes in Recipe Page

  const findRecipesA_E = function() {
    const collection = db.collection('recipes');
    return collection.find({'title': /^[a-eA-E]/gm, 'public': true}).toArray();
  }
  const findRecipesF_J = function() {
    const collection = db.collection('recipes');
    return collection.find({'title': /^[f-jF-J]/gm, 'public': true}).toArray();
  }
  const findRecipesK_O = function() {
    const collection = db.collection('recipes');
    return collection.find({'title': /^[k-oK-O]/gm, 'public': true}).toArray();
  }
  const findRecipesP_T = function() {
    const collection = db.collection('recipes');
    return collection.find({'title': /^[p-tP-T]/gm, 'public': true}).toArray();
  }
  const findRecipesU_Z = function() {
    const collection = db.collection('recipes');
    return collection.find({'title': /^[u-zU-Z]/gm, 'public': true}).toArray();
  }


  /* GET recipes page */

  router.get('/recipes', async function(req, res, next) {
    const recipesA_E = await findRecipesA_E();
    const recipesF_J = await findRecipesF_J();
    const recipesK_O = await findRecipesK_O();
    const recipesP_T = await findRecipesP_T();
    const recipesU_Z = await findRecipesU_Z();

    res.render('recipes', {recipesA_E, recipesF_J, recipesK_O, recipesP_T, recipesU_Z});
  });

  /* GET login page */

  router.get('/login', function(req, res, next) {
    res.render('login');
  });

  /* GET Sign-Up Page */

  router.get('/sign-up', function(req, res, next) {
    res.render('sign-up');
  });
});

module.exports = router;
