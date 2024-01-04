import { Outlet } from "react-router-dom";
import './App.css';

export default function Layout() {
    return (
        <div className="flex justify-between items-start h-screen p-8">
            <div className="w-1/5">
                {/* Left Sidebar */}
                {/* Include your left sidebar content here */}
            </div>

            <div className="w-3/5">
                {/* Main Content */}
                <h1 className="connect">connect<span className="us">Us</span></h1>
                <Outlet />
            </div>

            <div className="w-1/5">
                {/* Right Sidebar */}
                {/* Include your right sidebar content here */}
            </div>
        </div>
    );
}
