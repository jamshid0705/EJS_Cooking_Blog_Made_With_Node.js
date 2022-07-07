const modelMeal=require('../models/Category')


 





const homepage=async(req,res)=>{
  res.render('index',{title:'Homepage'})
}

const add=async ()=>{
  try{
    await modelMeal.create(
      [
        {
          "name":"Thai",
          "image":"thai-food.jpg"
        },
        {
          "name":"American",
          "image":"american-food.jpg"
        },
        {
          "name":"Chinese",
          "image":"chinese-food.jpg"
        },
        {
          "name":"Mexican",
          "image":"mexican-food.jpg"
        },
        {
          "name":"Indian",
          "image":"indian-food.jpg"
        },
        {
          "name":"Spanish",
          "image":"spanish-food.jpg"
        }
      ]
      
    )
    console.log('Databasega saqlandi !')
  }catch(err){
    console.log("Err",err)
  }
}
add()

module.exports={homepage}