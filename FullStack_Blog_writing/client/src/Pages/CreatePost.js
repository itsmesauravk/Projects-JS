import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
export default function CreatePost() {
  return (
    <form>
      <input type="title" placeholder="title" />
      <input type="summary" placeholder="summary" />
      <input type="file" />
      <ReactQuill />
      <button style={{ marginTop: "2rem" }}>Create Post</button>
    </form>
  )
}
