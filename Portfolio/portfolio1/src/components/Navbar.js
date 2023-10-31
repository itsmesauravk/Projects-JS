import React from "react"

export default function Navbar() {
  return (
    <nav>
      <div className="logo">
        <p id="my-name">
          Saurav<span className="theme-color">Karki</span>
        </p>
      </div>
      <div className="navs">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label className="form-check-label" for="flexSwitchCheckDefault">
              Dark
            </label>
          </div>
        </ul>
      </div>
    </nav>
  )
}
