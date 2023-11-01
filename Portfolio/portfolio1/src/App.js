import "./App.css"
import About from "./components/About"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { useState } from "react"
import Popnav from "./components/Popnav"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Copyright from "./components/Copyright"

function App() {
  const [mode, setMode] = useState("light")

  const removeBodyClasses = () => {
    document.body.classList.remove("bg-success")
    document.body.classList.remove("bg-info")
    document.body.classList.remove("bg-danger")
    document.body.classList.remove("bg-secondary")
    document.body.classList.remove("bg-primary")
  }
  const changeThemeMode = currentMode => {
    removeBodyClasses()
    document.body.classList.add(`bg-${currentMode}}`)
    if (mode === "light") {
      setMode("dark")
      document.body.style.backgroundColor = "#393E46"
      document.body.style.color = "#fff"
    } else {
      setMode("light")
      document.body.style.backgroundColor = "#fff"
      document.body.style.color = "#222831"
    }
  }
  return (
    <>
      <div className="main-container">
        <Navbar mode={mode} changeThemeMode={changeThemeMode} />
        <Popnav mode={mode} changeThemeMode={changeThemeMode} />
        <Home />
        <About mode={mode} />
        <Projects mode={mode} />
        <Contact mode={mode} />
        <Copyright />
      </div>
    </>
  )
}

export default App
