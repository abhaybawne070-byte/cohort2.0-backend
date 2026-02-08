const app=require("./src/app")

const mongoose=require("mongoose")

function connectToDB(){
    mongoose.connect("connected_your_mongoose_string")
    .then(()=>{
        console.log("connected to database")    
    })
}

connectToDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

