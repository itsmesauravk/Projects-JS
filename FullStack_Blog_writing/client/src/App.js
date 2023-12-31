import "./App.css"
import IndexPage from "./Pages/IndexPage"
import Layout from "./Layout"
// import Header from "./components/Header"
// import Post from "./components/Post"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import { UserContextProvider } from "./UserContext"
import CreatePost from "./Pages/CreatePost"
import PostPage from "./Pages/PostPage"
import EditPost from "./Pages/EditPost"

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

//completed for now ... Mon Dec 18 2023 21:00

export default App
