
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
      <div className="border-2 m-4 rounded-md p-4">
          <h2 className="font-bold text-green-900 text-2xl">Register Here !!</h2>
          <form className="mt-3" onSubmit={register}>
                <label className="block text-red-900" >Username</label>
                <input className="border-2 rounded-md pl-2" type="text" value={username} onChange={(ev)=>setUsername(ev.target.value)} placeholder="Username"/>

                <label className="block text-red-900 mt-3" >Password</label>
                <input className="border-2 rounded-md pl-2" type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} placeholder="Password" />

                <label className="block text-red-900 mt-3" >Picture</label>
                <input className="border-2 rounded-md pl-2" type="text" value={picture} onChange={(ev)=>setPicture(ev.target.value)} placeholder="Image Url.."/>
                <button className="block mt-4 border-2 rounded-md p-1 text-blue-700 text-xl hover:font-bold">
                  {loading ? "Loading..." : "Register"}
                  </button>
            </form>
            
      </div> 
    )
}
