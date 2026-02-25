const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:[true ,"user name already exist"],
        required:[true,"user name already required"]
    },
    email:{
        type: String,
        unique:[true,'user email already exist'],
        required:[true,"user email already required"]
    },
    passward:{
        type:String,
        require:[true,'user passward already required']
    },
    bio: String ,
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/uxfqiaylgl/360_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg'
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel