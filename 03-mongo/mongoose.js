const express = require("express");
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://admin:Pratik150302@cluster0.igsfa.mongodb.net");

const users = mongoose.model('Users', {
    name: String,
    email: String,
    password: String
})

app.post('/signup', async function (req, res) {

    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await users.findOne({ email: username });
    if (existingUser) {
        console.log("user exists");
        res.status(403).json({
            "msg": "User already exists",
        })
    }

    const user = new users({
        "name": name,
        "email": username,
        "password": password
    })

    user.save();
    console.log("Users created")
    res.json({
        "msg": "User created successfully",
    })
})



app.listen(3000, () => {
    console.log("Listening on PORT 3000")
})