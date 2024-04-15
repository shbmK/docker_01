import express from 'express'
import { createNotes,getNote,getNotes } from './database.js'
const app=express()
app.use(express.json())
app.get("/notes",async (req,res)=>{
    const notes=await getNotes()
    res.send(notes)
})
app.get("/notes/:id",async (req,res)=>{
    const id=req.params.id
    const notes=await getNote(id)
    res.send(notes)
})

app.post("/notes",async (req,res)=>{
    const {title,contents}=req.body
    const note=await createNotes(title,contents)
    res.status(201).send(note)

})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Something broke")
})

app.listen(8080,()=>console.log("Running on port 8080"))