/* Working on the authentication of the user who tries to login. I was trying to search the database for any username
    and password match, but I am unable to use require in the front end. I need to find another way to make this work. 
    ******DO NOT DELETE: lines 11-18 and lines 40-53 */


// var express = require('express');
// var router = express.Router();
// let MongoClient = require('mongodb').MongoClient;
// let assert = require('assert');

// Form Items
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginFormSubmit');
const loginErrorMsg = document.getElementById('loginErrorMsg');

// // Connection URL
// const url = 'mongodb://127.0.0.1:27017/team_green_recipe_blog?retryWrites=true&w=majority';

// // Database Name
// const dbName = 'team_green_recipe_blog';
// let db;

// /* Connect to MongoDB */
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log('Connected successfully to Database');

//   db = client.db(dbName);

//   /* Find all Recipes */
//   const findRecipes = function() {
//     const collection = db.collection('recipes');
//     return collection.find({'public': true}).toArray();
//   }

loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const username = loginForm.userName.value;
    const password = loginForm.password.value;

    if(username == 'user' && password == '123') {
        alert('You have successfully logged in.');
    
    } else {
        loginErrorMsg.style.opacity = 1;
    }
    });
// });
