const express=require('express')
const expressLayouts=require('express-ejs-layouts')

const app=express();
const port=process.env.PORT

require('dotenv').config();

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(expressLayouts)



app.listen(port,()=>{
  console.log(`${port}-port eshitishni boshladi`)
})