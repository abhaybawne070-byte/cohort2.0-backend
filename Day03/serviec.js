const express=require("express")

const app=express()

app.use(express.json())

const notes=[]

app.post("/notes",(req,res)=>{
    console.log(req.body)
    res.send("note created")
    notes.push(req.body)
    
})
app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})