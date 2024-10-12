const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/Login")

connect.then(()=>{
    console.log("Database Successful");
    
})
.catch(()=>{
    console.log("Not")
})

//create a schema

const LoginSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required : true
    }
})

//collection part

const collection = new mongoose.model("users" , LoginSchema)

module.exports = collection