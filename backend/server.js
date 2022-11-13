const express = require("express");
const path = require("path");
const connectDB = require("./config/dbconnection"); //DB fx 
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
require("dotenv").config({ path: path.resolve(__dirname, ".env")});

const PORT = 5075 || process.env.PORT;
//middlewares usage

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection fx calling
connectDB();

app.listen(PORT, () => {
    console.log("Server running on the PORT No -", PORT);
});

app.get("/", (req, res) => {
    res.send("Welcome to backend of MCQ Tester");
});

app.post("/register", async(req, res) => {
    try{
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            designation: req.body.designation,
            city : req.body.city,
            mobile : req.body.mobile
        })
        res.status(500).json({ Status:"1", Message: "New User Registered", User: user})
    } catch(error){
        console.log("Error in Registering user", error.message);
        res.send({ status: "Error", error: "Duplicate email" });
    }
});

app.post("/login", async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if(!user) {
        console.log("Invalid email id");
        return res.json({ Status: "0", Message: "Invalid e-mail provided"})
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if(isValidPassword) {        
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name,
            designation: user.designation
        },
            process.env.JWTSECRET
        )        
        return res.json({ Status: "Ok, user found!", user: token});        
    } else {
        return res.send({ Status: "User not found!", user: false});
    }
});