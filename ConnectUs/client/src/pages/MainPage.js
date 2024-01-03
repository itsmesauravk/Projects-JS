import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import '../App.css'
import Layout from "../Layout";

export default function MainPage(){
    return (
    
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
        </Route>
    </Routes>

    );
}