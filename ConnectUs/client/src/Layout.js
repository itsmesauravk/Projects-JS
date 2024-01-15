import { Outlet } from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from 'react';

const YourComponent = ({ mode, toggleMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-between pr-3 pl-3 items-center">
      <h1 className="connect font-bold">connect<span className="us">Us</span></h1>
      <div className="flex gap-2">
        <p>{currentTime.toLocaleTimeString()}</p>
        
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onClick={()=>toggleMode()}/>
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className={`ms-3 text-sm font-medium ${mode === 'light' ? 'dark-text' : 'light-text'}`}>{mode === 'light' ? 'Dark' : 'Light'}</span>
        </label>

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
