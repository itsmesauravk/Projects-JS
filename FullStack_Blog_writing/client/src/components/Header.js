import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        Your<span className="logoDis">Story</span>
      </Link>
      <nav>
        <Link className="nav-link" to="/login">
          Login
        </Link>
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </nav>
    </header>
  )
}
