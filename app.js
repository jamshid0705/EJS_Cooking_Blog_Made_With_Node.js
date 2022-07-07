const express=require('express')
const expressLayouts=require('express-ejs-layouts')


const app=express();




app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(expressLayouts)

app.set('layout','./layouts/main') // savol
app.set('view engine','ejs') // savol

const routes=require('./server/routes/recipeRoutes.js')
app.use('/',routes)


module.exports=app
