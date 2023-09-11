import express from "express"
import https from "https"
import fs from "fs"

import { Database } from "./database.js"
import bodyParser from "body-parser"

const app = express()


app.use(express.json()) // add this to accept json input

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


app.post("/", async (req, res) => {
    
    let body = req.body;

    let valid = await database.ValidateUser(body)
    console.log(valid)
    if (valid) {
        res.render("index.ejs")
    } else {
        res.render("login.ejs", { UnAuth: true })
    }



}
)

app.post("/registering", async (req, res) => {
    let password = req.body.password
    let confirmedPassword = req.body.confirmedPassword
    let email = req.body.email
    
    if (password !== confirmedPassword) {
        res.render("register.ejs", { noMatchError: true })
        return
    } else if (password.length < 8) {
        res.render("register.ejs", { noPasswordError: true })
    } else if (!validateEmail(email)) {
        res.render("register.ejs", { noEmailError: true })
    } else {
        let body = {
            email: req.body.email,
            password: req.body.password
        }

        database.addUser(body).then(
            (createdUser) => {
                console.log(createdUser)

                if (createdUser) {
                    res.redirect("/")

                } else {
                    res.render("register.ejs",{emailUsedError :true})

                }
            }
        )
    }


}
)




const server = https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app)

server.listen(port, (req, res) => {
    console.log("Server started listening on port ", port)

})

function validateEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}
