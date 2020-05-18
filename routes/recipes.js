var express = require('express');
var router = express.Router();

let { Recipe } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {

    let recipe_query = Recipe.find({});
    recipe_query.sort({ title: 1 });
    let find_promise = recipe_query.exec();
    find_promise
        .then((recipes) => {
            res.json(recipes);
            console.log(recipes);
        })
        .catch((err) => {
            res.status(500).json(err);
        });

    router.post('/', function(req, res, next) {
        const new_recipe = new Recipe(req.body);

        let save_promise = new_recipe.save();
        save_promise
            .then((saved_recipe) => {
                res.json(saved_recipe);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
        });

});

module.exports = router;

