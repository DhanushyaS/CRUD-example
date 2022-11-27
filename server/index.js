const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Todo = require('./todo')


if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const app = express()

const DATABASE = "mongodb+srv://Dhanushya:Dhanu123@cluster0.2fcmpwm.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE,{useNewUrlParser:true,useUnifiedTopology:true})
.then(
    ()=>{
        console.log("database open");
    }
).catch(
    (err)=>{
        console.log('oops || error')
    }
)

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.post('/add', async(req,res)=>{
    try{
        const newTodo = new Todo({...req.body})
        await newTodo.save()
        res.status(200).json({msg:'Success'})
    }catch(err){
        res.status(500).json({msg:'Internal Server Error'})
    }
})

app.get('/get', async(req,res)=>{
    try{
        const todos = await Todo.find({})
        res.status(200).json(todos)
    }catch(err){
        res.status(500).json({msg:'Internal Server Error'})
    }
})

app.post('/edit/:id', async(req,res)=>{
    try{
        const {id}= req.params
        const todos = await Todo.findOneAndUpdate(id,{...req.body})
        await todos.save()
        const todo = await Todo.find({})
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({msg:'Internal Server Error'})
    }
})

app.get('/delete/:id', async(req,res)=>{
    try{
        const {id} = req.params
        await Todo.deleteOne({_id:id})
        const todo = await Todo.find({})
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({msg:'Internal Server Error'})
    }
})

app.get('/',(req,res)=>{
    res.send('demo project')
})

const port = 4000
app.listen(port,()=>console.log('server is running'))