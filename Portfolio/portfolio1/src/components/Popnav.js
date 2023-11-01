import React, { useState, useEffect } from "react"

function Popnav(props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    // Check the initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <nav
      className={`show-on-scroll ${visible ? "visible" : "hidden"}`}
      style={{ position: "fixed" }}
      id="popnav"
    >
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
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
      <button onClick={scrollToTop}>Scroll to Top</button>
    </nav>
  )
}

export default Popnav
