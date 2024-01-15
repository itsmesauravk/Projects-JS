import { Outlet } from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from 'react';

const YourComponent = ({mode,toggleMode}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-between pr-3 pl-3 items-center">
      <h1 className="connect font-bold">connect<span className="us">Us</span></h1>
      <div>
      <p>{currentTime.toLocaleTimeString()}</p>
      <button className="border-2 border-green-300" onClick={toggleMode}>Theme</button>
      </div>
    </div>
  );
};

export default function Layout({mode,toggleMode}) {
    return (
        <div className={`flex justify-between items-start h-screen p-8 ${mode === 'light' ? 'light-theme' : 'dark-theme'}`}>
            <div className="w-1/5">
                {/* Left Sidebar */}
                {/* Include your left sidebar content here */}
            </div>

            <div className="w-3/5">
                {/* Main Content */}
                
                <YourComponent mode={mode} toggleMode={toggleMode} />
               

                <Outlet />
            </div>

            <div className="w-1/5">
                {/* Right Sidebar */}
                {/* Include your right sidebar content here */}
            </div>
        </div>
    );
}
