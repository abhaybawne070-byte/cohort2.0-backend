const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:[ture ,"user name already exist"],
        required:[ture,"user name already required"]
    },
    email:{
        type: String,
        unique:[ture,'user email already exist'],
        required:[ture,"user email already required"]
    },
    passward:{
        type:String,
        require:[ture,'user passward already required']
    },
    bio: String ,
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/uxfqiaylgl/360_F_586915596_gPqgxPdgdJ4OXjv6GCcDWNxTjKDWZ3JD.jpg'
    }
})