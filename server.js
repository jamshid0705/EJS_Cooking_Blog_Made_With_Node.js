require('dotenv').config({path:'./config.env'});
const mongoose=require('mongoose')
const app=require('./app')

const port=process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE,{})
.then(()=>{console.log('Databasega ulanish hosil qilindi !')})
.catch(err=>{
  console.log(err)
})



app.listen(+port,()=>{
  console.log(`${port}-port eshitishni boshladi`) 
})