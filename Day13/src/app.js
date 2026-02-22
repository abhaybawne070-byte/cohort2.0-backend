
const express=require("express")
const app=express()

const connectToDB=require("./config/database")
connectToDB()

const authRouter=require("./routes/auth.routes")

const cookieParser=require("cookie-parser")  

app.use(express.json()) // express.json router se pehle honga 

app.use(cookieParser())

app.use("/api/auth",authRouter)



module.exports=app