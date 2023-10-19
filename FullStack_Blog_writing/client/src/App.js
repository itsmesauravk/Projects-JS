import "./App.css"
import IndexPage from "./Pages/IndexPage"
import Layout from "./Layout"
import Header from "./components/Header"
import Post from "./components/Post"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
