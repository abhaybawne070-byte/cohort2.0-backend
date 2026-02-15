const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
   name:String,
   email:String,
   password:String
})

const userModel=mongoose.Model("user",userSchema)

module.exports=userModel