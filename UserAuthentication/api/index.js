const express = require("express");
const app = express();

require("dotenv").config();
// database
const connectDB = require("./connectDB");

// schema
const User = require("./schema");


// Middleware to parse JSON in the request body
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ msg: "The server is working." });
});

app.post("/newuser", async (req, res) => {
    const { username, password } = req.body;

    try {
        //  create method to create a new user
        const newUser = await User.create({"username":username, "password":password });

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


