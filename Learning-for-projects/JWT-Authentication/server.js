const express = require("express")
const app = express()

const jwt = require("jsonwebtoken")

//middleware
app.use(express.json())

const news = [
  {
    name: "Saurav",
    news: "This is news 1.",
  },
  {
    name: "Varsau",
    news: "This is news 2.",
  },
]
app.get("/news", (req, res) => {
  res.json(news)
})

app.post("/login", (req, res) => {
  //Authenticat user
})

const port = 3000

app.listen(port, console.log(`Server is listining to port ${port}....`))

console.log("status: OK")
