import React from "react"

function Contact(props) {
  const handleSubmit = e => {
    e.preventDefault()
  }
  let backCol = {
    backgroundColor: props.mode === "light" ? "#eeeeee" : "#393e46",
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
              cols="30"
              rows="4"
              placeholder="Your message..."
              style={backCol}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="contact-field">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
