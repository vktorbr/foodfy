const fs = require('fs');
const data = require('../data.json');

exports.index = function(req, res){
    res.render('admin/index', { recipes: data.recipes });
}

exports.create = function(req, res){
    return res.render('admin/create');
}

exports.show = function(req, res){
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function(recipe){
        return id == recipe.id;
    })

    if(!foundRecipe){
        return res.send("recipe not found!");
    }

    res.render('admin/show', { recipe: foundRecipe });
}

exports.edit = function(req, res){
    const { id } = req.params;

    const foundRecipe = data.recipes.find(function(recipe){
        return recipe.id == id;
    })

    if(!foundRecipe) return res.send("Recipe not found!");

    res.render('admin/edit', { recipe: foundRecipe });
}

exports.post = function(req, res){
    const keys = Object.keys(req.body);

    for (const key of keys) {
        if(req.body[key] == '') return res.send('Please, fill all fields');
    }
    
    let id = 1;

    const lastRecipe = data.recipes[data.recipes.length - 1];

    if(lastRecipe){
        id = lastRecipe.id + 1;
    }

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
    }
    data.recipes.push(recipe);

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return 'write file error!';

        res.redirect('/admin/recipes');
    })


    
}

exports.put = function(req, res){
    const { id } = req.body;
    let index = 0;

    const foundRecipe = data.recipes.find(function(recipe, foundIndex){
        if(recipe.id == id){
            index = foundIndex;
            return true;
        }
    }) 

    const ingredients = req.body.ingredients.filter(function(ingredient){
        return ingredient != '';
    })

    const steps = req.body.steps.filter(function(step){
        return step != '';
    })

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id),
        ingredients,
        steps
    }

    data.recipes[index] = recipe;


    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file error!");
    })

    return res.redirect(`/admin/recipes/${id}`);
}

exports.delete = function(req, res){
    const { id } = req.body;

    const filteredRecipes = data.recipes.filter(function(recipe){
        return id != recipe.id;
    })

    data.recipes = filteredRecipes;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file error!");

        return res.redirect('/admin/recipes');
    })
}