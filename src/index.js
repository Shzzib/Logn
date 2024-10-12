const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")

const app = express();
// use ejs as viewing engine
app.set('view engine' , 'ejs')
//to use the style.css
app.use(express.static("public"));
//convert data into json
app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.get("/" , (req,res)=>{
    res.render("login")
})

app.get("/signup" , (req,res)=>{
    res.render("signup")
})

// Register User

app.post("/signup" , async(req,res)=>{
    
    const data = {
        name : req.body.username,
        password : req.body.password
    }

    //existing user

    const existingUser = await collection.findOne({name: data.name})

    if(existingUser){
        res.send("User already Exist")
    }
    else{
        //hash the passwords using bcrypt
        const saltRounds = 10; // number of salt rounds to bcrypt
        const hashedPassword = await bcrypt.hash(data.password , saltRounds)
         
        data.password = hashedPassword //Replace the hash with original


        const userdata = await collection.insertMany(data);
        console.log(userdata)
    }

})

//Login User

app.post("/login" , async(req,res)=>{
    try{
        const check = await collection.findOne({name : req.body.username})
        if(!check){
            res.send("User not found")
        } 

        //comparing password with hash passowrd

        const isPasswordMatch = await bcrypt.compare(req.body.password , check.password)
        if(isPasswordMatch){
            res.render("home")
        }else{
            res.send("Wrong Password")
        }
    }catch{
        res.send("Wrong Detail")
    }
})

const port = 2000
app.listen(port , ()=>{
    console.log(`Your Server is running at ${port}`)
})