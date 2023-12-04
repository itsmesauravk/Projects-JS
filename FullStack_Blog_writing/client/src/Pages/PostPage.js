import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatISO9075 } from "date-fns"

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null)
  const { id } = useParams() //gets blog id
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then(response => {
      response.json().then(postInfo => {
        setPostInfo(postInfo)
      })
    })
  }, [])

  if (!postInfo) return ""
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author}</div>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="imgage" />
      </div>

      {/* displaying content in html format */}
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  )
}
