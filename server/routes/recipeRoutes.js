const express=require('express')
const router=express.Router()
const recipeController=require('../controllers/recipeController')



router.route('/').get(recipeController.homepage)
router.route('/categories/').get(recipeController.exploreCateg)
router.route('/recipe/:id').get(recipeController.getRecipeId)
router.route('/categories/:id').get(recipeController.exploreCategById)
router.route('/search').post(recipeController.searchRecipe)
router.route('/explore-latest').get(recipeController.exploreLatest)
router.route('/explore-random').get(recipeController.exploreRandom)
router.route('/submit-recipe').get(recipeController.submitRecipe)
router.route('/submit-recipe').post(recipeController.submitRecipeOnPost)

module.exports=router