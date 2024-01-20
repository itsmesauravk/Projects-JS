// Today's date : Jan 20, 2024 20:44:30

const express = require('express');

const  http = require('http');
const {Server}  = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});



const port = 4000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

io.on("connection",(socket)=>{
    console.log(" User connected", socket.id)

    //for message
    socket.on("chat",({msg,group})=>{
        console.log("Message : ",msg)
        // io.emit("chat",msg) //for all
        io.to(group).emit("group-chat",msg) //for group
    })


    //for group chat
    socket.on("group-chat",(group)=>{
        console.log("Room : ",group)
        socket.join(group)
    })


    //for disconnect
    socket.on("disconnect",()=>{
        console.log("User disconnected", socket.id)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);


