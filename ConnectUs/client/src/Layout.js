import { Outlet } from "react-router-dom";
import './App.css'

export default function Layout() {
    return(
        <div className="m-10">
            <h1 className="connect">connect<span className="us">Us</span></h1>

            <Outlet />
        </div>
    );      
}