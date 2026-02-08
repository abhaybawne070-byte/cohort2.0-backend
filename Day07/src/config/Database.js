const mongoose=require("mongoose")

function connectedToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to the database")
    })
}

module.exports=connectedToDB