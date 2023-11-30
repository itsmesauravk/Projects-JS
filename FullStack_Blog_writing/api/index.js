const express = require("express")
const app = express()
const cors = require("cors")
const User = require("./models/User")
const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParcer = require("cookie-parser")
const multer = require("multer")

const uploadMiddleware = multer({ dest: "uploads/" })

const secret = "qwertyuiopasdfghjkl123"

const salt = bcrypt.genSaltSync(10)

app.use(cors({ credentials: true, origin: "http://localhost:3000" })) //for handling the error while connection with react
app.use(express.json())
app.use(cookieParcer())

mongoose.connect(
  "mongodb+srv://mern-blog:mernBlog@cluster0.utkrlay.mongodb.net/"
)

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    })
    res.json({ userDoc })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const userDoc = await User.findOne({ username })
  const checkPass = bcrypt.compareSync(password, userDoc.password) // (currently_entred_password, db-stored-password) >>compared
  if (checkPass) {
    //loged in
    jwt.sign({ username, id: userDoc._id }, secret, (err, token) => {
      if (err) throw err
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      })
    })
  } else {
    res.status(400).json("Incorrect Username or passsword!")
  }
  // res.json({ checkPass })
})

app.get("/profile", (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

app.post("/post", (req, res) => {})

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok")
})
app.listen(4000, console.log("Server is listning to port 4000...."))

//mernBlog
//mongodb+srv://mern-blog:mernBlog@cluster0.utkrlay.mongodb.net/