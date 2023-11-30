import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [setUserInfo])

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
    setUserInfo(null)
  }

  const username = userInfo?.username //if else case

  return (
    <header>
      <Link to="/" className="logo">
        Your<span className="logoDis">Story</span>
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>Logout</a>
            {/* <button onClick={logout}>Logout</button> */}
          </>
        )}
        {!username && (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}
