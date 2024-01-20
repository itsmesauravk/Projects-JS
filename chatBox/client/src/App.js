// Today's date : Jan 20, 2024 21:27:30


import React, { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client'
import './App.css';



function App() {
  const socket = useMemo(() => io("http://localhost:4000"), []);

  //to get messages
  const [messages,setMessages] = useState([]);

  const [message,setMessage] = useState("");
  const [group,setGroup] = useState("");
  // const [room,setRoom] = useState("") //for group chat (group name)
  const [socketId,setSocketId] = useState("")

  const submitHandler = (e)=>{
    e.preventDefault();
    socket.emit("chat",{message,group})
    setMessage("")
  }
  const groupHandler = (e)=>{
    e.preventDefault();
    socket.emit("group-chat",group)
    setGroup("")
  }

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("connected", socket.id)
      setSocketId(socket.id)
    })
    //for all chat
    socket.on("chat",(msg)=>{
      console.log("Message : ",msg)
    })
    //for group chat
    socket.on("group-chat",(msg)=>{
      console.log("Group Message : ",msg)
      setMessages((msgs)=>[...msgs,msg])
    })

    return ()=>{
      socket.disconnect()
    }

  },[socket])
  return (
    <div className="app">
      {/* group  */}
      <form className='chat-input' onSubmit={groupHandler} >
          <input 
          type="text"
           placeholder="Enter your group name..." 
           value={group}
           onChange={(e)=>setGroup(e.target.value)}
           />
          <button type='submit'>Join group</button>
        </form>
      <div className="chat-container">
        <div className="chat-header">
          <h1>Chat Box</h1>
        </div>
        <div className="chat-messages">
          {socketId}
          <div className="message other">Hello there!</div>
          {socketId}
          <div className="message mine">Hi! How can I help you?</div>
          {messages.map((msg,index)=>{
            return(
              <>
              {socketId}
               <div key={index} className="message mine">{msg}</div>
               </>
            )
              
          })}
          {/* More messages go here */}
        </div>
        
        
        {/* chat  */}
        <form className='chat-input'onSubmit={submitHandler} >
          <input 
          type="text"
           placeholder="Type your message..." 
           value={message}
           onChange={(e)=>setMessage(e.target.value)}
           />
          <button type='submit'>Send</button>
        </form>
        
      </div>
    </div>
  );
}

export default App;
