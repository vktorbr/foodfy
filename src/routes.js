const express = require("express");
const recipes = require("./app/controllers/recipes");
const chefs = require("./app/controllers/chefs");
const routes = express.Router();

//user
routes.get("/", recipes.home);
routes.get("/about", recipes.about);
routes.get("/chefs", chefs.indexClient);
routes.get("/recipes", recipes.list);
routes.get("/searchRecipes", recipes.search);
routes.get("/recipes/:id", recipes.details);

//admin recipes
routes.get("/admin/recipes", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);

routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);


//admin chefs
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/create", chefs.create);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);

routes.post("/admin/chefs", chefs.post);
routes.put("/admin/chefs", chefs.put);
routes.delete("/admin/chefs", chefs.delete);

module.exports = routes;