
const express=require("express")
const app=express()

const connectToDB=require("./config/database")
connectToDB()

app.use(express.json())

module.exports=app