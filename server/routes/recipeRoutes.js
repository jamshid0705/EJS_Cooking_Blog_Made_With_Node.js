const express=require('express')
const router=express.Router()
const recipeController=require('../controllers/recipeController')



router.route('/').get(recipeController.homepage)
router.route('/categories/').get(recipeController.exploreCateg)
router.route('/recipe/:id').get(recipeController.getRecipeId)
router.route('/categories/:id').get(recipeController.exploreCategById)
router.route('/search').post(recipeController.searchRecipe)


module.exports=router