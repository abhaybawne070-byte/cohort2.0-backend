

const noteModel=require("./models/notes.model")

const express=require("express")

const app=express()

app.use(express.json())

app.post("/notes",async(req,res)=>{
    const {title,description}=req.body

    const notes= await noteModel.create({
        title, description
})
    res.status(201).json({
        message:"notes create successfully",
        notes
    })
})

app.get("/notes",async(req,res)=>{
    const notes=await noteModel.find()

    res.status(200).json({
        message:"note fatch successfully",
        notes
    })
})

module.exports=app