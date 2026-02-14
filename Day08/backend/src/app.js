
const express=require("express")
const app=express()
const path=require("path")

const noteModel=require("./model/note.model")

const cors=require("cors")


app.use(express.json()) // midial where
app.use(cors())
app.use(express.static("./public"))

app.post("/api/notes",async(req,res)=>{
    const {title,description}=req.body

    const note=await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created successfully",
        note
    })
})

app.get("/api/notes",async(req,res)=>{
    const notes= await noteModel.find() 

    res.status(200).json({
        message:"notes fetch successfully",
        notes
    })
})

app.delete("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"note delete successfully"
    })
})

app.patch("/api/notes/:id",async(req,res)=>{
    const id=req.params.id
    const {title ,description}=req.body
    
    await noteModel.findByIdAndUpdate(id,{title,description})

    res.status(200).json({
        message:"note update successfully"
    })
})

console.log(__dirname)

app.use('*name',(req,res)=>{   // issme hame root se path dena hota hai res.send me or ye achha nhi hai for security purpush 
    // to yaha par ham ek modul use karte hai path
    res.send(path.join(__dirname,"..","/public/index.html"))   //jis bhi file ke under use karte hai us file ke under tak ka folder ka path batata hai
})
module.exports=app