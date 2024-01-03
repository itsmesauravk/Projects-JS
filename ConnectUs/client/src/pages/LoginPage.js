import { Link } from "react-router-dom";

export default function LoginPage() {   
    return (
        <div className="login mt-10 ml-10">
            <h1 className="text-2xl">LoginPage</h1>
            <form className="mt-10">
                <label className="block">
                    Email:
                </label>
                <input className=" block border-2 border-blue-500 rounded-md p-1" type="text" name="email" />
                <label className="block mt-2">
                    Password:
                </label>
                <input className="block border-2 border-blue-500 rounded-md p-1 " type="password" name="password" />
                <button className="border-2 rounded-md p-2 mt-3 hover:border-blue-400" type="submit" value="Submit"> Login </button>
            </form>

            <div className="mt-4">
                <p>Don't have account?  <Link className="text-red-600 underline" to="/registration">Create</Link> </p>
            </div>

        </div>
    );
}