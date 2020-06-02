var express = require('express');
const { check, validationResult} = require("express-validator/check");
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let {Recipe} = require('../models');

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

  /* Find User Specific Recipes */
  const userRecipes = function(author_id) {
    const collection = db.collection('recipes');
    console.log(author_id);
    return collection.find({author_id}).toArray();
    // Tried to use 'author_id': window.user._id in query
    // error that window is not defined. Need alternative route
  }

  /* GET home page. */
  router.get('/', async function(req, res, next) {
    const recipes = await findRecipes();
    console.log('Found the following recipes:');
    console.log(recipes);
    res.render('index', {recipes});
  });

  /* GET profile page */
  router.get('/profile', async function(req, res, next) {
    console.log('Is this working', req);
    const userId = req.query.id;
    const recipes = await userRecipes(userId);
    res.render('profile', {recipes});
  });

  // Create new Recipe

  router.post(
    "/recipe_create",
    [
      check("title", "Please Enter a Title")
          .not()
          .isEmpty(),
      check("main_ingredients", "Please Enter Some Ingredients")
          .not()
          .isEmpty(),
      check("instructions", "Please Enter Some Instructions")
          .not()
          .isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      try {
        const newRecipe = new Recipe({ ...req.body});
        await newRecipe.save();
       } catch (error) {
        console.log(error.message);
        res.status(500).send("Error in Saving");
      }
    });

    // Delete Existing Recipe
    router.delete('/recipe_delete', async (req, res) => {
      try {
        const id = req.params._id;
        await Recipe.find({_id: id}).remove().exec();
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Error in Deleting");
      }
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
    const allRecipes = await findRecipes();

    res.render('recipes', {allRecipes, recipesA_E, recipesF_J, recipesK_O, recipesP_T, recipesU_Z});
  });

  /* GET login page */

  router.get('/login', function(req, res, next) {
    res.render('login');
  });

  router.get('/logout', function(req, res, next) {
    res.render('logout');
  });

  /* GET Sign-Up Page */

  router.get('/sign-up', function(req, res, next) {
    res.render('sign-up');
  });
});

module.exports = router;
