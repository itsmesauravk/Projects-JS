// Started date Jan 3 2024 22:16

const express = require('express');
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");

require("dotenv").config();

//database
const connectToDB = require("./connectDB");
connectToDB();
//registration schema
const Registration = require("./schema/Registration");



//middle ware
app.use(express.json());
app.use(cors());



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
        const newUser = await Registration.create({
            firstName: firstName,
            surname: surname,
            email: email,
            password: password,
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

if(connectToDB){
    app.listen(3001, () => {
        console.log("Server is running on port 3000");
    })
    console.log("Database is connected")

}else{
    console.log("Server is not running");
}