import React from "react"
// import { Link } from "react-router-dom"

export default function Navbar(props) {
  let fontCol = { color: props.mode === "light" ? "#222831" : "#fff" }
  return (
    <nav>
      <div className="logo">
        <p id="my-name">
          Saurav<span className="theme-color">Karki</span>
        </p>
      </div>
      <div className="navs" style={fontCol}>
        <a style={fontCol} href="#home">
          Home
        </a>
        <a style={fontCol} href="#about">
          About
        </a>
        <a style={fontCol} href="#projects">
          Projects
        </a>
        <a style={fontCol} href="#contact">
          Contact
        </a>
        <div
          className={`form-check form-switch text-${
            props.mode === "light" ? "dark" : "light"
          }`}
        >
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={() => {
              props.changeThemeMode(null)
            }}
          />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            {props.mode === "light" ? "Dark" : "Light"}
          </label>
        </div>
      </div>
    </nav>
  )
}
