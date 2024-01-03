// Started date Jan 3 2024 22:16

const express = require('express');
const app = express();


//middle ware
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3001, () => {
    console.log("Server is running on port 3000");
})