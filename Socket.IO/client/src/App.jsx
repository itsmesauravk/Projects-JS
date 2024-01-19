import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);  //to prevent reloading
  const [messages, setMessages] = useState([]); // to get messages
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");   //other personal room id
  const [socketId, setSocketId] = useState(""); // to get socket id
  const [rooms, setRooms] = useState(" "); // to get rooms

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message, room});
    setMessage("");
    // setRoom("");
    
  };

  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", rooms);
    setRooms("");
  }
  // console.log(messages);

  useEffect(() => {
    // Make sure to use the "receive-message" event here
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log("Message received :", data);  // data is the message
      
    });
    socket.on("room-message", (data) => {
      console.log("Message received :", data);  // data is the message
      setMessages((messages) => [...messages, data]);
    });

    socket.on("Welcome", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        {socketId}
      </Typography>

      <Typography variant="h4" component="div" gutterBottom>
        Your Room Name : {rooms}
      </Typography>

      <form onSubmit={joinRoom}>
        <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Set Room
        </Button>
      </form>


      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>


      <Stack>
        {messages.map((msg, index) => (
          <Typography key={index} variant="h6" component="div" gutterBottom>
            {msg}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
