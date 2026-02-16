
const express=require("express")
const app=express()

const connectToDB=require("./config/database")
connectToDB()

app.use(express.json()) // express.json router se pehle honga 

const authRouter=require("./routes/auth.routes")
app.use("/api/auth",authRouter)


module.exports=app