const mongoose=require('mongoose')

const recipeSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Siz name kiritishingiz kerak"]
  },
  description:{
    type:String,
    required:[true,"Siz name kiritishingiz kerak"]
  },
  email:{
    type:String,
    required:[true,"Siz name kiritishingiz kerak"]
  },
  ingredients:{
    type:Array,
    required:[true,"Siz name kiritishingiz kerak"]
  },
  category:{
    type:String,
    enum:['Thai','American','Chinese','Mexican','Indian'],
    required:[true,"Siz name kiritishingiz kerak"]
  },
  image:{
    type:String,
    required:[true,"Siz name kiritishingiz kerak"]
  }
})

const Recipe=mongoose.model('recipe',recipeSchema)

module.exports=Recipe