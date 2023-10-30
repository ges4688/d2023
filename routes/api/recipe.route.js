var express = require('express')
var router = express.Router()
var RecipeController = require('../../controllers/recipes.controller');

router.get('/details/:id', RecipeController.getDetails);
router.post('/create/', RecipeController.createRecipe);
router.delete('/delete/:id', RecipeController.deleteRecipe);
router.put('/publish/:id', RecipeController.deleteRecipe);
router.get('/getTopRecipes/', RecipeController.getTopRecipes);
router.get('/getRecipes/', RecipeController.getRecipes);
router.get('/filterRecipes/', RecipeController.filterRecipes);
router.get('/myRecipes/:token', RecipeController.myRecipes);
router.post('/rating', RecipeController.postRating);

module.exports = router;
