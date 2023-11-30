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

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
