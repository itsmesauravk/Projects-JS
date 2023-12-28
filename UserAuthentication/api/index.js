const express = require("express");
const app = express()

require("dotenv").config();


app.get("/",(req,res)=>{
    res.status(200).json({msg:"The server is working."})
})


app.listen(3001) 