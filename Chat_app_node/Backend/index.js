const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")

const app = express()
app.use(express.json())
app.use(cors({ origin: true }))

app.use("/", (req, res) => {
  res.send("Hello World !!")
})

// id    940400f4-6e60-44cc-bab4-9410de96352f
// pass  aad5fe44-63cd-4540-8deb-14f77d2cf954

app.post("/authenticate", async (req, res) => {
  const { username } = req.body

  try {
    const response = await axios.put(
      "https://api.chatengine.io/chats/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "aad5fe44-63cd-4540-8deb-14f77d2cf954" } }
    )
    return res.status(response.status).json(response.data)
  } catch (err) {
    res.json({ err: err })
  }

  return res.json({ username: username, secret: "sha256..." })

})

app.listen(console.log("Server is listning to port 3000..."),3001)
