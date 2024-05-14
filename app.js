const s = require("./sum");
const express =require("express");
const app = express()
const port=3000;

const equipe = require("./equipes.json")


app.listen(port,()=>{
    console.log("hello")
});

app.get('/equipe',(req,res)=>{
    res.status(200).json(equipe)
})

app.post('/equipe',(req,res)=>{
    res.send("equipe post")
})

app.put('/equipe/:id',(req,res)=>{
    res.send("equipe put")
})

app.delete('/equipe/:id',(req,res)=>{
    res.send("equipe delete")
})