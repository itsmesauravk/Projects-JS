const express = require("express");
const app = express();
const mongoose = require('mongoose')

const cors = require("cors")
const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
// console.log(crypto.randomBytes(16).toString('hex'))


require("dotenv").config();
// database
const connectDB = require("./connectDB");

// schema

const User = require("./schema");
const { error } = require("console");


// Middleware to parse JSON in the request body
app.use(express.json());
// app.use(cors())
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, etc.)
  }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({ msg: "The server is working." });
});
app.get("/users",async(req,res)=>{
    try {
        const users =await User.find({});
        if(users){
            res.status(200).json({users})
        }else{
            res.status(400).json({msg:"Users data not found."})
        }
    } catch (error) {
        console.log("Error : "+error)
        res.status(500).json({ error: "Internal Server Error" });

    }
    
})

//Register
app.post("/register", async (req, res) => {
    const { picture, username, password } = req.body;
    
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password,salt)

        const newUser = await User.create({picture, username,password:hashedPass });

        if (newUser) {
            res.status(200).json({ msg: "User added successfully." });
        } else {
            res.status(401).json({ msg: "Failed to create user." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error." });
    }
});

//Login
app.post("/login", async (req, res) => {
    const {picture,username, password } = req.body;

    try {
        const findUser =await User.findOne({ username });
        if (findUser){
            const checkPass = bcrypt.compareSync(password, findUser.password);
            if(checkPass){
                const token = jwt.sign({picture,username,id:findUser._id},process.env.JWT_SECRET,{expiresIn:"1d"})   //crypto.randomBytes(length).toString('hex')
                debugger
                res.cookie("token",token).json({id:findUser._id,username:findUser.username, picture:findUser.picture})
                // res.status(200).json({msg:"Login Successfull."})
            }else{
                res.status(401).json({msg:"Invalid Password."})
            }
        }else{
            res.status(401).json({msg:"Invalid Username."})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error." });
    }
});
//userProfile
app.get("/profile",(req,res)=>{
    const {token} = req.cookies
    jwt.verify(token,process.env.JWT_SECRET,{},(err,info)=>{
        if (err) throw err
        res.json(info)
    })
})


//logout

app.post("/logout", (req, res) => {
    console.log("---------------------------------------")
    res.cookie("token", "");
    res.status(200).send("Logout successful"); // You can send a success message if needed
});


const port = 3001;

// Connect to the database and start the server only if the connection is successful
if(connectDB){
    console.log("Database Connection established Successfully.");
        app.listen(port, () => {
            console.log("Server is listening on port " + port);
        
        });
}else{
    console.log("Failed to connect to the database!!");
}


