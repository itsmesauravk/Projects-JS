// Started date Jan 3 2024 22:16

const express = require('express');
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const crypto = require("crypto");
// console.log(crypto.randomBytes(16).toString("hex"));
const path = require('path');


require("dotenv").config();

//database
const connectToDB = require("./connectDB");
connectToDB();
//registration schema
const Registration = require("./schema/Registration");
//post schema
const Post = require("./schema/Post");

//for image
const multer = require("multer");


const upload = multer({ dest: __dirname+"/uploads" }); 



//middleware
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



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
// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await Registration.findOne({ email });
        if (checkUser) {
            const checkPassword = bcrypt.compareSync(password, checkUser.password);
            if (checkPassword) {
                // Include additional information in the token payload
                const token = jwt.sign(
                    { id: checkUser._id, email: checkUser.email, firstName: checkUser.firstName, surname: checkUser.surname, gender: checkUser.gender, profileImage: checkUser.profileImage },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                // Set the token in a cookie
                res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

                // Respond with user information
                res.status(200).json({
                    id: checkUser._id,
                    email: checkUser.email,
                    firstName: checkUser.firstName,
                    surname: checkUser.surname,
                    gender:checkUser.gender,
                    profileImage: checkUser.profileImage,
                });
            } else {
                res.status(400).json("Password not match");
            }
        }
    } catch (error) {
        res.status(400).json("Error :" + error);
    }
});

//profile
app.get("/profile", (req, res) => {
    const { token } = req.cookies
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err
        const { firstName,surname, email,gender, _id } = await User.findById(userData.id)
        res.json("profile : ",{firstName,surname, email, gender,_id})
      })
    } else {
      res.json(null)
    }
  })



app.post("/newpost/:userId", upload.single('image'), async (req, res) => {
    // The 'image' parameter should match the name attribute of the file input in your form
    const { caption } = req.body;
    const userId = req.params.userId;
    const image = req.file.path; 

    try {
        // Your post creation logic here
        // Make sure to handle the image data appropriately (e.g., save to disk or database)
        const newPost = await Post.create({
            caption: caption,
            image: image,
            user: userId,
        });

        if (newPost) {
            res.status(200).json("Post Created");
        } else {
            res.status(200).json("Post not Created");
        }
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
});
//shows all post for home page 
app.get("/allpost", async (req, res) => {
    try {
        const allPost = await Post.find({}).sort({ createdAt: -1 }).populate('user');
        res.json(allPost);
    } catch (error) {
        res.json("Error: " + error);
    }
});
//shows post of specific user only
app.get("/yourpost/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const yourPost = await Post.find({user:userId}).sort({ createdAt: -1 }).populate('user');
        res.json(yourPost);
    } catch (error) {
        res.json("Error: " + error);
    }
});
  
  
  
  

//logout
app.post("/logout",(req,res)=>{
    res.clearCookie("token").json("Logout")
})

//for exceptions
app.get("*", (req, res) => {

    res.status(404).send("Page not found")
})

if(connectToDB){
    app.listen(4000, () => {
        console.log("Server is running on port 4000");
        
    })

}else{
    console.log("Server is not running");
}