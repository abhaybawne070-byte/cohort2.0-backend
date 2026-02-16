const express=require("express")
const userModel=require("../model/user.model")

const authRouter=express.Router()

const jwt=require("jsonwebtoken")

authRouter.post("/register",async(req,res)=>{
  const {name,email,password}=req.body
  
  const userAlreadyExiste=await userModel.findOne({email})

  if (userAlreadyExiste){
     return res.status(400).json({
      message:'user already existe with email address'
     })
  }
  const user=await userModel.create({
    name , email , password
  })

const token=jwt.sign(   
      {
        id:user._id,
        email:user.email
      },
      process.env.JWT_SECRET
  )

  res.cookie("jwt_token",token)

  res.status(201).json({
    message:"user register successfully",
    user,
    token
  })

})

module.exports=authRouter