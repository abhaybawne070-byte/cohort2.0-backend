const express=require("express")

const app=express()

app.use(express.json())


let notes=[]

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)

    console.log(notes)

    res.send("note created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})


app.delete("/notes/:index",(req,res)=>{
    // console.log(req.params.index)

    delete notes[req.params.index]
    res.send("note deleted successfully")
})

/* patch / notes /:index */
// req.body={description :- "sample modified description."}

app.patch("/notes/:index",(req,res)=>{

    notes[req.params.index].description=req.body.description
    notes[req.params.index].tittle=req.body.tittle

    res.send("note updated successfully")

})

module.exports=app