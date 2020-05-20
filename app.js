// npm module imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient;

// application module imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let recipesRouter = require('./routes/recipes');
let { Recipe, User } = require('./models');

// database setup
console.log('<<-- Initiating Mongoose Test -->>');

let connectiong_string = 'mongodb://127.0.0.1:27017/team_green_recipe_blog?retryWrites=true&w=majority';

mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

mongoose.connect(connectiong_string)
    .then(() => {
      console.log('<<-- The MongoDB connection was successful -->>');

      // run mongoDB data creation function here:
      recipe_data();
      user_data();
    })
    .catch((err) => {
      console.log('<<-- Connection Failure: An error has occurred - error -->>', err);
    });

// mock data functions
function recipe_data() {
  console.log('<<-- Creating recipe for database -->>');

  const recipe_one = new Recipe({
      title: 'Best Brownies',
      author: 'Angie Smith',
      main_ingredients: [
          '1/2 cup butter',
          '1 cup white sugar',
          '2 eggs',
          '1 teaspoon vanilla extract',
          '1/3 cup unsweetened cocoa powder',
          '1/2 cup all-purpose flour',
          '1/4 teaspoon salt',
          '1/4 teaspoon baking powder'
      ],
      sub_ingredients: [
          '3 tablespoons butter, softened',
          '3 tablespoons unsweetened cocoa powder',
          '1 tablespoon honey',
          '1 teaspoon vanilla extract',
          '1 cup confectioners\' suger'
      ],
      instructions: 'Preheat oven to 350 degrees F (175 degrees C). Grease and flour an 8-inch square pan. In a large saucepan, melt 1/2 cup butter. Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla. Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder. Spread batter into prepared pan. Bake in preheated oven for 25 to 30 minutes. Do not overcook. To Make Frosting: Combine 3 tablespoons softened butter, 3 tablespoons cocoa, honey, 1 teaspoon vanilla extract, and 1 cup confectioners\' sugar. Stir until smooth. Frost brownies while they are still warm.',
      notes: 'Prep: 25 mins Cook: 35 mins Total: 1 hr Servings: 16 Yield: 16 brownies',
      public: true
  });

  let save_promise_one = recipe_one.save();
  save_promise_one
      .then((saved_recipe) => {
          console.log(saved_recipe);
      })
      .catch((err) => {
          console.log('Error: ', err);
          console.log('<<-- The default set up recipes already exsist in your database -->>');
      });
}
function user_data() {
  console.log('<<-- Creating Users for database -->>');

  const user_one = new User({
    first_name: 'Henry',
    last_name: 'Walter',
    email: 'henry.walter@gmail.com',
    user_name: 'henrywalter',
    password: 'password123',
    member_status: true
  });

  let save_promise_one = user_one.save();
  save_promise_one
      .then((saved_user) => {
          console.log(saved_user);
      })
      .catch((err) => {
          console.log('Error: ', err);
          console.log('<<-- The default set up users already exsist in your database -->>');
      });

}

// setting up express

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/showrecipes', recipesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
