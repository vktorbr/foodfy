const Chef = require("../models/chef");

module.exports = {
    index(req, res){
        Chef.all(function(chefs){
            return res.render("admin/chefs/index", { chefs });
        })
    },
    create(req, res){
        return res.render("admin/chefs/create");
    },
    post(req, res){
        const keys = Object.keys(req.body);
        
        for (const key of keys) {
            if(req.body[key] == "") return res.send("Fill all fields!");
        }

        Chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`);
        })
    },
    show(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef not found!");

            Chef.findRecipesByChef(req.params.id, function(recipes){

                return res.render("admin/chefs/show", { chef, recipes });
            })
        })
    },
    edit(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef not found!");
            
            return res.render("admin/chefs/edit", { chef });
        })
    },
    put(req, res){
        const keys = Object.keys(req.body);
        
        for (const key of keys) {
            if(req.body[key] == "") return res.send("Fill all fields!");
        }

        Chef.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        Chef.find(req.body.id, function(chef){
            if(chef.total == 0){
                Chef.delete(req.body.id, function(){
                    return res.redirect("/admin/chefs");
                })
            }else{
                return res.send("Chefs que possuem receitas não podem ser deletados!");
            }
        })
    },
    indexClient(req, res){
        Chef.all(function(chefs){
            return res.render("chefs", { chefs });
        })
    }
}