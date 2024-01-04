// Started date Jan 3 2024 22:16

const express = require('express');
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");
// console.log(crypto.randomBytes(16).toString("hex"));

require("dotenv").config();

//database
const connectToDB = require("./connectDB");
connectToDB();
//registration schema
const Registration = require("./schema/Registration");



//middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));



app.get("/", (req, res) => {
    res.send("Hello World");
})
app.get("/home",async(req,res)=>{
   try {
    const allUser =await Registration.find({});
    res.json(allUser)
   } catch (error) {
    res.json("Error :"+error)
   }
})

//user registration
app.post("/register", async(req, res) => {
    const {firstName,surname,email,password,dateOfBirth,selectedGender,selectedImage} = req.body;

    try {
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await Registration.create({
            firstName: firstName,
            surname: surname,
            email: email,
            password: hashedPassword,
            dateOfBirth: dateOfBirth,
            gender: selectedGender,
            profileImage: selectedImage,
        })
        if(newUser){
            res.status(200).json("User Created")
        }else{
            res.status(200).json("User not Created")
        }
    } catch (error) {
        res.status(400).json("Error :"+error)
    }


})

//login
app.post("/login", async(req, res) => {
    const {email,password} = req.body;
    try {
        const checkUser = await Registration.findOne({email});
        if(checkUser){
            const checkPassword = bcrypt.compareSync(password,checkUser.password);
            if(checkPassword){
                const token = jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:"1h"})
                res.cookie("token",token,{httpOnly:true})
                res.status(200).json({token:token})
            }else{
                res.status(400).json("Password not match")
            }
        }
    } catch (error) {
        res.status(400).json("Error :"+error)
    }

})

if(connectToDB){
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
        
    })

}else{
    console.log("Server is not running");
}