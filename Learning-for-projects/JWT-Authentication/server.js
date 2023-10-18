require("dotenv").config()
const express = require("express")
const app = express()

const jwt = require("jsonwebtoken")

//middleware
app.use(express.json())

const posts = [
  {
    name: "Saurav",
    news: "This is news 1.",
  },
  {
    name: "Varsau",
    news: "This is news 2.",
  },
]
app.get("/posts", authenticateToken, (req, res) => {
  const showPost = posts.filter(post => post.username == req.user.name)
  res.json(showPost)
})

app.post("/login", (req, res) => {
  // User Authentication

  const username = req.body.username
  const user = { name: username }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken })
})

//middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1] //Barear Token
  if (token == null) {
    return res.status(404).send("Please try again.")
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403)
    }
    req.user = user
    next()
  })
}

const port = 3000

app.listen(port, console.log(`Server is listining to port ${port}....`))

console.log("status: OK")
