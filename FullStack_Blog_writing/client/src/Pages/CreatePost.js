import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
}
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
]

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [files, setFiles] = useState("")
  const [content, setContent] = useState("")
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    return <Navigate to={"/"} />
  }

  async function createPost(ev) {
    ev.preventDefault()

    const data = new FormData()
    data.set("title", title)
    data.set("summary", summary)
    data.set("file", files[0])
    data.set("content", content)

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      })
      await response.json()

      if (response.ok) {
        setRedirect(true)
      }

      // Reset form fields after successful post creation
      setTitle("")
      setSummary("")
      setFiles("")
      setContent("")
    } catch (error) {
      console.error("Error creating post:", error.message)
    }
  }

  return (
    <form onSubmit={createPost}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input type="file" onChange={ev => setFiles(ev.target.files)} />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={newValue => setContent(newValue)}
      />
      <button style={{ marginTop: "2rem" }} type="submit">
        Create Post
      </button>
    </form>
  )
}
