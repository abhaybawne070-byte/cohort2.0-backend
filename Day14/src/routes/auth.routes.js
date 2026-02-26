const express = require("express")
const userModel = require("../model/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post("/register",async(req,res)=>{
    const {email,username,password,bio,profileImage} = req.body

    // const isUserExistsByEmail = await userModel.findOne({email})

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         messsage:"user already exist with same email"
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({username})

    // if (isUserExistsByUsername){
    //     return res.status(409).json({
    //         message:"user already exist with same name"
    //     })
    // }

    const isUserAlreadyExists = await userModel.findOne({
    $or:[ 
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
             messsage:"User already exist" + (isUserAlreadyExists.email ==
             email ? "Email already exists" : "Username already exists")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    }) 
    // user ka data ho
    // dat unique ho
    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,
        {expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
})

authRouter.post("/login", async(req,res) =>{
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {
                username: username
            },
            {
                email:email
            }
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(Password).digest("hex")
    
    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn:"2d"}
    )
    res.cookie("token",token)

    res.status(200)
    .json ({
        message:"user logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
})
module.exports = authRouter
