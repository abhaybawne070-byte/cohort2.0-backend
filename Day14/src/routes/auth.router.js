const express = require("express")
const userModel = require("../model/user.modul")

const authRouter = express.Router()

authRouter.post("./register",async(req,res)=>{
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
             messsage:"User already exist."
        } )
    }
})