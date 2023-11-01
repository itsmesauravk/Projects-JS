import { useEffect, useState } from "react"
import React from "react"

export default function About(props) {
  const activities = ["Coding", "Singing", "Playing", "Dancing", "Hiking"]
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivityIndex(prevIndex => (prevIndex + 1) % activities.length)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const changingText = activities[currentActivityIndex]

  return (
    <div id="about">
      <div className="about-me-title">
        <p>
          About <span className="theme-color">me</span>
        </p>
      </div>
      <div className="about-contents">
        <div className="about-image">
          <img
            style={{
              boxShadow: `10px 10px 10px ${
                props.mode === "light" ? "#393e46" : "#eeeeee"
              }`,
            }}
            src="https://hips.hearstapps.com/hmg-prod/images/mh-9-22-wick-650dcf0aeb656.jpg?crop=0.447xw:0.895xh;0,0&resize=1200:*"
            alt="my image"
          />
        </div>

        <div className="about-me">
          <p className="about-headings">
            Hi there, I'm <span className="theme-color">Saurav Karki.</span>
          </p>
          <p className="about-expertise">
            I'm a dedicated web developer, primarily focused on back-end
            development with Express, Node.js, and MongoDB. I also have a knack
            for crafting user-friendly front-end interfaces with React.
          </p>
          <p className="about-passion">
            But my passion extends beyond web development. I'm on an exciting
            journey to master the world of Machine Learning and AI, exploring
            the limitless possibilities they offer.
          </p>
          <p className="about-beyond-coding">
            When I'm not immersed in code, I'm out exploring hiking trails in
            the serene mountains or enjoying a thrilling game of football. Music
            is my constant companion, and you'll often find me humming a tune,
            whether I'm coding or not.
          </p>
          <p className="about-future-goals">
            Looking ahead, I'm eager to dive deeper into artificial intelligence
            and machine learning, harnessing their potential to create more
            powerful and intelligent web applications. I'm committed to lifelong
            learning and staying at the forefront of industry trends.
          </p>
          <p className="about-i-love">
            I love{" "}
            <span
              className={`changing-names theme-color ${
                props.mode === "light" ? "light-mode" : "dark-mode"
              }`}
            >
              {changingText}
            </span>
          </p>
          <a href="../CV.pdf" download className="pdf-download-btn">
            Download CV
          </a>
        </div>
      </div>
    </div>
  )
}
