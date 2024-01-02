
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
        <div className="border-2 m-4 rounded-md p-4">

            <h2 className="font-bold text-green-900 text-2xl">Login Here !</h2>
            {/* Form to login */}   
            <form className="mt-3" onSubmit={userLogin} >
                <label className="block text-red-900">Username</label>
                <input className="border-2 rounded-md pl-2" type="text" value={username} onChange={(ev)=>setUsername(ev.target.value)} placeholder="Username"/>

                <label className="block text-red-900 mt-3" >Password</label>
                <input className="border-2 rounded-md pl-2" type="password" value={password} onChange={(ev)=>setPassword(ev.target.value)} placeholder="Password"/>

                <button className="block mt-4 border-2 rounded-md p-1 text-blue-700 text-xl hover:font-bold" type="submit">
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    )
}