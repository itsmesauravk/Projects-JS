import { set } from "mongoose";
import React, { useState } from "react"

export default function RegisterPage(){
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  function register(e) {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
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
        setLoading(false);
        setUsername("");
        setPassword("");
      });
  }
 
    return(
      <div>
          <h2>Register Here !!</h2>
          <form onSubmit={register}>
                <label >Username</label>
                <input type="text" value={username} onChange={(ev)=>setUsername(ev.target.value)}/>

                <label >Password</label>
                <input type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} />

                <button>
                  {loading ? "Loading..." : "Register"}
                  </button>
            </form>
            
      </div> 
    )
}
