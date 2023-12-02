// import React from "react"

export default function Post({ title, summary, cover, content }) {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2023/09/GettyImages-1647521480-e1694685235777.jpg?w=1390&crop=1"
          alt="img"
        />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <p className="info">
          <span className="author">Saurav Karki</span>
          <span className="time">2023-10-18 21:51</span>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}
