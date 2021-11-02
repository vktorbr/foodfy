const Recipe = require("../models/recipe");

module.exports = {
    index(req, res){
        Recipe.all(function(recipes){
            return res.render("admin/recipes/index", { recipes });
        })
    },
    create(req, res){
        Recipe.chefsSelectOptions(function(options){
            return res.render('admin/recipes/create', { chefs: options });
        })
    },
    post(req, res){
        const keys = Object.keys(req.body);
        
        if(!req.body["chef_id"]) return res.send("Fill all fields!");
        for (const key of keys) {
            if(req.body[key] == "") return res.send("Fill all fields!");
        }

        Recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`);
        })
    },
    show(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!");
    
            return res.render('admin/recipes/show', { recipe });
        })
    },
    edit(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe not found!");

            Recipe.chefsSelectOptions(function(options){
                return res.render("admin/recipes/edit", { recipe, chefs: options });
            })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body);
        
        for (const key of keys) {
            if(req.body[key] == "") return res.send("Fill all fields!");
        }

        Recipe.update(req.body, function(){

            return res.redirect(`/admin/recipes/${req.body.id}`);
        })
    },
    delete(req, res){
        Recipe.delete(req.body.id, function(){
            return res.redirect(`/admin/recipes`);
        })
    },
    home(req, res){
        Recipe.all(function(recipes){
            return res.render("home", { recipes });
        })
    },
    about(req, res){
        return res.render("about");
    }
}