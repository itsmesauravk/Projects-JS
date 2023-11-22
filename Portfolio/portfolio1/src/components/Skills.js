import React from "react"

export default function Skills() {
  return (
    <div id="skills">
      <div className="skills-title">
        <p>
          My <span className="theme-color">Skills</span>
        </p>
      </div>
      <div className="skills-container">
        <img
          className="skills-img"
          src="https://cdn-icons-png.flaticon.com/512/732/732212.png"
          alt="html"
        />
        <img
          className="skills-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/CSS.3.svg/1200px-CSS.3.svg.png"
          alt="css"
        />
        <img
          className="skills-img"
          src="https://static.javatpoint.com/images/javascript/javascript_logo.png"
          alt="javaScript"
        />
        <img
          className="skills-img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png"
          alt="nodejs"
        />
        <img
          className="skills-img"
          src="https://cdn.icon-icons.com/icons2/2415/PNG/512/mongodb_original_logo_icon_146424.png"
          alt="mongodb"
        />
        <img
          className="skills-img"
          src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
          alt="expressjs"
        />
      </div>
    </div>
  )
}
