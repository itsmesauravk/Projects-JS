import React from "react"
import { Link } from "react-router-dom"

export default function Projects(props) {
  let borderCol = {
    borderColor: props.mode === "light" ? "#222831" : "#eeeeee",
  }
  let hoverCol = {
    color: props.mode === "light" ? "#222831" : "#00adb5",
  }
  return (
    <div id="projects">
      <h2>
        My <span className="theme-color">Projects</span>
      </h2>
      <div className="projects-container">
        {/* project 1  */}
        <div style={borderCol} className="project1 popular-project">
          <div className="project-image">
            <img
              src="https://www.coastalkippford.com/wp-content/uploads/2018/04/wanderer-455338_1280.jpg"
              alt="project image"
            />
          </div>
          <div className="project-details">
            <p className="project-name">
              <strong>
                Epic <span className="theme-color">Voyages</span>{" "}
              </strong>
            </p>
            <p className="project-details">
              This is a travel website where there are different options for
              exploring different treaking ideas, hiking places and all
              necessory products avilable for sale. This doesnot include backend
              only for learning purpose it was developed.
            </p>
            <p className="project-build-languages">
              Built with:{" "}
              <i
                className="fa-brands fa-html5"
                style={{ color: "#e01b24" }}
              ></i>
              <i
                className="fa-brands fa-css3-alt"
                style={{ color: "#3584e4" }}
              ></i>
              <i className="fa-brands fa-js" style={{ color: "#f5c211" }}></i>
            </p>

            <p className="see-visit-project">
              <Link
                style={hoverCol}
                className="link-tag"
                to="https://github.com/itsmesauravk/Projects-JS.git"
              >
                <i className="fa-brands fa-github"></i> code{" "}
              </Link>
              <Link
                style={hoverCol}
                className="link-tag"
                to="http://epicvoyages.kesug.com/?i=1"
              >
                <i className="fa-solid fa-eye"></i> watch
              </Link>
            </p>
          </div>
        </div>
        {/* projcet 2 */}
        <div style={borderCol} className="project2 popular-project">
          <div className="project-image">
            <img
              src="https://s.w-x.co/util/image/w/in-weather_may9.jpg?v=ap&w=980&h=551"
              alt="project image"
            />
          </div>
          <div className="project-details">
            <p className="project-name">
              <strong>
                Weather <span className="theme-color">App</span>{" "}
              </strong>
            </p>
            <p className="project-details">
              This is a normal weather app which by default shows the weather
              data of New Forest. It can show the searched place weather data of
              previous 7 days and can be used offline also.
            </p>
            <p className="project-build-languages">
              Built with:{" "}
              <i
                className="fa-brands fa-html5"
                style={{ color: "#e01b24" }}
              ></i>
              <i
                className="fa-brands fa-css3-alt"
                style={{ color: "#3584e4" }}
              ></i>
              <i className="fa-brands fa-js" style={{ color: "#f5c211" }}></i>
              <i className="fa-brands fa-php" style={{ color: "#3584e4" }}></i>
              <i
                className="fa-solid fa-database"
                style={{ color: "#813d9c" }}
              ></i>
            </p>
            <p className="see-visit-project">
              <Link
                style={hoverCol}
                className="link-tag"
                to="https://github.com/itsmesauravk/weather_app.git"
              >
                <i className="fa-brands fa-github"></i> code{" "}
              </Link>
              <Link
                style={hoverCol}
                className="link-tag"
                to="http://sauravweatherapp.infinityfreeapp.com/?i=1"
              >
                <i className="fa-solid fa-eye"></i> watch
              </Link>
            </p>
          </div>
        </div>
        {/* project3  */}
        <div style={borderCol} className="project3 popular-project">
          <div className="project-image">
            <img
              src="https://cdn.firstcry.com/education/2022/12/29111202/101-Of-Planning-An-Unforgettable-Kids-Birthday-Party.jpg"
              alt="project image"
            />
          </div>
          <div className="project-details">
            <p className="project-name">
              <strong>
                Birthday <span className="theme-color">Counter</span>{" "}
              </strong>
            </p>
            <p className="project-details">
              This is a basic Birthday counter website which will calculate the
              time remains for your upcoming birthday of any future year.
            </p>
            <p className="project-build-languages">
              Built with:{" "}
              <i
                className="fa-brands fa-html5"
                style={{ color: "#e01b24" }}
              ></i>
              <i
                className="fa-brands fa-css3-alt"
                style={{ color: "#3584e4" }}
              ></i>
              <i className="fa-brands fa-js" style={{ color: "#f5c211" }}></i>
            </p>
            <p className="see-visit-project">
              <Link
                style={hoverCol}
                className="link-tag"
                to="https://github.com/itsmesauravk/Projects-JS.git"
              >
                <i className="fa-brands fa-github"></i> code{" "}
              </Link>
              <Link
                style={hoverCol}
                className="link-tag"
                to="http://countyourbday.kesug.com/?i=1"
              >
                <i className="fa-solid fa-eye"></i> watch
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
