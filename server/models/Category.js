const mongoose=require('mongoose')

const schemaMeal=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Siz name kiritishingiz kerak"]
  },
  image:{
    type:String,
    required:[true,"Siz image tanlashingiz kerak!"]
  }

})

const Category=mongoose.model('category',schemaMeal)

module.exports=Category