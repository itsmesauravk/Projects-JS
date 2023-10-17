const express = require("express")
const app = express()

const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes")
require("http-status-codes")

// middlware
app.use(express.json())

//for demo >>instead use db
let users = []

// routes

//show userdata
app.get("/user", (req, res) => {
  res.status(StatusCodes.ACCEPTED).json(users)
})
//add user or register user
app.post("/user/register", async (req, res) => {
  //hashing password
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(req.body.password, salt)
  const user = { name: req.body.name, password: hashedPass }
  users.push(user)
  res.status(StatusCodes.ACCEPTED).json(user)
})

//login
app.post("/user/login", async (req, res) => {
  const user = users.find(user => (user.name = req.body.name))
  console.log(user)
  if (user == null) {
    return res.status(400).send("User not found")
  }
  try {
    const checkPass = await bcrypt.compare(req.body.password, user.password)
    if (checkPass) {
      res.send("Sucessfully login")
    } else {
      res.send("Login Failed sucessfully...")
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" })
  }
})

app.listen(3000)

console.log("This is working sucessfully...")
