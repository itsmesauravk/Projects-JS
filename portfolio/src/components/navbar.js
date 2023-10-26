import React from "react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header>
      <div className="logo"></div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Projects</Link>
        <Link to="/">Contact</Link>
      </nav>
    </header>
  )
}
