const express=require('express')
const router=express.Router()
const recipeController=require('../controllers/recipeController')



router.route('/').get(recipeController.homepage)
router.route('/categories/').get(recipeController.exploreCateg)
router.route('/categories/:id').get(recipeController.exploreRecipe)


module.exports=router