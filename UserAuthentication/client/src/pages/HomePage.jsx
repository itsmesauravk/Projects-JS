import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../userContex"
import Profile from "./Profile"


export default function HomePage() {
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
    })
    setUserInfo(null)
  }

  const username = userInfo?.username //if else case
  const id = userInfo?.id
  const picture = userInfo?.picture


  Profile(username, id);

  return (
    <header>
      <Link to="/" className="logo">
        My<span className="logoDis">Page</span>
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/profile">Profile</Link>
            <a onClick={logout}>Logout</a>
            {/* <button onClick={logout}>Logout</button> */}
          </>
        )}
        {!username && (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <br></br>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
      <div>
        <h1>
           
           {username && 
            <>
              <h1>hello {username} !</h1>
                <h3>Your db id : {id}</h3>
                {picture && 
                    <img src={picture} alt="image" />
                }
                {!picture && 
                    <img src="https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="image" />
                }
            </>

              }
            {!username &&
            <>
                <h1>hello stranger</h1>
                <h3>login to get details.</h3>
                </>
            }
        </h1>
      </div>
    </header>
  )
}
