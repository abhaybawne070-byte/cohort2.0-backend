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

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies)

    res.status(200).json({
      message:"this is protected route"
    })
  })


authRouter.post("/login",async(req,res)=>{
  const {email,password}=req.body

  const user=await userModel.findOne({email})

  if (!user){
    return res.status(404).json({
      message:"user not found with this email address"
    })
  }

  const isPasswordMatched= user.password === password

  if(isPasswordMatched){
    return res.status(401).json({
      message:"Invalid password"
    })
  }

  const token = jwt.sign({
    id:user._id,
  },process.env.JWT_SECRET)

  res.cookie("jwt_token",token)

  res.status(200).json({
    message:"user logged in",
    user,
  })
})
module.exports=authRouter