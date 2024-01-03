import React from "react";
import { Link } from "react-router-dom";

export default function RegistrationPage() {    
    return (
        <div className="login mt-10 ml-10">
            <h1 className="text-2xl">Create New Account</h1>
            <form className="mt-10">
                
                <input className="  border-2 border-blue-500 rounded-md p-1" type="text" placeholder="First name" />
                
                <input className="  border-2 border-blue-500 rounded-md p-1 ml-2" type="text" placeholder="Surname" />

                <label className="block mt-2">Email:</label>
                <input className=" block border-2 border-blue-500 rounded-md p-1" type="text" placeholder="Email or Phone Number " />

                <label className="block mt-2">Password:</label>
                <input className="block border-2 border-blue-500 rounded-md p-1" type="password" placeholder="New Password" />

                <label className="block mt-2">Date of Birth:</label>
                <input className="block border-2 border-blue-500 rounded-md p-1" type="date" placeholder="Date of Birth" />

                <label className="block mt-2">Gender:</label>
                <label className="block">
                    <input type="radio" />
                    Male
                </label>
                <label className="block">
                    <input type="radio" />
                    Female
                </label>
                <label className="block">
                    <input type="radio" />
                    Custom
                </label>

                <button className="border-2 rounded-md p-2 mt-3 hover:border-blue-400" type="submit" value="Submit"> Register </button>
            </form>

            <div className="mt-4">
                <p>Already have account? <Link className="text-blue-600 underline" to="/login">Login</Link></p>
            </div>

        </div>
    );
}