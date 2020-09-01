const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const data = require('./data');
const images = {
    logo: '/images/logo.png',
    chef: '/images/chef.png'
}

server.use(express.static('public'));
server.use('/images', express.static('./layouts/assets'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
})

server.get('/', function(req, res){
    return res.render('home', {recipes: data, images});
})

server.get('/about', function(req, res){
    return res.render('about', {images});
})

server.get('/recipes', function(req, res){
    return res.render('recipes', {recipes: data, images});
})

server.get('/recipes/:index', function(req, res){
    const recipes = data;
    const recipeIndex = req.params.index;
    const recipe = recipes[recipeIndex];
    return res.render('recipe_detail', {recipe, images});
})

server.listen(5002, function(){
    console.log('server is running');
})