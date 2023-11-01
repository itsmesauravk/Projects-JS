import React, { useState, useEffect } from "react"

function Popnav() {
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
    >
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
      <button onClick={scrollToTop}>Scroll to Top</button>
    </nav>
  )
}

export default Popnav
