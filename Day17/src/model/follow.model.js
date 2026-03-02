const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({

    follower:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"user",
        // required:[true, "follower is required"]

        type:String,
    },
    followee:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"user",
        // required:[true, "followee is required"]

        type:String,
    }
},{
    timestamps:true
})

followSchema.index({follower:1, followee:1},{unique:true})

const followModel = mongoose.model("follows",followSchema)

module.exports = followModel