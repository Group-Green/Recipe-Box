var express = require('express');
const { check, validationResult} = require("express-validator/check");
var router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
const { v4: uuid } = require('uuid');
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
  };

  /* Find User Specific Recipes */
  const userRecipes = function(author_id) {
    const collection = db.collection('recipes');
    console.log(author_id);
    return collection.find({author_id}).toArray();
    // Tried to use 'author_id': window.user._id in query
    // error that window is not defined. Need alternative route
  };

  // Find listed recipes in Recipe Page
  const findRecipesByRegex = function(regex) {
    const collection = db.collection('recipes');
    return collection.find({'title': regex, 'public': true}).toArray();
  };

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
        const newRecipe = new Recipe({ ...req.body, _id: uuid()});
        await newRecipe.save();
        res.status(201).send('Created');
       } catch (error) {
        console.log(error.message);
        res.status(500).send("Error in Saving");
      }
    });

  // Delete Existing Recipe
  router.delete('/recipe_delete/:id', async (req, res) => {
    try {
      const _id = req.params.id;
      const response = await Recipe.find({_id}).deleteOne();
      console.log(response);
      res.status(200).send('Recipe deleted');
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error in Deleting");
    }
  });

  /* GET recipes page */
  router.get('/recipes', async function(req, res, next) {
    const recipesA_E = await findRecipesByRegex(/^[a-eA-E]/gm);
    const recipesF_J = await findRecipesByRegex(/^[f-jF-J]/gm);
    const recipesK_O = await findRecipesByRegex(/^[k-oK-O]/gm);
    const recipesP_T = await findRecipesByRegex(/^[p-tP-T]/gm);
    const recipesU_Z = await findRecipesByRegex(/^[u-zU-Z]/gm);
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
