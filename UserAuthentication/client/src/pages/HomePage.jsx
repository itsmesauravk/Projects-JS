import { useContext, useEffect } from "react";
import {  Link } from "react-router-dom";
import { UserContext } from "../userContex";


export default function HomePage(){
    const { userInfo, setUserInfo } = useContext(UserContext)
    useEffect(() => {
      fetch("http://localhost:3001/profile", {
        credentials: "include",
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo)
        })
      })
    }, [setUserInfo])
  
    function logout() {
        fetch("http://localhost:3001/logout", {
          credentials: "include",
          method: "POST",
        });
        setUserInfo(null);
      }
      
  
    const username = userInfo?.username //if else case
   
    return(
        <>
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {username ? (
            <>
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
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

      <div>
        {/* Display the username if available */}
        {username && <p>Welcome, {username}!</p>}
      </div>
      </>
    )
}