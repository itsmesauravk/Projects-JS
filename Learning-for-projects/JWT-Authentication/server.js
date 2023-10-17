require("dotenv").config()
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
  // User Authentication

  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ASCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

const port = 3000

app.listen(port, console.log(`Server is listining to port ${port}....`))

console.log("status: OK")
