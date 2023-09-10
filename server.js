import express from "express"
import https from "https"
import fs from "fs"

import { Database } from "./database.js"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))


let port = 3000

app.use(express.static("Public"))

const todos = {
    title: String,
    description: String,
    date: String,
    alert: Boolean

}

const user = {
    email: String,
    password: String,

}

let database = new Database(user);





const todo = {
    title: String,
    description: String,
    alert: Boolean,
    untilDate: Date
}







app.get("/", (req, res) => {


    res.render("login.ejs")

})



app.get("/register", (req, res) => {
    res.render("register.ejs")
})


app.post("/login", async (req, res) => {

    let body = req.body;

    database.ValidateUser(body).then(
        (isValid) => {
            if (isValid) {
                res.json({ isValid: true })
            } else {
                res.json({ isValid: false })
            }
        }
    )


}
)

app.post("/register", async (req, res) => {
    let body = {
        email:req.email,
        password:req.password
    }
    let createdUser = await database.addUser(body)
    if (createdUser){
        res.json({
            created:createdUser,
            error:""
        })
    }else {
        res.json({
            created:false,
            error:"User woth this email already exists"
        })
        
    }
})


app.get("/todo", (req,res) => {
    res.render("todo.ejs")
})

const server = https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app)

server.listen(port, (req, res) => {
    console.log("Server started listening")

})

