const { model } = require('mongoose');
const modelMeal=require('../models/Category')
const recipeModel=require('../models/Recipe')


 



//////// get homepage 

const homepage=async(req,res)=>{
  try {


    const limitNumber=5;
    const categories=await modelMeal.find({}).limit(limitNumber)

    const latest=await recipeModel.find({}).sort({_id:-1}).limit(limitNumber)
    const thai=await recipeModel.find({'category':'Thai'}).limit(limitNumber)
    const american=await recipeModel.find({'category':'American'}).limit(limitNumber)
    const chinese=await recipeModel.find({'category':'Chinese'}).limit(limitNumber)


    const food={latest,thai,american,chinese}

    res.render('index',{title:'Cooking Blog - Home',categories,food})
  } catch (error) {
    res.status(500).json({
       staus:"fail",
       add:error.message
    })
  }
}







/////// get catigories

const exploreCateg=async(req,res)=>{
  try {


    const limitNumber=20;
    const categories=await modelMeal.find({}).limit(limitNumber)

    res.render('categories',{title:'Cooking Blog - Categories',categories})
  } catch (error) {
    res.status(500).json({
       staus:"fail",
       add:error.message
    })
  }
}

//////// get catigories by id

const exploreCategById=async(req,res)=>{
  try {

    const name=req.params.id
    const limitNumber=20;
    const categoriesById=await recipeModel.find({'category':name}).limit(limitNumber)

    res.render('categories',{title:'Cooking Blog - Categories',categoriesById})
  } catch (error) {
    res.status(500).json({
       staus:"fail",
       add:error.message
    })
  }
}


/////// get recipe id

const getRecipeId=async(req,res)=>{
  try {
    let recipeId=req.params.id
    let recipe=await recipeModel.findById(recipeId)
  
    res.render('recipe',{title:'Cooking Blog - Recipe',recipe})
  } catch (error) {
    res.status(500).json({
       staus:"fail",
       add:error.message
    })
  }
}


////// search recipe

const searchRecipe=async (req,res)=>{

  try {
    const searchTerm=req.body.searchTerm
    const recipe=await recipeModel.find({$name:{$search:searchTerm,$diacriticSensitive:true}})   // savol
    res.render('search',{title:"Cooking Blog - Search",recipe})
    
  } catch (error) {
    res.status(500).json({
      status:'fail',
      add:error.message
    })
  }
}


////// get explore latest

const exploreLatest=async(req,res)=>{
  try {
   
    const limitNumber=20
    const recipe=await recipeModel.find({}).sort({_id:-1}).limit(limitNumber)
    res.render('explore-latest',{title:'Cooking Blog - Explore-latest',recipe})
  } catch (error) {
    res.status(500).json({
       staus:"fail",
       add:error.message
    })
  }
}


/////// Explore random


const exploreRandom=async(req,res)=>{
  try {
   
    const con=await recipeModel.find().countDocuments()  //savol
    const random=Math.floor(Math.random()*con)
    const recipe=await recipeModel.findOne().skip(random).exec() // savol
    res.render('explore-random',{title:'Cooking Blog - Explore-latest',recipe})
  } catch (error) {
    res.status(500).json({
       staus:"fail",
       add:error.message
    })
  }
}


////// Submit Recipe get

const submitRecipe=async(req,res)=>{
  const infoErrorsObj=req.flash('infoErrors')  // savol
  const infoSubmitObj=req.flash('infoSubmit')  // savol
  res.render('submit-recipe',{title:'Cooking Blog - Submit-recipe',infoErrorsObj,infoSubmitObj})
}

//// Submit Recipe post

const submitRecipeOnPost=async(req,res)=>{
  try {

    const newRecipe = new recipeModel({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image:'american5.avif'
    });
    
    await newRecipe.save();
    req.flash('infoSubmit','Recipe has been added')
    res.redirect('/submit-recipe')
  } catch (error) {
    req.flash('infoErrors',error)
    res.redirect('/submit-recipe')
  }
  
}


module.exports={homepage,exploreCateg,getRecipeId,exploreCategById,searchRecipe,exploreLatest,exploreRandom,submitRecipe,submitRecipeOnPost}









// const add=async ()=>{
//   try{
//     await modelMeal.create(
//       [
//         {
//           "name":"Thai",
//           "image":"thai-food.jpg"
//         },
//         {
//           "name":"American",
//           "image":"american-food.jpg"
//         },
//         {
//           "name":"Chinese",
//           "image":"chinese-food.jpg"
//         },
//         {
//           "name":"Mexican",
//           "image":"mexican-food.jpg"
//         },
//         {
//           "name":"Indian",
//           "image":"indian-food.jpg"
//         },
//         {
//           "name":"Spanish",
//           "image":"spanish-food.jpg"
//         }
//       ]
      
//     )
//     console.log('Databasega saqlandi !')
//   }catch(err){
//     console.log("Err",err)
//   }
// }
// add()



// const addRecipe=async ()=>{
//   try{
//     await recipeModel.create(
//       [
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "american2.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "american3.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "american4.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "american5.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American", 
//                 "image": "chinese1.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Thai", 
//                 "image": "chinese2.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Thai", 
//                 "image": "chinese3.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Thai", 
//                 "image": "chinese4.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Thai", 
//                 "image": "chinese5.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Thai", 
//                 "image": "chinese1.avif"
//               },

//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes . Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chinese", 
//                 "image": "chinese2.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chinese", 
//                 "image": "chinese5.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chinese", 
//                 "image": "american5.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chinese", 
//                 "image": "american4.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chinese", 
//                 "image": "american3.avif"
//               },
//               { 
//                 "name": "Recipe Name Goes Here",
//                 "description": `Recipe Description Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima vero fuga natus illum cupiditate. Delectus, sed dolor minus quaerat quam aliquam ea amet impedit quae. Optio alias dolor perspiciatis nulla ratione, neque quos, praesentium minima atque officiis sed nihil nam.`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                   "1 level teaspoon baking powder",
//                   "1 level teaspoon cayenne pepper",
//                   "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "Chinese", 
//                 "image": "american2.avif"
//               },
//             ]
//     )
//     console.log('Recipe Databasega saqlandi !')
//   }catch(err){
//     console.log("Err",err)
//   }
// }
// addRecipe()

