
import React, { useState } from "react"
import {Navigate} from "react-router-dom"

export default function RegisterPage(){
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [picture,setPicture] = useState("")
  const [loading,setLoading] = useState(false)
  const [redirect,setRedirect] = useState(false)

  function register(e) {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({picture, username, password }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle successful registration
        alert("User registered successfully!");
        return response.json();
      })
      .catch((error) => {
        // Handling error
        alert("Error during registration:", error.message);
      })
      .finally(()=>{
        setRedirect(true)
        setLoading(false);
        setUsername("");
        setPassword("");
      });
  }
  if(redirect){
    return <Navigate to="/login" />
  }
 
    return(
      <div>
          <h2>Register Here !!</h2>
          <form onSubmit={register}>
                <label >Username</label>
                <input type="text" value={username} onChange={(ev)=>setUsername(ev.target.value)} placeholder="Username"/>

                <label >Password</label>
                <input type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} placeholder="password" />

                <label >Picture</label>
                <input type="text" value={picture} onChange={(ev)=>setPicture(ev.target.value)} placeholder="img url.."/>
                <button>
                  {loading ? "Loading..." : "Register"}
                  </button>
            </form>
            
      </div> 
    )
}
