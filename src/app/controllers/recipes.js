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
    }
}
    /*
    const ingredients = req.body.ingredients.filter(function(ingredient){
        return ingredient != '';
    })

    const steps = req.body.steps.filter(function(step){
        return step != '';
    })

    const recipe = {
        id,
        ...req.body,
        ingredients,
        steps
    }*/

