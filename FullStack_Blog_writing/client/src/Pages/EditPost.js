import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"

export default function EditPost() {
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [files, setFiles] = useState("")
  const [content, setContent] = useState("")
  const [redirect, setRedirect] = useState(false)

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

  function updatePost(ev) {
    ev.preventDefault()
  }

  if (redirect) {
    return <Navigate to={"/"} />
  }

  return (
    <form onSubmit={updatePost}>
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
