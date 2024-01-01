
import React, { useContext } from "react"
import {useState} from "react"
import {Navigate} from "react-router-dom"
import { UserContext } from "../userContex"


export default function LoginPage(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
    
    function userLogin(ev){
        ev.preventDefault()

        setLoading(true);
        fetch("http://localhost:3001/login",{
            method:"POST",
            body:JSON.stringify({username,password}),
            headers:{
                "Content-type":"application/json"
            },
            credentials: "include"
        }).then((response)=>{
            if(!response.ok){
                console.error("Server returned an error:", response.statusText);
                throw new Error("Network response was not ok");
            }
            // Handle successful registration
            // alert("Login successfully!");
            
            response.json().then(userInfo =>{
                 setRedirect(true);
                 setUserInfo(userInfo);
             });
        }).catch((error)=>{
            // Handling error
            alert("Error during login:"+ error.message);
        }).finally(()=>{
            setLoading(false);
            setUsername("");
            setPassword("");
        })
    }
    if(redirect){
        return <Navigate to="/" />
    }

    return(
        <div>

            <h2> Login here !!</h2>
            {/* Form to login */}   
            <form onSubmit={userLogin} >
                <label >Username</label>
                <input type="text" value={username} onChange={(ev)=>setUsername(ev.target.value)}/>

                <label >Password</label>
                <input type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)}/>

                <button type="submit">
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}