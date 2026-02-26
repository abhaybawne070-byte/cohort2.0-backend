const userModel = require("../model/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController (req,res){
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
             message:"User already exist" + (isUserAlreadyExists.email ==
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
}

async function loginController(req,res){
    const {username,email,password} = req.body

    const orConditions = [
        username ? { username } : null,
        email ? { email } : null,
    ].filter(Boolean)

    const user = await userModel.findOne(
        orConditions.length ? { $or: orConditions } : {}
    )
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    if(!password){
        return res.status(400).json({
            message:"password is required"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")
    
    const storedPasswordHash = user.password ?? user.passward
    if(!storedPasswordHash){
        return res.status(409).json({
            message:"password not set for this user (re-register or reset password)"
        })
    }
    const isPasswordValid = hash === storedPasswordHash

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
}

module.exports = {
    registerController,
    loginController
}