const mongoose=require("mongoose")

function connectToDB(){
    mongoose.connect(process.env.MODUL_URI)
    .then(()=>{
        console.log("conneted to database")
    })
}

module.exports=connectToDB