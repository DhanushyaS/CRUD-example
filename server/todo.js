const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    token:Number

})

module.exports = mongoose.model("Todo", todoSchema)