const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();

const data = require('./data.json');
const images = {
  logo: '/images/logo.png',
  chef: '/images/chef.png',
};

server.use(express.urlencoded({ extended:true }));
server.use(express.static('public'));
server.use('/images', express.static('./layouts/assets'));
server.use(methodOverride('_method'));
server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  noCache: true,
  autoescape: false,
});

server.get('/', function (req, res) {
  return res.render('home', { recipes: data.recipes});
});

server.get('/about', function (req, res) {
  return res.render('about');
});

server.get('/recipes', function (req, res) {
  return res.render('recipes', { recipes: data.recipes });
});

server.get('/recipes/:index', function (req, res) {

  const recipes = data.recipes;
  const recipeIndex = req.params.index;
  const recipe = recipes[recipeIndex];
  return res.render('recipe_detail', { recipe });
});

server.listen(5000, function () {
  console.log('server is running');
});
