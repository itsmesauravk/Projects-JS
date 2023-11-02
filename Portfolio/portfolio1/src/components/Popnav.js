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

  let fontCol = { color: props.mode === "light" ? "#222831" : "#fff" }
  let backCol = { backgroundColor: props.mode === "light" ? "#222831" : "#fff" }
  let boxSadCol = {
    boxShadow: `3px 3px 4px ${props.mode === "light" ? "#222831" : "#eeeeee"}`,
  }

  const showPopNav = () => {
    const popnavContainer = document.querySelector(".popnav-container")
    if (
      popnavContainer.style.display === "none" ||
      popnavContainer.style.display === ""
    ) {
      popnavContainer.style.display = "flex"
    } else {
      popnavContainer.style.display = "none"
    }
  }

  return (
    <div className="main-popnav-container">
      <div className="popnav-icon" style={boxSadCol} onClick={showPopNav}>
        <i
          className="fa-solid fa-wand-magic-sparkles"
          style={{ color: "#222831" }}
        ></i>
      </div>
      <nav
        className={`show-on-scroll ${visible ? "visible" : "hidden"}`}
        id="popnav"
      >
        <div
          className="popnav-container"
          style={{
            display: "none",
            backgroundColor: `${
              props.mode === "light" ? "#eeeeee" : "#222831"
            }`,
          }}
        >
          <div className="nav-icons">
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
          </div>
          {/* toggle btn  */}
          <div
            className={`form-check form-switch text-${
              props.mode === "light" ? "dark" : "light"
            }`}
            id="mode-change-btn"
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
          <button style={backCol} id="scroll-to-top" onClick={scrollToTop}>
            <i
              className="fa-solid fa-arrow-up"
              style={{ color: "#00adb5" }}
            ></i>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Popnav
