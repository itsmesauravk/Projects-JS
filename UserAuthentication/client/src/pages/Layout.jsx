import { useContext, useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { UserContext } from "../userContex"


export default function Layout(){

    const {userInfo,setUserInfo} = useContext(UserContext)
    useEffect(()=>{
        fetch("http://localhost:3001/profile",{
            credentials:"include"
        })
        .then(response =>{
            response.json().then(userI =>{
                setUserInfo(userI)
            })
        })
    },[setUserInfo])

    function logout(){
        fetch("http://localhost:3001/logout",{
            credentials:"include",
            method:"POST"
        })
        setUserInfo(null)
    }

    const username = userInfo?.username   //check if/else username in userinfo.username
    return(
        <>
            <nav>
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            {username && (
                <>
                    <li>
                    <Link to="/userProfile">My Profile</Link>
                    </li>
                    <li>
                    <a onClick={logout}>Logout</a>
                </li>
            </>
            )}
            {!username && (
                <>
                    <li>
                    <Link to="/login">Login</Link>
                    </li>
                    <li>
                    <Link to="/register">Register</Link>
                    </li>
                </>
            )}
            </ul>
        </nav>

        <Outlet/>

      </>
    )
}