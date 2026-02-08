require("dotenv").config()

const app=require("./src/app")

const connectedToDB=require("./src/config/Database")

const mongoose=require("mongoose")


connectedToDB()

app.listen(3000,()=>{
    console.log("server is running on 3000")
})