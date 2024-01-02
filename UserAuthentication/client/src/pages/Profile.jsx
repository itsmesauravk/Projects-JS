// import { useContext, useEffect } from "react";
// // import {  Link } from "react-router-dom";
// import { UserContext } from "../userContex";

export default function Profile(username, id){

    // const { userInfo, setUserInfo } = useContext(UserContext)
    // useEffect(() => {
    //   fetch("http://localhost:3001/profile", {
    //     credentials: "include",
    //   }).then(response => {
    //     response.json().then(userInfo => {
    //       setUserInfo(userInfo)
    //     })
    //   })
    // }, [setUserInfo])

    // const username = userInfo?.username //if else case
    // const id = userInfo?.id

    return(
        <div>
            <h2>hello {username} !</h2>
            <h3>Your db id : {id}</h3>
            <img 
            src="https://media.istockphoto.com/id/480386986/photo/house-mouse-standing.jpg?s=612x612&w=0&k=20&c=RdAxrnfSZziFfjt2S40eFoAXM88N7oX0J1P5mQUezoQ="
             alt="musa" />
        </div>
    )
}