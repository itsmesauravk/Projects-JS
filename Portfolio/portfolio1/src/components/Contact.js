import React from "react"
import { Link } from "react-router-dom"

function Contact(props) {
  const handleSubmit = e => {
    e.preventDefault()
  }
  let backCol = {
    backgroundColor: props.mode === "light" ? "#eeeeee" : "#393e46",
  }
  let textCol = {
    color: props.mode === "light" ? "#393e46" : "#eeeeee",
  }
  return (
    <div id="contact">
      <p className="contact-title">
        Contact <span className="theme-color">Me</span>
      </p>
      <div className="contact-details">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="contact-field">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              autoCapitalize="true"
              style={backCol}
            />
          </div>

          {/* Email */}
          <div className="contact-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your email"
              style={backCol}
            />
          </div>

          {/* Contact Number */}
          <div className="contact-field">
            <label htmlFor="contactNumber">Contact:</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Contact number"
              style={backCol}
            />
          </div>

          {/* Message */}
          <div className="contact-field">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              cols="20"
              rows="4"
              placeholder="Your message..."
              style={backCol}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="contact-field">
            <button type="submit" className="submit-button" style={textCol}>
              Submit
            </button>
          </div>
          <div className="contact-social-media">
            <span>Find me at: </span>
            <Link to="https://www.linkedin.com">
              <i
                className="fa-brands fa-linkedin-in"
                style={{ color: "#1c71d8" }}
              ></i>
            </Link>
            <Link to="https://www.twitter.com">
              <i
                className="fa-brands fa-x-twitter"
                style={{ color: "#000000" }}
              ></i>
            </Link>
            <Link to="https://www.facebook.com">
              <i
                className="fa-brands fa-facebook-f"
                style={{ color: "#1a5fb4" }}
              ></i>
            </Link>
            <Link to="https://www.instagram.com">
              <i
                className="fa-brands fa-instagram"
                style={{ color: "#c64600" }}
              ></i>
            </Link>
          </div>
          <div className="contact-phone">
            <span>
              Call me at: <strong>+977-1234543210, 01-123456</strong>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
