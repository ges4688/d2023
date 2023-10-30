var RecipeService = require('../services/recipe.service');
var UserService = require('../services/user.service');

_this = this;

exports.getDetails = async function (req, res, next) {
    try {
        var isMine = false;
        let token = req.query.token;
        var user;
        if (token != null) {
            user = await UserService.getUser(token)
        }
        let filtro = {id: req.params.id};
        var recipe = await RecipeService.getRecipe(filtro, user);
        
        if (user != null && recipe[0].user == user.id) {
            isMine = true;
        }
        return res.status(200).json({status: 200, data: {recipe: recipe, isMine: isMine}, message: "Succesfully Recipe Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.myRecipes = async function (req, res, next) {
    let token= req.params.token
    try {
        var recipes = await RecipeService.getRecipesByUser(token);
        return res.status(200).json({status: 200, data: recipes, message: "Succesfully Recipes Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createRecipe = async function (req, res, next) {
    var recipe = {
        name: req.body.recipe.name,
        description: req.body.recipe.description,
        urlImage: req.body.recipe.urlImage,
        ingredients: req.body.recipe.ingredients,
        difficulty: req.body.recipe.difficulty,
        vegan: (req.body.recipe.vegan == "on") ? true : false,
        celiac: (req.body.recipe.celiac == "on") ? true : false,
        user: req.body.recipe.user,
        steps: req.body.recipe.steps,
        category: req.body.recipe.category,
        status: req.body.recipe.status ? req.body.recipe.status : 'active'
    }
    try {
        var createdRecipe = await RecipeService.createRecipe(recipe)
        return res.status(201).json({createdRecipe, message: "Succesfully Created Recipe"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Recipe creation was Unsuccesfull"})
    }
}

exports.deleteRecipe = async function (req, res, next) {
    let recipe = req.params.id;
    let token = req.query.token;
    try {
        var deletedRecipe = await RecipeService.deleteRecipe(recipe, token)
        return res.status(201).json({deletedRecipe, message: "Succesfully Deleted Recipe"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Recipe deletion was Unsuccesfull"})
    }
}

exports.publishRecipe = async function (req, res, next) {
    let recipe = req.params.id;
    let token = req.query.token;
    try {
        var publishedRecipe = await RecipeService.publishRecipe(recipe, token)
        return res.status(201).json({publishedRecipe, message: "Succesfully Published Recipe"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Recipe deletion was Unsuccesfull"})
    }
}

exports.getTopRecipes = async function (req, res, next) {
    var limit = 10;
    try {
        var topRecipes = await RecipeService.getTopRecipes(limit);
        return res.status(200).json({status: 200, data: topRecipes, message: "Succesfully Top Recipes Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getRecipes = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let searchQuery = {
        description: req.query.description ? req.query.description : ""
    }

    try {
        var recipes = await RecipeService.getRecipes({}, page, limit, searchQuery);
        return res.status(200).json({status: 200, data: recipes, message: "Succesfully Recipes Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.filterRecipes = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let searchQuery = {
        description: req.query.description ? req.query.description : "",
        category: req.query.category ? req.query.category : "",
        difficulty: req.query.difficulty ? req.query.difficulty : "",
        vegan: req.query.vegan,
        celiac: req.query.celiac,
    }

    try {
        var recipes = await RecipeService.filterRecipes({}, page, limit, searchQuery);
        return res.status(200).json({status: 200, data: recipes, message: "Succesfully Recipes Filtered"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.postRating = async function (req, res, next) {
    var Rating = {
        token: req.body.rating.token,
        rating: req.body.rating.rating,
        recipeId: req.body.rating.recipeId
    }
    try {
        var updatedRecipe = await RecipeService.createRating(Rating)
        return res.status(201).json({updatedRecipe, message: "Succesfully posted rating"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Posting rating was Unsuccesfull"})
    }
}