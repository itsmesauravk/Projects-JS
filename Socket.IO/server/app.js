const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const port = 3000;


app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log("User connected " + socket.id);
    // socket.emit("Welcome", `Welcome to the server !!`);
    // socket.broadcast.emit("Welcome", `${socket.id} has joined the server !`);  //broadcast to all except the sender

    socket.on("message", ({message,room}) => {
        console.log(message);
        // socket.broadcast.emit("message", data);
        // io.emit("receive-message", message);
        io.to(room).emit("room-message", message);
    })

    //socket is indivisual
    // io is the whole circuit or server


    socket.on("join-room", (room) => {
        console.log("Joining room: " + room);
        socket.join(room);  //join the room single single person
    })

    socket.on("disconnect", () => {
        console.log("User disconnected.", socket.id);
        // io.emit("Welcome", `${socket.id} has left the server !`);
    })

});

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
