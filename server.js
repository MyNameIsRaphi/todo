import express from "express"
import https from "https"
import fs from "fs"

import mongoose, { Schema } from "mongoose";
import bodyParser from "body-parser"
import { error } from "console";
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
let port = 3000

const todos = {
    title:String,
    description:String,
    date :String,
    alert: Boolean

}

const user = {
    email:String,
    password: String,
    
}


let loginData = {}


async function connectDB(){
    const uri = "mongodb://127.0.0.1:27017/todo2";
    await mongoose.connect(uri, {useNewUrlParser:true});
    return 
}

const todo = {
    title:String,
    description:String,
    alert:Boolean,
    untilDate:Date
}

let connected = false;

connectDB().catch(error => {
    console.log(error);
}).then(()=>{
    
    connected = true;
})




app.get("/", (req,res) =>{
    // send right data with session id
    if (res.statusCode == 201){
        loginData = {
            unAuth:true
        }
    }
    console.log(loginData);
    res.render("login.ejs",loginData)
    
})
const schema = new mongoose.Schema({
    email:String,
    password:String,
    todos: [todo]
})
const UserModels = mongoose.model("UserModels", schema)
app.use(express.static("public"))


app.post("/login", async (req, res) => {
    console.log(connected);
   
    if (connected){
        
        let login = await UserModels.exists({
            email:req.body.email,
            password:req.body.password
        })
        if (!login){
            
            
            res.redirect(201,"/")
        }
        console.log(login)
    }
    }
    )  


const server = https.createServer({
    key:fs.readFileSync("key.pem"),
    cert:fs.readFileSync("cert.pem")
},app)

server.listen(port,(req, res) =>{
    console.log("Server started listening")
    
})

